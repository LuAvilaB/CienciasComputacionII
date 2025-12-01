// Initialize graphs as Cytoscape instances
let cy1, cy2, cyResult;

// Colors matching your theme
const themeColors = {
    nodeText: '#f6f2e9',
    graphBackground: '#a37568'
};

// Colors for different operations
const operationColors = {
    existingEdge: '#f6f2e9',    // White for existing edges
    newEdge: '#5c5650ff',         // Gray for new edges
    graph1Node: '#8c5d51',      // Brown for graph 1
    graph1Border: '#f6f2e9',
    graph2Node: '#5c8c51',      // Green for graph 2  
    graph2Border: '#f6f2e9',
    resultNode: '#517a8c',      // Blue for result
    resultBorder: '#345c6b'
};

// Style for all graphs
const createGraphStyle = (graphType = 'default') => {
    let nodeColor, borderColor;
    
    switch(graphType) {
        case 'graph1':
            nodeColor = operationColors.graph1Node;
            borderColor = operationColors.graph1Border;
            break;
        case 'graph2':
            nodeColor = operationColors.graph2Node;
            borderColor = operationColors.graph2Border;
            break;
        case 'result':
        default:
            nodeColor = operationColors.resultNode;
            borderColor = operationColors.resultBorder;
            break;
    }
    
    return [
        {
            selector: 'node',
            style: {
                'background-color': nodeColor,
                'border-color': borderColor,
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
                'line-color': 'data(edgeColor)',
                'target-arrow-color': 'data(edgeColor)',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'arrow-scale': 1.2,
                'label': 'data(label)',
                'color': themeColors.nodeText,
                'text-background-color': nodeColor,
                'text-background-opacity': 0.7,
                'text-background-padding': '3px'
            }
        },
        {
            selector: 'edge[edgeType="existing"]',
            style: {
                'line-color': operationColors.existingEdge,
                'target-arrow-color': operationColors.existingEdge,
                'line-style': 'solid'
            }
        },
        {
            selector: 'edge[edgeType="new"]',
            style: {
                'line-color': operationColors.newEdge,
                'target-arrow-color': operationColors.newEdge,
                'line-style': 'dashed'
            }
        }
    ];
};

// Initialize all graphs
function initGraphs() {
    // Clear any existing content first
    document.getElementById('graph1').innerHTML = '';
    document.getElementById('graph2').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    
    cy1 = cytoscape({
        container: document.getElementById('graph1'),
        style: createGraphStyle('graph1'),
        layout: { name: 'grid', rows: 1 },
        minZoom: 0.3,
        maxZoom: 3,
        wheelSensitivity: 0.1,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true
    });

    cy2 = cytoscape({
        container: document.getElementById('graph2'),
        style: createGraphStyle('graph2'),
        layout: { name: 'grid', rows: 1 },
        minZoom: 0.3,
        maxZoom: 3,
        wheelSensitivity: 0.1,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true
    });

    cyResult = cytoscape({
        container: document.getElementById('result'),
        style: createGraphStyle('result'),
        layout: { name: 'grid', rows: 1 },
        minZoom: 0.3,
        maxZoom: 3,
        wheelSensitivity: 0.1,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true
    });

    // Fit graphs to their containers
    fitGraphsToContainer();
    
    // Add some initial nodes for testing
    addInitialGraphs();
}

// Fit all graphs to their containers
function fitGraphsToContainer() {
    [cy1, cy2, cyResult].forEach(cy => {
        if (cy) {
            setTimeout(() => {
                cy.fit();
                cy.center();
                cy.zoom(1);
            }, 100);
        }
    });
}

// Add initial graphs for testing
function addInitialGraphs() {
    // Graph 1 - Triángulo
    cy1.add([
        { data: { id: 'g1-A', label: 'A', graph: 1 } },
        { data: { id: 'g1-B', label: 'B', graph: 1 } },
        { data: { id: 'g1-C', label: 'C', graph: 1 } },
        { data: { id: 'g1-AB', source: 'g1-A', target: 'g1-B', label: 'AB', graph: 1 } },
        { data: { id: 'g1-BC', source: 'g1-B', target: 'g1-C', label: 'BC', graph: 1 } },
        { data: { id: 'g1-CA', source: 'g1-C', target: 'g1-A', label: 'CA', graph: 1 } }
    ]);
    
    // Graph 2 - Línea
    cy2.add([
        { data: { id: 'g2-D', label: 'D', graph: 2 } },
        { data: { id: 'g2-E', label: 'E', graph: 2 } },
        { data: { id: 'g2-DE', source: 'g2-D', target: 'g2-E', label: 'DE', graph: 2 } },
    ]);
    
    // Apply layouts
    applyLayout(cy1);
    applyLayout(cy2);
}

