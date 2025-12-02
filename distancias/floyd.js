// Initialize graph as Cytoscape instance
let cyInput;

// Colors matching your theme
const themeColors = {
    nodeText: '#f6f2e9',
    graphBackground: '#a37568'
};

// Colors for graph
const operationColors = {
    existingEdge: '#f6f2e9',    // White for existing edges
    inputNode: '#8c5d51',      // Brown for input graph
    inputBorder: '#f6f2e9'
};

// Style for the graph
const createGraphStyle = () => {
    return [
        {
            selector: 'node',
            style: {
                'background-color': operationColors.inputNode,
                'border-color': operationColors.inputBorder,
                'border-width': 2,
                'label': 'data(label)',
                'color': themeColors.nodeText,
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': '14px',
                'font-weight': 'bold',
                'width': 40,
                'height': 40
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': operationColors.existingEdge,
                'target-arrow-color': operationColors.existingEdge,
                'target-arrow-shape': 'triangle',  // Cambiado a 'triangle' para flechas dirigidas
                'curve-style': 'bezier',
                'label': 'data(label)',
                'color': themeColors.nodeText,
                'text-background-color': operationColors.inputNode,
                'text-background-opacity': 0.7,
                'text-background-padding': '3px'
            }
        },
        {
            selector: 'core',
            style: {
                'background-color': themeColors.graphBackground
            }
        }
    ];
};

// Initialize graph
function initGraph() {
    // Clear any existing content first
    document.getElementById('graph').innerHTML = '';
    
    cyInput = cytoscape({
        container: document.getElementById('graph'),
        style: createGraphStyle(),
        layout: { name: 'grid', rows: 1 },
        minZoom: 0.3,
        maxZoom: 3,
        wheelSensitivity: 0.1,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true
    });

    // Fit graph to container
    fitGraphToContainer();
    
    // Add some initial nodes for testing
    addInitialGraph();
}

// Fit graph to container
function fitGraphToContainer() {
    if (cyInput) {
        setTimeout(() => {
            cyInput.fit();
            cyInput.center();
            cyInput.zoom(1);
        }, 100);
    }
}

// Add initial graph for testing
function addInitialGraph() {
    // Initial graph - Triangle with directed edges and weights
    cyInput.add([
        { data: { id: 'A', label: 'A', graph: 'input' } },
        { data: { id: 'B', label: 'B', graph: 'input' } },
        { data: { id: 'C', label: 'C', graph: 'input' } },
        { data: { id: 'AB', source: 'A', target: 'B', label: 'AB:2', weight: 2, graph: 'input' } },
        { data: { id: 'BC', source: 'B', target: 'C', label: 'BC:3', weight: 3, graph: 'input' } },
        { data: { id: 'CA', source: 'C', target: 'A', label: 'CA:4', weight: 4, graph: 'input' } }
    ]);
    
    // Apply layout
    applyLayout(cyInput);
}

// Apply layout to the graph
function applyLayout(cy) {
    if (cy.elements().length > 0) {
        cy.layout({
            name: 'circle',
            animate: true,
            animationDuration: 500,
            fit: true,
            padding: 30,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            spacingFactor: 1.5
        }).run();
    }
}

// Counter for unique IDs
let nodeId = 3, edgeId = 3;

// Function to add a node to the input graph
function addNode() {
    const label = prompt('Etiqueta del nodo (ej: A, B, C):');
    if (label) {
        const existingNode = cyInput.nodes().find(node => node.data('label') === label);
        if (existingNode) {
            alert(`El nodo con etiqueta "${label}" ya existe en este grafo.`);
            return;
        }
        
        const id = `${label}${++nodeId}`;
        cyInput.add({ data: { id, label, graph: 'input' } });
        
        applyLayout(cyInput);
        setTimeout(() => cyInput.fit(), 50);
    }
}

// Function to add an edge between nodes with weight
function addEdge() {
    const nodes = cyInput.nodes();
    
    if (nodes.length < 2) {
        alert('Necesitas al menos 2 nodos para crear una arista.');
        return;
    }

    const nodeList = nodes.map(n => n.data('label')).join(', ');
    const sourceLabel = prompt(`Etiqueta del nodo origen (${nodeList}):`);
    const targetLabel = prompt(`Etiqueta del nodo destino (${nodeList}):`);
    const weight = parseFloat(prompt('Peso de la arista (número):'));
    
    if (sourceLabel && targetLabel && !isNaN(weight)) {
        const sourceNode = nodes.find(n => n.data('label') === sourceLabel);
        const targetNode = nodes.find(n => n.data('label') === targetLabel);
        
        if (sourceNode && targetNode) {
            // Quita la verificación de aristas existentes para permitir múltiples dirigidas
            const newEdgeId = `e${++edgeId}`;
            const edgeLabel = `${sourceLabel}${targetLabel}:${weight}`;
            
            cyInput.add({ 
                data: { 
                    id: newEdgeId, 
                    source: sourceNode.id(), 
                    target: targetNode.id(),
                    label: edgeLabel,
                    weight: weight,
                    graph: 'input'
                } 
            });
            
            applyLayout(cyInput);
        } else {
            alert('Uno o ambos nodos no existen.');
        }
    } else {
        alert('Datos inválidos.');
    }
}

