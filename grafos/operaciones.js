// Initialize graphs as Cytoscape instances
let cy1, cy2, cyResult;

// Colors matching your theme
const themeColors = {
    nodeBackground: '#8c5d51', // Brown from your theme
    nodeBorder: '#5c3d34',     // Darker brown
    edgeColor: '#f6f2e9',      // Text color for edges
    nodeText: '#f6f2e9',       // Light text
    graphBackground: '#a37568' // Lighter brown for cards
};

// Style for all graphs
const graphStyle = [
    {
        selector: 'node',
        style: {
            'background-color': themeColors.nodeBackground,
            'border-color': themeColors.nodeBorder,
            'border-width': 2,
            'label': 'data(label)',
            'color': themeColors.nodeText,
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '16px',
            'font-weight': 'bold',
            'width': 40,
            'height': 45
        }
    },
    {
        selector: 'edge',
        style: {
            'width': 3,
            'line-color': themeColors.edgeColor,
            'target-arrow-color': themeColors.edgeColor,
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 1.5
        }
    },
    {
        selector: 'node:selected',
        style: {
            'background-color': '#ff5c5c',
            'border-color': '#d94343'
        }
    },
    {
        selector: 'edge:selected',
        style: {
            'line-color': '#ff5c5c',
            'target-arrow-color': '#ff5c5c'
        }
    }
];

// Initialize all graphs
function initGraphs() {
    cy1 = cytoscape({
        container: document.getElementById('graph1'),
        style: graphStyle,
        layout: { name: 'grid', rows: 1 },
        minZoom: 0.5,
        maxZoom: 2,
        wheelSensitivity: 0.2
    });

    cy2 = cytoscape({
        container: document.getElementById('graph2'),
        style: graphStyle,
        layout: { name: 'grid', rows: 1 },
        minZoom: 0.5,
        maxZoom: 2,
        wheelSensitivity: 0.2
    });

    cyResult = cytoscape({
        container: document.getElementById('result'),
        style: graphStyle,
        layout: { name: 'grid', rows: 1 },
        minZoom: 0.5,
        maxZoom: 2,
        wheelSensitivity: 0.2
    });

    // Add some initial nodes for testing
    cy1.add([
        { data: { id: 'g1-n1', label: 'A' } },
        { data: { id: 'g1-n2', label: 'B' } },
        { data: { id: 'e1', source: 'g1-n1', target: 'g1-n2' } }
    ]);
    
    cy2.add([
        { data: { id: 'g2-n1', label: 'A' } },
        { data: { id: 'g2-n2', label: 'B' } },
        { data: { id: 'g2-n3', label: 'C' } },
        { data: { id: 'e2', source: 'g2-n1', target: 'g2-n2' } }
    ]);

    // Apply layouts
    cy1.layout({ name: 'cose', animate: true }).run();
    cy2.layout({ name: 'cose', animate: true }).run();
}

// Counters for unique IDs
let nodeId1 = 3, nodeId2 = 4, edgeId1 = 2, edgeId2 = 2;

// Function to add a node to a graph
function addNode(graphNum) {
    const cy = graphNum === 1 ? cy1 : cy2;
    const prefix = graphNum === 1 ? 'g1-' : 'g2-';
    const label = prompt('Etiqueta del nodo (ej: A, B, C):');
    if (label) {
        const id = graphNum === 1 ? `g1-n${++nodeId1}` : `g2-n${++nodeId2}`;
        cy.add({ data: { id, label } });
        // Apply layout after adding node
        cy.layout({
            name: 'cose',
            animate: true,
            animationDuration: 1000,
            fit: true,
            padding: 30
        }).run();
    }
}

// Function to add an edge between nodes
function addEdge(graphNum) {
    const cy = graphNum === 1 ? cy1 : cy2;
    const nodes = cy.nodes();
    
    if (nodes.length < 2) {
        alert('Necesitas al menos 2 nodos para crear una arista.');
        return;
    }

    // Create list of nodes with labels
    const nodeList = nodes.map(n => `${n.id()} (${n.data('label')})`).join('\n');
    
    const sourceId = prompt(`ID del nodo origen:\n${nodeList}`);
    const targetId = prompt(`ID del nodo destino:\n${nodeList}`);
    
    if (sourceId && targetId) {
        const sourceNode = cy.getElementById(sourceId.split(' ')[0]); // Get just the ID
        const targetNode = cy.getElementById(targetId.split(' ')[0]);
        
        if (sourceNode && targetNode) {
            const edgeId = graphNum === 1 ? `e${++edgeId1}` : `e${++edgeId2}`;
            cy.add({ 
                data: { 
                    id: edgeId, 
                    source: sourceNode.id(), 
                    target: targetNode.id() 
                } 
            });
            
            // Apply layout
            cy.layout({
                name: 'cose',
                animate: true,
                animationDuration: 1000
            }).run();
        } else {
            alert('Uno o ambos nodos no existen.');
        }
    }
}

// Function to perform operations
function performOperation(op) {
    const elements1 = cy1.elements().jsons();
    const elements2 = cy2.elements().jsons();
    
    let resultElements = [];
    
    if (op === 'union') {
        // Union: all nodes and edges from both graphs
        const allElements = [...elements1, ...elements2];
        const seenIds = new Set();
        
        resultElements = allElements.filter(el => {
            if (seenIds.has(el.data.id)) return false;
            seenIds.add(el.data.id);
            return true;
        });
    } 
    else if (op === 'intersection') {
        // Intersection: only common elements
        const elementMap1 = new Map();
        const elementMap2 = new Map();
        
        // Map by ID for quick lookup
        elements1.forEach(el => elementMap1.set(el.data.id, el));
        elements2.forEach(el => elementMap2.set(el.data.id, el));
        
        // Find common elements
        elements1.forEach(el => {
            if (elementMap2.has(el.data.id)) {
                resultElements.push(el);
            }
        });
    } 
    else if (op === 'sum') {
        // Disjoint union: rename all elements to avoid conflicts
        elements1.forEach(el => {
            const newEl = JSON.parse(JSON.stringify(el));
            newEl.data.id = `g1-${newEl.data.id}`;
            if (newEl.data.source) {
                newEl.data.source = `g1-${newEl.data.source}`;
                newEl.data.target = `g1-${newEl.data.target}`;
            }
            resultElements.push(newEl);
        });
        
        elements2.forEach(el => {
            const newEl = JSON.parse(JSON.stringify(el));
            newEl.data.id = `g2-${newEl.data.id}`;
            if (newEl.data.source) {
                newEl.data.source = `g2-${newEl.data.source}`;
                newEl.data.target = `g2-${newEl.data.target}`;
            }
            resultElements.push(newEl);
        });
    }
    
    // Clear and render result
    cyResult.elements().remove();
    if (resultElements.length > 0) {
        cyResult.add(resultElements);
        cyResult.layout({
            name: 'cose',
            animate: true,
            animationDuration: 1000,
            fit: true,
            padding: 50
        }).run();
    }
}

// Initialize graphs when page loads
window.addEventListener('DOMContentLoaded', initGraphs);