// Apply layout to a graph
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

// Counters for unique IDs
let nodeId1 = 3, nodeId2 = 3, edgeId1 = 3, edgeId2 = 2;

// Function to add a node to a graph
function addNode(graphNum) {
    const cy = graphNum === 1 ? cy1 : cy2;
    const label = prompt('Etiqueta del nodo (ej: A, B, C):');
    if (label) {
        const existingNode = cy.nodes().find(node => node.data('label') === label);
        if (existingNode) {
            alert(`El nodo con etiqueta "${label}" ya existe en este grafo.`);
            return;
        }
        
        const id = graphNum === 1 ? `g1-${label}${++nodeId1}` : `g2-${label}${++nodeId2}`;
        cy.add({ data: { id, label, graph: graphNum } });
        
        applyLayout(cy);
        setTimeout(() => cy.fit(), 50);
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

    const nodeList = nodes.map(n => n.data('label')).join(', ');
    const sourceLabel = prompt(`Etiqueta del nodo origen (${nodeList}):`);
    const targetLabel = prompt(`Etiqueta del nodo destino (${nodeList}):`);
    
    if (sourceLabel && targetLabel) {
        const sourceNode = nodes.find(n => n.data('label') === sourceLabel);
        const targetNode = nodes.find(n => n.data('label') === targetLabel);
        
        if (sourceNode && targetNode) {
            const existingEdge = cy.edges().find(edge => 
                (edge.data('source') === sourceNode.id() && 
                 edge.data('target') === targetNode.id()) ||
                (edge.data('source') === targetNode.id() && 
                 edge.data('target') === sourceNode.id())
            );
            
            if (existingEdge) {
                alert('Esta arista ya existe (o su inversa).');
                return;
            }
            
            const edgeId = graphNum === 1 ? `g1-e${++edgeId1}` : `g2-e${++edgeId2}`;
            const edgeLabel = `${sourceLabel}${targetLabel}`;
            
            cy.add({ 
                data: { 
                    id: edgeId, 
                    source: sourceNode.id(), 
                    target: targetNode.id(),
                    label: edgeLabel,
                    graph: graphNum,
                    edgeColor: operationColors.existingEdge
                } 
            });
            
            applyLayout(cy);
        } else {
            alert('Uno o ambos nodos no existen.');
        }
    }
}

// Function to delete a node from a graph
function deleteNode(graphNum) {
    const cy = graphNum === 1 ? cy1 : cy2;
    const label = prompt('Etiqueta del nodo a eliminar:');
    if (label) {
        const node = cy.nodes().find(n => n.data('label') === label);
        if (node) {
            cy.remove(node); // Removes the node and its connected edges
            applyLayout(cy);
            setTimeout(() => cy.fit(), 50);
        } else {
            alert('Nodo no encontrado.');
        }
    }
}

// Function to delete an edge from a graph
function deleteEdge(graphNum) {
    const cy = graphNum === 1 ? cy1 : cy2;
    const nodes = cy.nodes();
    
    if (nodes.length < 2) {
        alert('No hay suficientes nodos.');
        return;
    }

    const nodeList = nodes.map(n => n.data('label')).join(', ');
    const sourceLabel = prompt(`Etiqueta del nodo origen (${nodeList}):`);
    const targetLabel = prompt(`Etiqueta del nodo destino (${nodeList}):`);
    
    if (sourceLabel && targetLabel) {
        const edge = cy.edges().find(e => 
            (cy.getElementById(e.data('source')).data('label') === sourceLabel && 
             cy.getElementById(e.data('target')).data('label') === targetLabel) ||
            (cy.getElementById(e.data('source')).data('label') === targetLabel && 
             cy.getElementById(e.data('target')).data('label') === sourceLabel)
        );
        
        if (edge) {
            cy.remove(edge);
            applyLayout(cy);
        } else {
            alert('Arista no encontrada.');
        }
    }
}

// Function to clear a graph
function clearGraph(graphNum) {
    const cy = graphNum === 1 ? cy1 : cy2;
    cy.elements().remove();
    setTimeout(() => cy.fit(), 50);
}

// Helper functions
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
        graph: e.data('graph')
    }));
    
    return { nodes, edges };
}

