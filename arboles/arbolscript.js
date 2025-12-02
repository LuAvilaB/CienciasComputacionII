// Clase para representar un nodo del árbol de Huffman
class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

// Función para calcular frecuencias a partir del texto
function calculateFrequencies(text) {
  const freq = {};
  for (let char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

// Función para construir el árbol de Huffman
function buildHuffmanTree(freq) {
  const nodes = Object.keys(freq).map(char => new HuffmanNode(char, freq[char]));
  const priorityQueue = nodes.slice().sort((a, b) => a.freq - b.freq);

  while (priorityQueue.length > 1) {
    const left = priorityQueue.shift();
    const right = priorityQueue.shift();
    const merged = new HuffmanNode(null, left.freq + right.freq, left, right);
    priorityQueue.push(merged);
    priorityQueue.sort((a, b) => a.freq - b.freq);
  }

  return priorityQueue[0];
}

// Función para generar códigos Huffman (opcional, para mostrar)
function generateCodes(node, prefix = '', codes = {}) {
  if (node.char !== null) {
    codes[node.char] = prefix;
  } else {
    generateCodes(node.left, prefix + '0', codes);
    generateCodes(node.right, prefix + '1', codes);
  }
  return codes;
}

// Función para convertir el árbol en elementos de Cytoscape
function treeToCytoscapeElements(node, parentId = null, elements = [], idCounter = { value: 0 }) {
  if (!node) return elements;

  const nodeId = `node-${idCounter.value++}`;
  const label = node.char ? `${node.char} (${node.freq})` : `(${node.freq})`;
  elements.push({ data: { id: nodeId, label: label } });

  if (parentId) {
    elements.push({ data: { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId } });
  }

  treeToCytoscapeElements(node.left, nodeId, elements, idCounter);
  treeToCytoscapeElements(node.right, nodeId, elements, idCounter);

  return elements;
}

// Instancia de Cytoscape
let cy;

document.addEventListener('DOMContentLoaded', function() {
  cy = cytoscape({
    container: document.getElementById('huffman-tree'),
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
          'font-size': '12px'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#333',
          'target-arrow-color': '#333',
          'target-arrow-shape': 'triangle'
        }
      }
    ],
    layout: {
      name: 'breadthfirst',
      directed: true,
      padding: 10
    }
  });
});

// Función para generar el árbol de Huffman
function generateHuffmanTree() {
  const text = document.getElementById('input-text').value.trim();
  if (!text) {
    alert('Por favor, ingresa un texto.');
    return;
  }

  const freq = calculateFrequencies(text);
  const root = buildHuffmanTree(freq);
  const codes = generateCodes(root);

  // Mostrar frecuencias
  const freqDiv = document.getElementById('frequencies');
  freqDiv.innerHTML = '<h4>Frecuencias:</h4>';
  for (let char in freq) {
    freqDiv.innerHTML += `<p>${char}: ${freq[char]}</p>`;
  }
  freqDiv.innerHTML += '<h4>Códigos Huffman:</h4>';
  for (let char in codes) {
    freqDiv.innerHTML += `<p>${char}: ${codes[char]}</p>`;
  }

  // Generar elementos para Cytoscape
  const elements = treeToCytoscapeElements(root);

  // Actualizar Cytoscape
  cy.elements().remove();
  cy.add(elements);
  cy.layout({ name: 'breadthfirst', directed: true, padding: 10 }).run();
}

// Función para limpiar el árbol
function clearTree() {
  cy.elements().remove();
  document.getElementById('frequencies').innerHTML = '';
  document.getElementById('input-text').value = '';
}