// Function to delete a node from the input graph
function deleteNode() {
    const label = prompt('Etiqueta del nodo a eliminar:');
    if (label) {
        const node = cyInput.nodes().find(n => n.data('label') === label);
        if (node) {
            cyInput.remove(node); // Removes the node and its connected edges
            applyLayout(cyInput);
            setTimeout(() => cyInput.fit(), 50);
        } else {
            alert('Nodo no encontrado.');
        }
    }
}

// Function to delete an edge from the input graph
function deleteEdge() {
    const nodes = cyInput.nodes();
    
    if (nodes.length < 2) {
        alert('No hay suficientes nodos.');
        return;
    }

    const nodeList = nodes.map(n => n.data('label')).join(', ');
    const sourceLabel = prompt(`Etiqueta del nodo origen (${nodeList}):`);
    const targetLabel = prompt(`Etiqueta del nodo destino (${nodeList}):`);
    
    if (sourceLabel && targetLabel) {
        const edge = cyInput.edges().find(e => 
            cyInput.getElementById(e.data('source')).data('label') === sourceLabel && 
            cyInput.getElementById(e.data('target')).data('label') === targetLabel
        );
        
        if (edge) {
            cyInput.remove(edge);
            applyLayout(cyInput);
        } else {
            alert('Arista no encontrada en esa dirección.');
        }
    }
}

// Function to clear the input graph
function clearGraph() {
    cyInput.elements().remove();
    document.getElementById('floyd-result').innerHTML = '';
    setTimeout(() => cyInput.fit(), 50);
}

// Helper function to get graph data
function getGraphData(cy) {
    const nodes = cy.nodes().map(n => ({
        id: n.id(),
        label: n.data('label'),
        graph: n.data('graph')
    }));
    
    const edges = cy.edges().map(e => ({
        id: e.id(),
        source: e.data('source'),
        target: e.data('target'),
        sourceLabel: cy.getElementById(e.data('source')).data('label'),
        targetLabel: cy.getElementById(e.data('target')).data('label'),
        label: e.data('label'),
        weight: e.data('weight'),
        graph: e.data('graph')
    }));
    
    return { nodes, edges };
}

// Floyd-Warshall Algorithm
function performFloydWarshall() {
    const data = getGraphData(cyInput);
    const nodes = data.nodes;
    const edges = data.edges;
    
    if (nodes.length === 0) {
        alert('El grafo no tiene nodos.');
        return;
    }
    
    // Create distance matrix
    const n = nodes.length;
    const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
    const next = Array.from({ length: n }, () => Array(n).fill(null));
    
    // Map node labels to indices
    const nodeIndex = {};
    nodes.forEach((node, i) => {
        nodeIndex[node.label] = i;
        dist[i][i] = 0;
    });
    
    // Fill initial distances (solo en la dirección de la arista, no simétrica)
    edges.forEach(edge => {
        const i = nodeIndex[edge.sourceLabel];
        const j = nodeIndex[edge.targetLabel];
        dist[i][j] = edge.weight;
        next[i][j] = j;
    });
    
    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    next[i][j] = next[i][k];
                }
            }
        }
    }
    
    // Display results
    displayFloydResults(nodes, dist, next);
}

// Function to reconstruct path
function reconstructPath(next, start, end) {
    const path = [];
    let current = start;
    while (current !== end) {
        if (current === null) return null;
        path.push(current);
        current = next[current][end];
    }
    path.push(end);
    return path;
}

// Display Floyd-Warshall results
function displayFloydResults(nodes, dist, next) {
    const resultDiv = document.getElementById('floyd-result');
    resultDiv.innerHTML = '';
    
    // Create distance matrix table
    let html = '<h5>Matriz de Distancias Mínimas</h5>';
    html += '<table class="matrix-table">';
    html += '<tr><th></th>';
    nodes.forEach(node => html += `<th>${node.label}</th>`);
    html += '</tr>';
    
    for (let i = 0; i < nodes.length; i++) {
        html += `<tr><th>${nodes[i].label}</th>`;
        for (let j = 0; j < nodes.length; j++) {
            const value = dist[i][j] === Infinity ? '∞' : dist[i][j];
            html += `<td>${value}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    
    // Display paths for all pairs
    html += '<h5>Caminos Más Cortos</h5>';
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            if (i !== j && dist[i][j] !== Infinity) {
                const pathIndices = reconstructPath(next, i, j);
                if (pathIndices) {
                    const pathLabels = pathIndices.map(idx => nodes[idx].label);
                    html += `<p>${nodes[i].label} → ${nodes[j].label}: ${pathLabels.join(' → ')} (distancia: ${dist[i][j]})</p>`;
                }
            }
        }
    }
    
    resultDiv.innerHTML = html;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGraph);
} else {
    initGraph();
}