function createNodeMap(nodes) {
    const map = new Map();
    nodes.forEach(node => map.set(node.label, node));
    return map;
}

function createEdgeSet(edges) {
    const set = new Set();
    edges.forEach(edge => {
        const key = `${edge.sourceLabel}-${edge.targetLabel}`;
        const reverseKey = `${edge.targetLabel}-${edge.sourceLabel}`;
        set.add(key);
        set.add(reverseKey); // Consider edges as undirected for operations
    });
    return set;
}

// Operation: Suma Completa (con todas las conexiones posibles)
function performSum() {
    const data1 = getGraphData(cy1);
    const data2 = getGraphData(cy2);
    
    // Merge nodes by label
    const allNodes = [...data1.nodes, ...data2.nodes];
    const nodeMap = new Map();
    const resultNodes = [];
    let nodeCounter = 1;
    
    allNodes.forEach(node => {
        if (!nodeMap.has(node.label)) {
            const newNode = {
                id: `sum-n${nodeCounter++}`,
                label: node.label,
                graph: 'sum'
            };
            nodeMap.set(node.label, newNode);
            resultNodes.push(newNode);
        }
    });
    
    // Create all possible edges between nodes
    const resultEdges = [];
    let edgeCounter = 1;
    
    // Get existing edges from both graphs
    const existingEdges = new Set();
    [...data1.edges, ...data2.edges].forEach(edge => {
        const key = `${edge.sourceLabel}-${edge.targetLabel}`;
        existingEdges.add(key);
    });
    
    // Create all possible pairs
    for (let i = 0; i < resultNodes.length; i++) {
        for (let j = i + 1; j < resultNodes.length; j++) {
            const node1 = resultNodes[i];
            const node2 = resultNodes[j];
            const edgeKey = `${node1.label}-${node2.label}`;
            const reverseKey = `${node2.label}-${node1.label}`;
            
            const edgeExists = existingEdges.has(edgeKey) || existingEdges.has(reverseKey);
            
            resultEdges.push({
                id: `sum-e${edgeCounter++}`,
                source: node1.id,
                target: node2.id,
                label: `${node1.label}${node2.label}`,
                edgeType: edgeExists ? 'existing' : 'new',
                edgeColor: edgeExists ? operationColors.existingEdge : operationColors.newEdge
            });
        }
    }
    
    renderResult(resultNodes, resultEdges, 'Suma Completa');
}

// Operation: Suma Anillo (Suma Simétrica)
function performRingSum() {
    const data1 = getGraphData(cy1);
    const data2 = getGraphData(cy2);
    
    // Get edge sets for both graphs
    const edges1 = createEdgeSet(data1.edges);
    const edges2 = createEdgeSet(data2.edges);
    
    // Ring Sum = (G1 ∪ G2) - (G1 ∩ G2)
    const ringSumEdges = new Set();
    
    // Add edges that are in G1 but not in G2
    edges1.forEach(edgeKey => {
        if (!edges2.has(edgeKey)) {
            ringSumEdges.add(edgeKey);
        }
    });
    
    // Add edges that are in G2 but not in G1
    edges2.forEach(edgeKey => {
        if (!edges1.has(edgeKey)) {
            ringSumEdges.add(edgeKey);
        }
    });
    
    // Merge nodes
    const allNodes = [...data1.nodes, ...data2.nodes];
    const nodeMap = new Map();
    const resultNodes = [];
    let nodeCounter = 1;
    
    allNodes.forEach(node => {
        if (!nodeMap.has(node.label)) {
            const newNode = {
                id: `ring-n${nodeCounter++}`,
                label: node.label,
                graph: 'ring'
            };
            nodeMap.set(node.label, newNode);
            resultNodes.push(newNode);
        }
    });
    
    // Create edges from ring sum set
    const resultEdges = [];
    let edgeCounter = 1;
    
    ringSumEdges.forEach(edgeKey => {
        const [sourceLabel, targetLabel] = edgeKey.split('-');
        const sourceNode = resultNodes.find(n => n.label === sourceLabel);
        const targetNode = resultNodes.find(n => n.label === targetLabel);
        
        if (sourceNode && targetNode) {
            resultEdges.push({
                id: `ring-e${edgeCounter++}`,
                source: sourceNode.id,
                target: targetNode.id,
                label: `${sourceLabel}${targetLabel}`,
                edgeType: 'existing',
                edgeColor: operationColors.existingEdge
            });
        }
    });
    
    renderResult(resultNodes, resultEdges, 'Suma Anillo');
}

