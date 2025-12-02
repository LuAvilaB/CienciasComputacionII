// Initialize graphs as Cytoscape instances
let cyInput, cyResult;

// Colors matching your theme
const themeColors = {
    nodeText: '#f6f2e9',
    graphBackground: '#a37568'
};

// Colors for different operations
const operationColors = {
    existingEdge: '#f6f2e9',    // White for existing edges
    newEdge: '#5c5650ff',         // Gray for new edges
    inputNode: '#8c5d51',      // Brown for input graph
    inputBorder: '#f6f2e9',
    resultNode: '#517a8c',      // Blue for result
    resultBorder: '#f6f2e9'
};

// Style for all graphs
const createGraphStyle = (graphType = 'default') => {
    let nodeColor, borderColor;
    
    switch(graphType) {
        case 'input':
            nodeColor = operationColors.inputNode;
            borderColor = operationColors.inputBorder;
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
                'target-arrow-shape': 'none',  // Changed to 'none' to make edges undirected
                'curve-style': 'bezier',
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
    document.getElementById('graph').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    
    cyInput = cytoscape({
        container: document.getElementById('graph'),
        style: createGraphStyle('input'),
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
    addInitialGraph();
}

// Fit all graphs to their containers
function fitGraphsToContainer() {
    [cyInput, cyResult].forEach(cy => {
        if (cy) {
            setTimeout(() => {
                cy.fit();
                cy.center();
                cy.zoom(1);
            }, 100);
        }
    });
}

// Add initial graph for testing
function addInitialGraph() {
    // Initial graph - Triangle
    cyInput.add([
        { data: { id: 'A', label: 'A', graph: 'input' } },
        { data: { id: 'B', label: 'B', graph: 'input' } },
        { data: { id: 'C', label: 'C', graph: 'input' } },
        { data: { id: 'AB', source: 'A', target: 'B', label: 'AB', graph: 'input' } },
        { data: { id: 'BC', source: 'B', target: 'C', label: 'BC', graph: 'input' } },
        { data: { id: 'CA', source: 'C', target: 'A', label: 'CA', graph: 'input' } }
    ]);
    
    // Apply layout
    applyLayout(cyInput);
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

// Function to add an edge between nodes
function addEdge() {
    const nodes = cyInput.nodes();
    
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
            const existingEdge = cyInput.edges().find(edge => 
                (edge.data('source') === sourceNode.id() && 
                 edge.data('target') === targetNode.id()) ||
                (edge.data('source') === targetNode.id() && 
                 edge.data('target') === sourceNode.id())
            );
            
            if (existingEdge) {
                alert('Esta arista ya existe (o su inversa).');
                return;
            }
            
            const edgeId = `e${++edgeId}`;
            const edgeLabel = `${sourceLabel}${targetLabel}`;
            
            cyInput.add({ 
                data: { 
                    id: edgeId, 
                    source: sourceNode.id(), 
                    target: targetNode.id(),
                    label: edgeLabel,
                    graph: 'input',
                    edgeColor: operationColors.existingEdge
                } 
            });
            
            applyLayout(cyInput);
        } else {
            alert('Uno o ambos nodos no existen.');
        }
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
            (cyInput.getElementById(e.data('source')).data('label') === sourceLabel && 
             cyInput.getElementById(e.data('target')).data('label') === targetLabel) ||
            (cyInput.getElementById(e.data('source')).data('label') === targetLabel && 
             cyInput.getElementById(e.data('target')).data('label') === sourceLabel)
        );
        
        if (edge) {
            cyInput.remove(edge);
            applyLayout(cyInput);
        } else {
            alert('Arista no encontrada.');
        }
    }
}

// Function to clear the input graph
function clearGraph() {
    cyInput.elements().remove();
    setTimeout(() => cyInput.fit(), 50);
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

function createEdgeSet(edges) {
    const set = new Set();
    edges.forEach(edge => {
        const key = `${edge.sourceLabel}-${edge.targetLabel}`;
        const reverseKey = `${edge.targetLabel}-${edge.sourceLabel}`;
        set.add(key);
        set.add(reverseKey); // Consider edges as undirected
    });
    return set;
}

// Operation: Grafo Línea
function performLineGraph() {
    const data = getGraphData(cyInput);
    
    const resultNodes = [];
    const resultEdges = [];
    let nodeCounter = 1;
    let edgeCounter = 1;
    
    // Nodes are the edges of the original graph
    data.edges.forEach(edge => {
        resultNodes.push({
            id: `line-n${nodeCounter++}`,
            label: edge.label,
            originalEdge: edge,
            graph: 'line'
        });
    });
    
    // Edges: connect nodes if their original edges share a vertex
    for (let i = 0; i < resultNodes.length; i++) {
        for (let j = i + 1; j < resultNodes.length; j++) {
            const edgeA = resultNodes[i].originalEdge;
            const edgeB = resultNodes[j].originalEdge;
            
            // Check if they share a vertex
            const verticesA = new Set([edgeA.sourceLabel, edgeA.targetLabel]);
            const verticesB = new Set([edgeB.sourceLabel, edgeB.targetLabel]);
            const intersection = new Set([...verticesA].filter(x => verticesB.has(x)));
            
            if (intersection.size > 0) {
                resultEdges.push({
                    id: `line-e${edgeCounter++}`,
                    source: resultNodes[i].id,
                    target: resultNodes[j].id,
                    label: `${edgeA.label}${edgeB.label}`,
                    edgeType: 'existing',
                    edgeColor: operationColors.existingEdge
                });
            }
        }
    }
    
    renderResult(resultNodes, resultEdges, 'Grafo Línea');
}

// Operation: Grafo Complemento
function performComplement() {
    const data = getGraphData(cyInput);
    
    const resultNodes = data.nodes.map(node => ({
        id: `comp-n${node.id}`,
        label: node.label,
        graph: 'complement'
    }));
    
    const existingEdges = createEdgeSet(data.edges);
    const resultEdges = [];
    let edgeCounter = 1;
    
    // Create edges where there are none in the original
    for (let i = 0; i < resultNodes.length; i++) {
        for (let j = i + 1; j < resultNodes.length; j++) {
            const nodeA = resultNodes[i];
            const nodeB = resultNodes[j];
            const edgeKey = `${nodeA.label}-${nodeB.label}`;
            
            if (!existingEdges.has(edgeKey)) {
                resultEdges.push({
                    id: `comp-e${edgeCounter++}`,
                    source: nodeA.id,
                    target: nodeB.id,
                    label: `${nodeA.label}${nodeB.label}`,
                    edgeType: 'new',
                    edgeColor: operationColors.newEdge
                });
            }
        }
    }
    
    renderResult(resultNodes, resultEdges, 'Grafo Complemento');
}

// Operation: Fusión de Vértices
function performVertexFusion() {
    const data = getGraphData(cyInput);
    
    const nodeList = data.nodes.map(n => n.label).join(', ');
    const label1 = prompt(`Etiqueta del primer nodo (${nodeList}):`);
    const label2 = prompt(`Etiqueta del segundo nodo (${nodeList}):`);
    
    if (label1 && label2 && label1 !== label2) {
        const node1 = data.nodes.find(n => n.label === label1);
        const node2 = data.nodes.find(n => n.label === label2);
        
        if (node1 && node2) {
            // Create new nodes, merging node1 and node2 into one
            const resultNodes = [];
            const mergedLabel = `${label1}${label2}`;
            resultNodes.push({
                id: `fusion-merged`,
                label: mergedLabel,
                graph: 'fusion'
            });
            
            // Add other nodes
            data.nodes.forEach(node => {
                if (node.label !== label1 && node.label !== label2) {
                    resultNodes.push({
                        id: `fusion-${node.id}`,
                        label: node.label,
                        graph: 'fusion'
                    });
                }
            });
            
            // Create edges: connect merged node to all neighbors of node1 and node2
            const resultEdges = [];
            let edgeCounter = 1;
            const neighbors = new Set();
            
            // Collect neighbors of node1 and node2
            data.edges.forEach(edge => {
                if (edge.sourceLabel === label1 || edge.targetLabel === label1) {
                    neighbors.add(edge.sourceLabel === label1 ? edge.targetLabel : edge.sourceLabel);
                }
                if (edge.sourceLabel === label2 || edge.targetLabel === label2) {
                    neighbors.add(edge.sourceLabel === label2 ? edge.targetLabel : edge.sourceLabel);
                }
            });
            
            // Remove self-references
            neighbors.delete(label1);
            neighbors.delete(label2);
            
            // Add edges from merged node to neighbors
            neighbors.forEach(neighborLabel => {
                const neighborNode = resultNodes.find(n => n.label === neighborLabel);
                if (neighborNode) {
                    resultEdges.push({
                        id: `fusion-e${edgeCounter++}`,
                        source: 'fusion-merged',
                        target: neighborNode.id,
                        label: `${mergedLabel}${neighborLabel}`,
                        edgeType: 'existing',
                        edgeColor: operationColors.existingEdge
                    });
                }
            });
            
            // Add edges between other nodes (preserve original edges not involving node1 or node2)
            data.edges.forEach(edge => {
                if (edge.sourceLabel !== label1 && edge.sourceLabel !== label2 &&
                    edge.targetLabel !== label1 && edge.targetLabel !== label2) {
                    const sourceNode = resultNodes.find(n => n.label === edge.sourceLabel);
                    const targetNode = resultNodes.find(n => n.label === edge.targetLabel);
                    if (sourceNode && targetNode) {
                        resultEdges.push({
                            id: `fusion-e${edgeCounter++}`,
                            source: sourceNode.id,
                            target: targetNode.id,
                            label: edge.label,
                            edgeType: 'existing',
                            edgeColor: operationColors.existingEdge
                        });
                    }
                }
            });
            
            renderResult(resultNodes, resultEdges, 'Fusión de Vértices');
        } else {
            alert('Uno o ambos nodos no existen.');
        }
    } else {
        alert('Etiquetas inválidas o iguales.');
    }
}

// Operation: Contracción de Aristas
function performEdgeContraction() {
    const data = getGraphData(cyInput);
    
    const edgeList = data.edges.map(e => e.label).join(', ');
    const edgeLabel = prompt(`Etiqueta de la arista a contraer (${edgeList}):`);
    
    if (edgeLabel) {
        const edge = data.edges.find(e => e.label === edgeLabel);
        
        if (edge) {
            const label1 = edge.sourceLabel;
            const label2 = edge.targetLabel;
            
            // Create new nodes, merging label1 and label2 into one
            const resultNodes = [];
            const mergedLabel = `${label1}${label2}`;
            resultNodes.push({
                id: `contract-merged`,
                label: mergedLabel,
                graph: 'contraction'
            });
            
            // Add other nodes
            data.nodes.forEach(node => {
                if (node.label !== label1 && node.label !== label2) {
                    resultNodes.push({
                        id: `contract-${node.id}`,
                        label: node.label,
                        graph: 'contraction'
                    });
                }
            });
            
            // Create edges: connect merged node to all neighbors of label1 and label2, except the contracted edge
            const resultEdges = [];
            let edgeCounter = 1;
            const neighbors = new Set();
            
            // Collect neighbors of label1 and label2
            data.edges.forEach(e => {
                if (e.label !== edgeLabel) {  // Exclude the contracted edge
                    if (e.sourceLabel === label1 || e.targetLabel === label1) {
                        neighbors.add(e.sourceLabel === label1 ? e.targetLabel : e.sourceLabel);
                    }
                    if (e.sourceLabel === label2 || e.targetLabel === label2) {
                        neighbors.add(e.sourceLabel === label2 ? e.targetLabel : e.sourceLabel);
                    }
                }
            });
            
            // Remove self-references
            neighbors.delete(label1);
            neighbors.delete(label2);
            
            // Add edges from merged node to neighbors
            neighbors.forEach(neighborLabel => {
                const neighborNode = resultNodes.find(n => n.label === neighborLabel);
                if (neighborNode) {
                    resultEdges.push({
                        id: `contract-e${edgeCounter++}`,
                        source: 'contract-merged',
                        target: neighborNode.id,
                        label: `${mergedLabel}${neighborLabel}`,
                        edgeType: 'existing',
                        edgeColor: operationColors.existingEdge
                    });
                }
            });
            
            // Add edges between other nodes (preserve original edges not involving label1 or label2)
            data.edges.forEach(e => {
                if (e.label !== edgeLabel &&
                    e.sourceLabel !== label1 && e.sourceLabel !== label2 &&
                    e.targetLabel !== label1 && e.targetLabel !== label2) {
                    const sourceNode = resultNodes.find(n => n.label === e.sourceLabel);
                    const targetNode = resultNodes.find(n => n.label === e.targetLabel);
                    if (sourceNode && targetNode) {
                        resultEdges.push({
                            id: `contract-e${edgeCounter++}`,
                            source: sourceNode.id,
                            target: targetNode.id,
                            label: e.label,
                            edgeType: 'existing',
                            edgeColor: operationColors.existingEdge
                        });
                    }
                }
            });
            
            renderResult(resultNodes, resultEdges, 'Contracción de Aristas');
        } else {
            alert('Arista no encontrada.');
        }
    }
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
        
        // Apply layout
        const layoutName = nodes.length > 10 ? 'cose' : 'circle';
        cyResult.layout({
            name: layoutName,
            animate: true,
            animationDuration: 800,
            fit: true,
            padding: 40,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            spacingFactor: 1.5
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
        case 'line':
            performLineGraph();
            break;
        case 'complement':
            performComplement();
            break;
        case 'vertexFusion':
            performVertexFusion();
            break;
        case 'edgeContraction':
            performEdgeContraction();
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