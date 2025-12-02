// Clase para nodo de Trie Binario (usado para todos los tipos excepto Huffman)
class BinaryTrieNode {
  constructor(bit = '') {
    this.bit = bit; // El bit actual (0 o 1)
    this.left = null; // Ahora 1 (arriba)
    this.right = null; // Ahora 0 (abajo)
    this.isEnd = false; // Si es el final de una letra
    this.letter = null; // La letra asociada (si es final)
  }
}

// Clase para nodo de Árbol de Huffman
class HuffmanNode {
  constructor(freq, char = null) {
    this.freq = freq;
    this.char = char; // null si no es hoja
    this.left = null;
    this.right = null;
  }
}

// Función para obtener los 5 bits relevantes de una letra (ignorando los primeros 3)
function getRelevantBits(letter) {
  const ascii = letter.charCodeAt(0);
  const binary = ascii.toString(2).padStart(8, '0'); // 8 bits
  return binary.slice(3); // Ignorar primeros 3 bits, tomar los 5 siguientes
}

// Función para insertar una letra en el Trie Binario (invertido: 1 izquierda/arriba, 0 derecha/abajo)
function insertIntoBinaryTrie(root, letter) {
  const bits = getRelevantBits(letter);
  let node = root;
  for (let bit of bits) {
    if (bit === '1') { // 1 va a la izquierda (arriba en TB)
      if (!node.left) node.left = new BinaryTrieNode('1');
      node = node.left;
    } else { // 0 va a la derecha (abajo en TB)
      if (!node.right) node.right = new BinaryTrieNode('0');
      node = node.right;
    }
  }
  node.isEnd = true;
  node.letter = letter;
}

// Función para construir el Trie Binario para Residuos (simple inserción)
function buildResidualBinaryTrie(text) {
  const root = new BinaryTrieNode();
  for (let char of text) {
    insertIntoBinaryTrie(root, char);
  }
  return root;
}

// Función para construir el Trie Binario para Residuos Múltiples (inserción iterativa, simulando "residuos")
function buildMultiResidualBinaryTrie(text) {
  const root = new BinaryTrieNode();
  // Simular residuos: procesar el texto en bloques o iterativamente (ej. invertir o algo simple)
  let processedText = text;
  for (let i = 0; i < 2; i++) { // Dos niveles de "residuos"
    for (let char of processedText) {
      insertIntoBinaryTrie(root, char);
    }
    processedText = processedText.split('').reverse().join(''); // Simular cambio (puedes ajustar)
  }
  return root;
}

// Función para construir el Trie Binario para Digital (Trie estándar, pero con bits)
function buildDigitalBinaryTrie(text) {
  const root = new BinaryTrieNode();
  const words = text.split(/\s+/).filter(w => w); // Separar por espacios para palabras
  for (let word of words) {
    for (let char of word) {
      insertIntoBinaryTrie(root, char);
    }
  }
  return root;
}

// Función para construir el Árbol de Huffman basado solo en frecuencias
function buildHuffmanTree(text) {
  const freq = {};
  for (let char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // Crear lista de nodos hoja
  const nodes = Object.keys(freq).map(char => new HuffmanNode(freq[char], char));

  // Cola de prioridad (usando array y sort para simplicidad)
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift();
    const right = nodes.shift();
    const merged = new HuffmanNode(left.freq + right.freq);
    merged.left = left;
    merged.right = right;
    nodes.push(merged);
  }

  return { root: nodes[0] || null, freq };
}

// Función para convertir el Trie Binario a elementos de Cytoscape
function binaryTrieToCytoscapeElements(node, parentId = null, elements = [], idCounter = { value: 0 }, path = '') {
  if (!node) return elements;
  const nodeId = `node-${idCounter.value++}`;
  const label = node.isEnd ? `${node.letter} (${path})` : path || 'root';
  elements.push({ data: { id: nodeId, label: label } });
  if (parentId) {
    elements.push({ data: { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId } });
  }
  binaryTrieToCytoscapeElements(node.left, nodeId, elements, idCounter, path + '1'); // 1 arriba
  binaryTrieToCytoscapeElements(node.right, nodeId, elements, idCounter, path + '0'); // 0 abajo
  return elements;
}