// Operation: Producto Tensorial
function performTensorProduct() {
    const data1 = getGraphData(cy1);
    const data2 = getGraphData(cy2);
    
    const resultNodes = [];
    const resultEdges = [];
    let nodeCounter = 1;
    let edgeCounter = 1;
    
    // Create nodes: (u,v) for each u in G1 and v in G2
    data1.nodes.forEach(node1 => {
        data2.nodes.forEach(node2 => {
            resultNodes.push({
                id: `tensor-n${nodeCounter++}`,
                label: `(${node1.label},${node2.label})`,
                original: { g1: node1.label, g2: node2.label },
                graph: 'tensor'
            });
        });
    });
    
    // Create edges: connect (u,v) with (u',v') if:
    // u is connected to u' in G1 AND v is connected to v' in G2
    const edges1Set = createEdgeSet(data1.edges);
    const edges2Set = createEdgeSet(data2.edges);
    
    for (let i = 0; i < resultNodes.length; i++) {
        for (let j = i + 1; j < resultNodes.length; j++) {
            const nodeA = resultNodes[i];
            const nodeB = resultNodes[j];
            
            const u = nodeA.original.g1;
            const v = nodeA.original.g2;
            const uPrime = nodeB.original.g1;
            const vPrime = nodeB.original.g2;
            
            // Check if u-u' edge exists in G1 AND v-v' edge exists in G2
            const edge1Exists = edges1Set.has(`${u}-${uPrime}`) || edges1Set.has(`${uPrime}-${u}`);
            const edge2Exists = edges2Set.has(`${v}-${vPrime}`) || edges2Set.has(`${vPrime}-${v}`);
            
            if (edge1Exists && edge2Exists) {
                resultEdges.push({
                    id: `tensor-e${edgeCounter++}`,
                    source: nodeA.id,
                    target: nodeB.id,
                    label: `${u}${uPrime}×${v}${vPrime}`,
                    edgeType: 'existing',
                    edgeColor: operationColors.existingEdge
                });
            }
        }
    }
    
    renderResult(resultNodes, resultEdges, 'Producto Tensorial');
}

// Operation: Producto Cartesiano
function performCartesianProduct() {
    const data1 = getGraphData(cy1);
    const data2 = getGraphData(cy2);
    
    const resultNodes = [];
    const resultEdges = [];
    let nodeCounter = 1;
    let edgeCounter = 1;
    
    // Create nodes: (u,v) for each u in G1 and v in G2
    data1.nodes.forEach(node1 => {
        data2.nodes.forEach(node2 => {
            resultNodes.push({
                id: `cart-n${nodeCounter++}`,
                label: `(${node1.label},${node2.label})`,
                original: { g1: node1.label, g2: node2.label },
                graph: 'cartesian'
            });
        });
    });
    
    // Create edges based on cartesian product rules:
    // 1. Connect (u,v) with (u',v) if u-u' edge exists in G1
    // 2. Connect (u,v) with (u,v') if v-v' edge exists in G2
    
    const edges1Set = createEdgeSet(data1.edges);
    const edges2Set = createEdgeSet(data2.edges);
    
    for (let i = 0; i < resultNodes.length; i++) {
        for (let j = i + 1; j < resultNodes.length; j++) {
            const nodeA = resultNodes[i];
            const nodeB = resultNodes[j];
            
            const u = nodeA.original.g1;
            const v = nodeA.original.g2;
            const uPrime = nodeB.original.g1;
            const vPrime = nodeB.original.g2;
            
            // Case 1: Same v, different u with edge in G1
            if (v === vPrime) {
                const edgeExists = edges1Set.has(`${u}-${uPrime}`) || edges1Set.has(`${uPrime}-${u}`);
                if (edgeExists) {
                    resultEdges.push({
                        id: `cart-e${edgeCounter++}`,
                        source: nodeA.id,
                        target: nodeB.id,
                        label: `${u}${uPrime}|${v}`,
                        edgeType: 'existing',
                        edgeColor: operationColors.existingEdge
                    });
                }
            }
            // Case 2: Same u, different v with edge in G2
            else if (u === uPrime) {
                const edgeExists = edges2Set.has(`${v}-${vPrime}`) || edges2Set.has(`${vPrime}-${v}`);
                if (edgeExists) {
                    resultEdges.push({
                        id: `cart-e${edgeCounter++}`,
                        source: nodeA.id,
                        target: nodeB.id,
                        label: `${u}|${v}${vPrime}`,
                        edgeType: 'existing',
                        edgeColor: operationColors.existingEdge
                    });
                }
            }
        }
    }
    
    renderResult(resultNodes, resultEdges, 'Producto Cartesiano');
}

