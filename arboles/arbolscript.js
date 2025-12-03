// Clase para nodo de Trie Binario (usado para todos los tipos excepto Huffman)
class BinaryTrieNode {
  constructor(bit = '') {
    this.bit = bit; // El bit actual (0 o 1)
    this.left = null; // 0 (izquierda)
    this.right = null; // 1 (derecha)
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
  return binary.slice(3); // Ignorar primeros 3 bits, tomar los 5 siguientes (últimos 5)
}

// Función para insertar una letra en el Trie Binario (invertido: 1 izquierda/arriba, 0 derecha/abajo) - Para digital
function insertIntoDigitalTree(root, letter) {
  const bits = getRelevantBits(letter);
  if (!root.letter) {
    root.isEnd = true;
    root.letter = letter;
    return;
  }
  let node = root;
  let bitIndex = 0;
  while (bitIndex < bits.length) {
    const bit = bits[bitIndex];
    let nextNode = bit === '0' ? node.left : node.right;
    if (!nextNode) {
      nextNode = new BinaryTrieNode(bit);
      if (bit === '0') node.left = nextNode;
      else node.right = nextNode;
      nextNode.isEnd = true;
      nextNode.letter = letter;
      return;
    } else {
      node = nextNode;
      bitIndex++;
    }
  }
  // Si llega aquí, no insertar (no debería suceder según las reglas)
}
class QuadTrieNode {
  constructor() {
    this.children = [null, null, null, null]; // 0:00, 1:01, 2:10, 3:11
    this.isEnd = false; // Si es el final de una letra (solo en nivel 3)
    this.letter = null; // La letra asociada (si es final)
  }
}
function getSixBits(letter) {
  const bits5 = getRelevantBits(letter); // 5 bits
  return '0' + bits5; // 6 bits
}
function insertIntoQuadTree(root, letter) {
  const bits = getSixBits(letter);
  let node = root;
  for (let i = 0; i < 3; i++) { // 3 niveles
    const group = bits.slice(i * 2, i * 2 + 2); // Grupo de 2 bits
    let index;
    if (group === '00') index = 0;
    else if (group === '01') index = 1;
    else if (group === '10') index = 2;
    else if (group === '11') index = 3;
    if (!node.children[index]) {
      node.children[index] = new QuadTrieNode();
    }
    node = node.children[index];
  }
  node.isEnd = true;
  node.letter = letter;
}
function fillEmptyNodes(node, level) {
  if (level === 3) return; // Nivel de hojas, no rellenar más
  for (let i = 0; i < 4; i++) {
    if (!node.children[i]) {
      node.children[i] = new QuadTrieNode();
    }
    fillEmptyNodes(node.children[i], level + 1);
  }
}
function buildMultiResidualQuadTree(text) {
  const root = new QuadTrieNode();
  for (let char of text) {
    if (char !== ' ') {
      insertIntoQuadTree(root, char);
    }
  }
  // Rellenar nodos vacíos para visualización completa
  fillEmptyNodes(root, 0);
  return root;
}
function quadTrieToCytoscapeElements(node, parentId = null, elements = [], idCounter = { value: 0 }, level = 0) {
  if (!node) return elements;
  const nodeId = `node-${idCounter.value++}`;
  const label = node.isEnd ? `${node.letter}` : ''; // Solo mostrar letra en hojas finales
  const classes = node.isEnd ? 'leaf' : 'internal';
  elements.push({ data: { id: nodeId, label: label }, classes: classes });
  if (parentId) {
    elements.push({ data: { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId } });
  }
  // Recorrer los 4 hijos (incluso si están vacíos, ya que fillEmptyNodes los creó)
  const branchLabels = ['00', '01', '10', '11'];
  for (let i = 0; i < 4; i++) {
    if (node.children[i]) {
      quadTrieToCytoscapeElements(node.children[i], nodeId, elements, idCounter, level + 1);
    }
  }
  return elements;
}
// Nueva función para insertar en el árbol residual (corregida para manejar colisiones y colocar en hojas vacías)
function insertIntoResidualTree(root, letter) {
  const bits = getRelevantBits(letter);
  let node = root;
  let bitIndex = 0;
  while (bitIndex < bits.length) {
    const bit = bits[bitIndex];
    let nextNode = bit === '0' ? node.left : node.right;
    if (!nextNode) {
      // Crear hijo y colocar la letra aquí si es hoja vacía
      nextNode = new BinaryTrieNode(bit);
      if (bit === '0') node.left = nextNode;
      else node.right = nextNode;
      nextNode.isEnd = true;
      nextNode.letter = letter;
      return;
    } else if (nextNode.isEnd) {
      if (nextNode.letter) {
        // Colisión: bajar un nivel completo en este nodo
        if (!nextNode.left) nextNode.left = new BinaryTrieNode('0');
        if (!nextNode.right) nextNode.right = new BinaryTrieNode('1');
        const existingLetter = nextNode.letter;
        nextNode.isEnd = false;
        nextNode.letter = null;
        // Reinsertar la letra existente y la nueva desde el siguiente bit
        insertFromNode(nextNode, existingLetter, bitIndex + 1);
        insertFromNode(nextNode, letter, bitIndex + 1);
        return;
      } else {
        // Hoja vacía, colocar la letra aquí
        nextNode.letter = letter;
        return;
      }
    } else {
      // Continuar bajando
      node = nextNode;
      bitIndex++;
    }
  }
  // Si llega aquí sin colocar, colocar en el nodo actual si es hoja vacía
  if (!node.isEnd) {
    node.isEnd = true;
    node.letter = letter;
  }
}

// Función auxiliar para insertar desde un nodo con bitIndex dado (corregida para colocar en hojas vacías)
function insertFromNode(node, letter, startIndex) {
  const bits = getRelevantBits(letter);
  let current = node;
  for (let i = startIndex; i < bits.length; i++) {
    const bit = bits[i];
    let child = bit === '0' ? current.left : current.right;
    if (!child) {
      // Crear hijo y colocar la letra aquí si es hoja vacía
      child = new BinaryTrieNode(bit);
      if (bit === '0') current.left = child;
      else current.right = child;
      child.isEnd = true;
      child.letter = letter;
      return;
    } else if (child.isEnd) {
      if (child.letter) {
        // Colisión: bajar nivel
        if (!child.left) child.left = new BinaryTrieNode('0');
        if (!child.right) child.right = new BinaryTrieNode('1');
        const existingLetter = child.letter;
        child.isEnd = false;
        child.letter = null;
        // Reinsertar desde siguiente bit
        insertFromNode(child, existingLetter, i + 1);
        insertFromNode(child, letter, i + 1);
        return;
      } else {
        // Hoja vacía, colocar
        child.letter = letter;
        return;
      }
    } else {
      // Nodo interno, continuar
      current = child;
    }
  }
  // Si llega al final sin colocar, colocar en el nodo actual si es hoja vacía
  if (!current.isEnd) {
    current.isEnd = true;
    current.letter = letter;
  }
}

// Función para construir el Trie Binario para Residuos (simple inserción)
function buildResidualTree(text) {
  const root = new BinaryTrieNode();
  for (let char of text) {
    if (char !== ' ') {
      insertIntoResidualTree(root, char);
    }
  }
  return root;
}

// Función para construir el Trie Binario para Residuos Múltiples (inserción iterativa, simulando "residuos") - Corregido: usa insertIntoDigitalTree
function buildMultiResidualBinaryTrie(text) {
  const root = new BinaryTrieNode();
  // Simular residuos: procesar el texto en bloques o iterativamente (ej. invertir o algo simple)
  let processedText = text;
  for (let i = 0; i < 2; i++) { // Dos niveles de "residuos"
    for (let char of processedText) {
      if (char !== ' ') {
        insertIntoDigitalTree(root, char); // Corregido: era insertIntoBinaryTrie (no definido)
      }
    }
    processedText = processedText.split('').reverse().join(''); // Simular cambio (puedes ajustar)
  }
  return root;
}

// Función para construir el Trie Binario para Digital (Trie estándar, pero con bits)
function buildDigitalBinaryTrie(text) {
  const root = new BinaryTrieNode();
  for (let char of text) {
    if (char !== ' ') {
      insertIntoDigitalTree(root, char);
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
  const label = node.isEnd ? `${node.letter}(${path})` : '';
  const classes = node.isEnd ? 'leaf' : 'internal';
  elements.push({ data: { id: nodeId, label: label }, classes: classes });
  if (parentId) {
    elements.push({ data: { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId } });
  }
  binaryTrieToCytoscapeElements(node.left, nodeId, elements, idCounter, path + '0'); // left = 0
  binaryTrieToCytoscapeElements(node.right, nodeId, elements, idCounter, path + '1'); // right = 1
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
      'height': 40,
      'shape': 'ellipse' // default circle for internal nodes
    }
  },
  {
    selector: 'node.leaf', // Solo nodos hoja
    style: {
      'shape': 'rectangle' // square for leaves
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
  title.textContent = 'Árbol de Residuos';
  root = buildResidualTree(input);
  detailsDiv.innerHTML = '<h4>Binario de 5 dígitos:</h4>';
  for (let char of input.replace(/\s/g, '')) {
    detailsDiv.innerHTML += `<p>${char}: ${getRelevantBits(char)}</p>`;
  }
  elements = binaryTrieToCytoscapeElements(root);
  } else if (type === 'multi-residual') {
    title.textContent = 'Árbol de Residuos Múltiples (4-ario)';
    root = buildMultiResidualQuadTree(input);
    detailsDiv.innerHTML = '<h4>Códigos de 6 bits (con 0 antepuesto):</h4>';
    for (let char of input.replace(/\s/g, '')) {
      detailsDiv.innerHTML += `<p>${char}: ${getSixBits(char)}</p>`;
    }
    elements = quadTrieToCytoscapeElements(root);
  } else if (type === 'digital') {
  title.textContent = 'Árbol Digital';
  root = buildDigitalBinaryTrie(input);
  detailsDiv.innerHTML = '<h4>Binario de 5 dígitos:</h4>';
  for (let char of input.replace(/\s/g, '')) {
    detailsDiv.innerHTML += `<p>${char}: ${getRelevantBits(char)}</p>`;
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