// Función para convertir el Árbol de Huffman a elementos de Cytoscape
function huffmanTreeToCytoscapeElements(node, parentId = null, elements = [], idCounter = { value: 0 }, code = '') {
  if (!node) return elements;
  const nodeId = `node-${idCounter.value++}`;
  const label = node.char ? `${node.char} (${node.freq})` : `${node.freq}`;
  elements.push({ data: { id: nodeId, label: label } });
  if (parentId) {
    elements.push({ data: { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId } });
  }
  huffmanTreeToCytoscapeElements(node.left, nodeId, elements, idCounter, code + '0'); // Asumiendo left=0
  huffmanTreeToCytoscapeElements(node.right, nodeId, elements, idCounter, code + '1'); // right=1
  return elements;
}

// Instancia de Cytoscape
let cy;

document.addEventListener('DOMContentLoaded', function() {
  cytoscape.use(cytoscapeDagre); // Importar la extensión dagre
  cy = cytoscape({
    container: document.getElementById('tree-canvas'),
    elements: [],
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#8c5d51',
          'label': 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          'color': '#fff',
          'font-size': '10px',
          'width': 40,
          'height': 40
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#333',
          'target-arrow-color': '#333',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        }
      }
    ],
    layout: {
      name: 'dagre',
      rankDir: 'TB', // Top to Bottom: raíz arriba, hojas abajo
      padding: 10
    }
  });
});

// Función principal para generar el árbol basado en el tipo seleccionado
function generateTree() {
  if (!cy) {
    alert('Espera a que cargue la página completamente.');
    return;
  }

  const type = document.getElementById('tree-type').value;
  const input = document.getElementById('input-data').value.trim();
  const detailsDiv = document.getElementById('details');
  const title = document.getElementById('tree-title');

  detailsDiv.innerHTML = '';
  cy.elements().remove();

  if (!input) {
    alert('Por favor, ingresa texto con letras.');
    return;
  }

  let root = null;
  let elements = [];

  if (type === 'huffman') {
    title.textContent = 'Árbol de Huffman';
    const { root: huffmanRoot, freq } = buildHuffmanTree(input);
    root = huffmanRoot;
    detailsDiv.innerHTML = '<h4>Frecuencias:</h4>';
    for (let char in freq) {
      detailsDiv.innerHTML += `<p>${char}: ${freq[char]}</p>`;
    }
    elements = huffmanTreeToCytoscapeElements(root);
  } else if (type === 'residual') {
    title.textContent = 'Árbol de Residuos (Binario)';
    root = buildResidualBinaryTrie(input);
    detailsDiv.innerHTML = '<h4>Bits procesados:</h4>';
    for (let char of input) {
      detailsDiv.innerHTML += `<p>${char}: ${getRelevantBits(char)}</p>`;
    }
    elements = binaryTrieToCytoscapeElements(root);
  } else if (type === 'multi-residual') {
    title.textContent = 'Árbol de Residuos Múltiples (Binario)';
    root = buildMultiResidualBinaryTrie(input);
    detailsDiv.innerHTML = '<h4>Bits procesados (con residuos simulados):</h4>';
    for (let char of input) {
      detailsDiv.innerHTML += `<p>${char}: ${getRelevantBits(char)}</p>`;
    }
    elements = binaryTrieToCytoscapeElements(root);
  } else if (type === 'digital') {
    title.textContent = 'Árbol Digital (Trie Binario)';
    root = buildDigitalBinaryTrie(input);
    detailsDiv.innerHTML = '<h4>Bits procesados por palabra:</h4>';
    const words = input.split(/\s+/).filter(w => w);
    for (let word of words) {
      for (let char of word) {
        detailsDiv.innerHTML += `<p>${char} (${word}): ${getRelevantBits(char)}</p>`;
      }
    }
    elements = binaryTrieToCytoscapeElements(root);
  }

  cy.add(elements);
  cy.layout({ name: 'dagre', rankDir: 'TB', padding: 10 }).run();
}

// Función para limpiar el árbol
function clearTree() {
  if (!cy) return;
  cy.elements().remove();
  document.getElementById('details').innerHTML = '';
  document.getElementById('input-data').value = '';
}