// Operation: Composición (Lexicographical Product)
function performComposition() {
    const data1 = getGraphData(cy1);
    const data2 = getGraphData(cy2);
    
    const resultNodes = [];
    const resultEdges = [];
    let nodeCounter = 1;
    let edgeCounter = 1;
    
    // Create nodes: (u,v) for each u in G1 and v in G2
    data1.nodes.forEach(node1 => {
        data2.nodes.forEach(node2 => {
            resultNodes.push({
                id: `comp-n${nodeCounter++}`,
                label: `(${node1.label},${node2.label})`,
                original: { g1: node1.label, g2: node2.label },
                graph: 'composition'
            });
        });
    });
    
    // Create edges based on composition rules:
    // Connect (u,v) with (u',v') if:
    // 1. u-u' edge exists in G1, OR
    // 2. u = u' and v-v' edge exists in G2
    
    const edges1Set = createEdgeSet(data1.edges);
    const edges2Set = createEdgeSet(data2.edges);
    
    for (let i = 0; i < resultNodes.length; i++) {
        for (let j = i + 1; j < resultNodes.length; j++) {
            const nodeA = resultNodes[i];
            const nodeB = resultNodes[j];
            
            const u = nodeA.original.g1;
            const v = nodeA.original.g2;
            const uPrime = nodeB.original.g1;
            const vPrime = nodeB.original.g2;
            
            let shouldConnect = false;
            let label = '';
            
            // Case 1: Different u with edge in G1
            if (u !== uPrime) {
                const edgeExists = edges1Set.has(`${u}-${uPrime}`) || edges1Set.has(`${uPrime}-${u}`);
                if (edgeExists) {
                    shouldConnect = true;
                    label = `${u}${uPrime}`;
                }
            }
            // Case 2: Same u, different v with edge in G2
            else if (v !== vPrime) {
                const edgeExists = edges2Set.has(`${v}-${vPrime}`) || edges2Set.has(`${vPrime}-${v}`);
                if (edgeExists) {
                    shouldConnect = true;
                    label = `${u}:${v}${vPrime}`;
                }
            }
            
            if (shouldConnect) {
                resultEdges.push({
                    id: `comp-e${edgeCounter++}`,
                    source: nodeA.id,
                    target: nodeB.id,
                    label: label,
                    edgeType: 'existing',
                    edgeColor: operationColors.existingEdge
                });
            }
        }
    }
    
    renderResult(resultNodes, resultEdges, 'Composición');
}

// Render result graph
function renderResult(nodes, edges, operationName) {
    cyResult.elements().remove();
    
    if (nodes.length > 0) {
        // Add nodes
        nodes.forEach(node => {
            cyResult.add({ 
                data: { 
                    id: node.id, 
                    label: node.label,
                    graph: node.graph
                } 
            });
        });
        
        // Add edges
        edges.forEach(edge => {
            cyResult.add({ 
                data: { 
                    id: edge.id, 
                    source: edge.source, 
                    target: edge.target,
                    label: edge.label,
                    edgeType: edge.edgeType,
                    edgeColor: edge.edgeColor
                } 
            });
        });
        
        // Apply layout with more space for complex graphs
        const layoutName = nodes.length > 10 ? 'cose' : 'circle';
        const isComplexOperation = ['Producto Tensorial', 'Producto Cartesiano', 'Composición'].includes(operationName);
        const spacingFactor = isComplexOperation ? 2.5 : 1.5; // More spacing for complex operations
        
        cyResult.layout({
            name: layoutName,
            animate: true,
            animationDuration: 800,
            fit: true,
            padding: 40,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            spacingFactor: spacingFactor
        }).run();
        
        // Update title
        document.querySelector('#result').previousElementSibling.innerHTML = 
            `Resultado: ${operationName} (${nodes.length} nodos, ${edges.length} aristas)`;
    } else {
        cyResult.add({ 
            data: { 
                id: 'no-result', 
                label: 'Sin resultados',
                graph: '0'
            } 
        });
        cyResult.center();
    }
    
    // Fit to container
    setTimeout(() => {
        cyResult.fit();
        cyResult.center();
    }, 100);
}

// Update the performOperation function to include all operations
function performOperation(op) {
    switch(op) {
        case 'union':
            // Keep existing union
            const data1 = getGraphData(cy1);
            const data2 = getGraphData(cy2);
            
            const allNodes = [...data1.nodes, ...data2.nodes];
            const nodeMap = new Map();
            const unionNodes = [];
            let unionNodeCounter = 1;
            
            allNodes.forEach(node => {
                if (!nodeMap.has(node.label)) {
                    const newNode = {
                        id: `union-n${unionNodeCounter++}`,
                        label: node.label,
                        graph: 'union'
                    };
                    nodeMap.set(node.label, newNode);
                    unionNodes.push(newNode);
                }
            });
            
            const allEdges = [...data1.edges, ...data2.edges];
            const edgeMap = new Map();
            const unionEdges = [];
            let unionEdgeCounter = 1;
            
            allEdges.forEach(edge => {
                const edgeKey = `${edge.sourceLabel}-${edge.targetLabel}`;
                if (!edgeMap.has(edgeKey)) {
                    const sourceNode = unionNodes.find(n => n.label === edge.sourceLabel);
                    const targetNode = unionNodes.find(n => n.label === edge.targetLabel);
                    
                    if (sourceNode && targetNode) {
                        unionEdges.push({
                            id: `union-e${unionEdgeCounter++}`,
                            source: sourceNode.id,
                            target: targetNode.id,
                            label: edge.label,
                            edgeType: 'existing',
                            edgeColor: operationColors.existingEdge
                        });
                        edgeMap.set(edgeKey, true);
                    }
                }
            });
            
            renderResult(unionNodes, unionEdges, 'Unión');
            break;
            
        case 'intersection':
            // Keep existing intersection
            const interData1 = getGraphData(cy1);
            const interData2 = getGraphData(cy2);
            
            const labels1 = new Set(interData1.nodes.map(n => n.label));
            const labels2 = new Set(interData2.nodes.map(n => n.label));
            const commonLabels = new Set([...labels1].filter(label => labels2.has(label)));
            
            const interNodes = Array.from(commonLabels).map((label, index) => ({
                id: `inter-n${index + 1}`,
                label: label,
                graph: 'intersection'
            }));
            
            const edges1Set = createEdgeSet(interData1.edges);
            const edges2Set = createEdgeSet(interData2.edges);
            const interEdges = [];
            let interEdgeCounter = 1;
            
            edges1Set.forEach(edgeKey => {
                if (edges2Set.has(edgeKey)) {
                    const [sourceLabel, targetLabel] = edgeKey.split('-');
                    const sourceNode = interNodes.find(n => n.label === sourceLabel);
                    const targetNode = interNodes.find(n => n.label === targetLabel);
                    
                    if (sourceNode && targetNode && sourceLabel !== targetLabel) {
                        interEdges.push({
                            id: `inter-e${interEdgeCounter++}`,
                            source: sourceNode.id,
                            target: targetNode.id,
                            label: `${sourceLabel}${targetLabel}`,
                            edgeType: 'existing',
                            edgeColor: operationColors.existingEdge
                        });
                    }
                }
            });
            
            renderResult(interNodes, interEdges, 'Intersección');
            break;
            
        case 'sum':
            performSum();
            break;
            
        case 'ring':
            performRingSum();
            break;
            
        case 'tensor':
            performTensorProduct();
            break;
            
        case 'cartesian':
            performCartesianProduct();
            break;
            
        case 'composition':
            performComposition();
            break;
            
        default:
            alert('Operación no reconocida');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGraphs);
} else {
    initGraphs();
}