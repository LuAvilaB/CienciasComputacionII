let cy;
let isDirected = false;
let currentView = 'adj-matrix'; // Default view

document.addEventListener('DOMContentLoaded', function () {
    initCy();
    // Add example graph
    addExampleGraph();
    showView('adj-matrix'); // Show default
});

function initCy() {
    cy = cytoscape({
        container: document.getElementById('cy'),
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(label)',
                    'color': '#fff',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'width': '40px',
                    'height': '40px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'curve-style': 'bezier',
                    'label': 'data(weight)',
                    'color': '#fff',
                    'text-background-opacity': 1,
                    'text-background-color': '#000',
                    'text-background-padding': '3px'
                }
            },
            {
                selector: '.directed',
                style: {
                    'target-arrow-shape': 'triangle'
                }
            },
            {
                selector: '.highlighted',
                style: {
                    'line-color': '#f00',
                    'target-arrow-color': '#f00',
                    'width': 4
                }
            }
        ],
        layout: {
            name: 'grid',
            rows: 1
        }
    });
}

function addExampleGraph() {
    cy.add([
        { group: 'nodes', data: { id: 'A', label: 'A' } },
        { group: 'nodes', data: { id: 'B', label: 'B' } },
        { group: 'nodes', data: { id: 'C', label: 'C' } },
        { group: 'edges', data: { id: 'AB', source: 'A', target: 'B', weight: 1 } },
        { group: 'edges', data: { id: 'BC', source: 'B', target: 'C', weight: 2 } },
        { group: 'edges', data: { id: 'CA', source: 'C', target: 'A', weight: 3 } } // Added to make a circuit
    ]);
    cy.layout({ name: 'circle' }).run();
    updateRepresentations();
}

function toggleDirected() {
    const checkbox = document.getElementById('chk-directed');
    isDirected = checkbox.checked;
    
    if (isDirected) {
        cy.edges().addClass('directed');
    } else {
        cy.edges().removeClass('directed');
    }
    
    updateRepresentations();
}

function showView(viewName) {
    currentView = viewName;
    
    // Hide all views
    const views = document.querySelectorAll('.view-panel');
    views.forEach(v => v.style.display = 'none');
    
    // Show selected view
    const selectedView = document.getElementById(`view-${viewName}`);
    if (selectedView) {
        selectedView.style.display = 'block';
    }
    
    // Update content if needed (though usually updated on graph change)
    updateRepresentations();
}

function addNode() {
    const label = prompt("Ingrese la etiqueta del vértice (ej: D):");
    if (!label) return;
    
    if (cy.getElementById(label).length > 0) {
        alert("El vértice ya existe.");
        return;
    }
    
    cy.add({
        group: 'nodes',
        data: { id: label, label: label }
    });
    
    cy.layout({ name: 'circle' }).run();
    updateRepresentations();
}

function addEdge() {
    const source = prompt("Ingrese el vértice origen:");
    if (!source) return;
    if (cy.getElementById(source).length === 0) {
        alert("El vértice origen no existe.");
        return;
    }

    const target = prompt("Ingrese el vértice destino:");
    if (!target) return;
    if (cy.getElementById(target).length === 0) {
        alert("El vértice destino no existe.");
        return;
    }

    let weight = prompt("Ingrese el peso de la arista (opcional, por defecto 1):");
    if (weight === null) return;
    if (weight.trim() === "") weight = 1;
    else weight = parseFloat(weight);
    
    if (isNaN(weight)) {
        alert("El peso debe ser un número.");
        return;
    }

    const edgeId = `${source}-${target}`;
    
    let exists = false;
    if (isDirected) {
        if (cy.edges(`[source="${source}"][target="${target}"]`).length > 0) exists = true;
    } else {
        if (cy.edges(`[source="${source}"][target="${target}"]`).length > 0 || 
            cy.edges(`[source="${target}"][target="${source}"]`).length > 0) exists = true;
    }

    if (exists) {
        alert("La arista ya existe.");
        return;
    }

    cy.add({
        group: 'edges',
        data: { 
            id: edgeId, 
            source: source, 
            target: target, 
            weight: weight 
        }
    });
    
    if (isDirected) {
        cy.getElementById(edgeId).addClass('directed');
    }

    updateRepresentations();
}

function deleteNode() {
    const label = prompt("Ingrese la etiqueta del vértice a eliminar:");
    if (!label) return;
    
    const node = cy.getElementById(label);
    if (node.length === 0) {
        alert("El vértice no existe.");
        return;
    }
    
    cy.remove(node);
    updateRepresentations();
}

function deleteEdge() {
    const source = prompt("Ingrese el vértice origen de la arista:");
    if (!source) return;
    
    const target = prompt("Ingrese el vértice destino de la arista:");
    if (!target) return;
    
    let edgesToRemove;
    if (isDirected) {
        edgesToRemove = cy.edges(`[source="${source}"][target="${target}"]`);
    } else {
        edgesToRemove = cy.edges(`[source="${source}"][target="${target}"]`).union(
            cy.edges(`[source="${target}"][target="${source}"]`)
        );
    }
    
    if (edgesToRemove.length === 0) {
        alert("La arista no existe.");
        return;
    }
    
    cy.remove(edgesToRemove);
    updateRepresentations();
}

function clearGraph() {
    if (confirm("¿Está seguro de que desea eliminar todo el grafo?")) {
        cy.elements().remove();
        updateRepresentations();
    }
}

function updateRepresentations() {
    const nodes = cy.nodes().map(n => n.data('label')).sort();
    const edges = cy.edges();
    
    // Only update the visible view or all? 
    // It's better to update all so switching is instant.
    
    updateAdjacencyMatrix(nodes, edges);
    updateAdjacencyList(nodes, edges);
    updateIncidenceMatrix(nodes, edges);
    updateEdgeAdjacencyMatrix(edges);
    updateCircuitMatrix(nodes, edges);
}

function updateAdjacencyMatrix(nodes, edges) {
    const container = document.getElementById('matrix-adj-container');
    if (nodes.length === 0) {
        container.innerHTML = "Grafo vacío";
        return;
    }

    const matrix = {};
    nodes.forEach(n1 => {
        matrix[n1] = {};
        nodes.forEach(n2 => {
            matrix[n1][n2] = 0;
        });
    });

    edges.forEach(edge => {
        const s = edge.data('source');
        const t = edge.data('target');
        const w = parseFloat(edge.data('weight'));
        
        if (matrix[s] && matrix[s][t] !== undefined) matrix[s][t] = w;
        
        if (!isDirected) {
            if (matrix[t] && matrix[t][s] !== undefined) matrix[t][s] = w;
        }
    });

    let html = '<table><thead><tr><th></th>';
    nodes.forEach(n => html += `<th>${n}</th>`);
    html += '</tr></thead><tbody>';

    nodes.forEach(n1 => {
        html += `<tr><th>${n1}</th>`;
        nodes.forEach(n2 => {
            html += `<td>${matrix[n1][n2]}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';

    container.innerHTML = html;
}

function updateAdjacencyList(nodes, edges) {
    const container = document.getElementById('list-adj-container');
    if (nodes.length === 0) {
        container.innerHTML = "Grafo vacío";
        return;
    }

    const list = {};
    nodes.forEach(n => list[n] = []);

    edges.forEach(edge => {
        const s = edge.data('source');
        const t = edge.data('target');
        const w = parseFloat(edge.data('weight'));

        list[s].push({ node: t, weight: w });
        if (!isDirected) {
            list[t].push({ node: s, weight: w });
        }
    });

    nodes.forEach(n => {
        list[n].sort((a, b) => a.node.localeCompare(b.node));
    });

    let html = '<table><thead><tr><th>Vértice</th><th>Adyacentes (Nodo, Peso)</th></tr></thead><tbody>';
    nodes.forEach(n => {
        html += `<tr><th>${n}</th><td>`;
        if (list[n].length === 0) {
            html += '∅';
        } else {
            html += list[n].map(item => `(${item.node}, ${item.weight})`).join(', ');
        }
        html += '</td></tr>';
    });
    html += '</tbody></table>';

    container.innerHTML = html;
}

function updateIncidenceMatrix(nodes, edges) {
    const container = document.getElementById('matrix-inc-container');
    const edgeList = edges.toArray();
    
    if (nodes.length === 0) {
        container.innerHTML = "Grafo vacío";
        return;
    }
    if (edgeList.length === 0) {
        container.innerHTML = "Sin aristas";
        return;
    }

    let html = '<table><thead><tr><th></th>';
    edgeList.forEach((e, index) => {
        const s = e.data('source');
        const t = e.data('target');
        html += `<th>e${index+1} (${s}-${t})</th>`;
    });
    html += '</tr></thead><tbody>';

    nodes.forEach(n => {
        html += `<tr><th>${n}</th>`;
        edgeList.forEach(e => {
            const s = e.data('source');
            const t = e.data('target');
            let val = 0;

            if (isDirected) {
                if (s === n && t === n) {
                    if (s === n) val += 1;
                    if (t === n) val -= 1;
                } else {
                    if (s === n) val = 1;
                    else if (t === n) val = -1;
                }
            } else {
                if (s === n && t === n) {
                    val = 2;
                } else if (s === n || t === n) {
                    val = 1;
                }
            }
            html += `<td>${val}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';

    container.innerHTML = html;
}

function updateEdgeAdjacencyMatrix(edges) {
    const container = document.getElementById('matrix-edge-adj-container');
    const edgeList = edges.toArray();

    if (edgeList.length === 0) {
        container.innerHTML = "Sin aristas";
        return;
    }

    // Two edges are adjacent if they share a common vertex.
    // In directed graphs: e1=(u,v) is adjacent to e2=(v,w) (head of e1 = tail of e2).
    // In undirected graphs: e1=(u,v) is adjacent to e2=(v,w) or e2=(w,v) or e2=(u,w)... just share any node.

    let html = '<table><thead><tr><th></th>';
    edgeList.forEach((e, i) => html += `<th>e${i+1}</th>`);
    html += '</tr></thead><tbody>';

    edgeList.forEach((e1, i) => {
        html += `<tr><th>e${i+1}</th>`;
        edgeList.forEach((e2, j) => {
            let val = 0;
            const s1 = e1.data('source');
            const t1 = e1.data('target');
            const s2 = e2.data('source');
            const t2 = e2.data('target');

            if (isDirected) {
                 // Definition of adjacency in directed line graph:
                 // e1 -> e2 if target(e1) == source(e2)
                 if (t1 === s2) val = 1;
            } else {
                // Undirected: share any node
                if (i !== j) { // Usually not adjacent to self unless loop? Let's say distinct edges.
                    if (s1 === s2 || s1 === t2 || t1 === s2 || t1 === t2) {
                        val = 1;
                    }
                }
            }
            html += `<td>${val}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';

    container.innerHTML = html;
}

function updateCircuitMatrix(nodes, edges) {
    const matrixContainer = document.getElementById('matrix-circuit-container');
    const visualContainer = document.getElementById('circuits-visual-container');
    
    // Find all elementary circuits
    const circuits = findAllCircuits(nodes, edges);
    
    if (circuits.length === 0) {
        matrixContainer.innerHTML = "No hay circuitos";
        visualContainer.innerHTML = "";
        return;
    }

    const edgeList = edges.toArray();
    
    // Build Matrix
    let html = '<table><thead><tr><th></th>';
    edgeList.forEach((e, i) => {
        const s = e.data('source');
        const t = e.data('target');
        html += `<th>e${i+1} (${s}-${t})</th>`;
    });
    html += '</tr></thead><tbody>';

    circuits.forEach((circuit, i) => {
        html += `<tr><th>C${i+1}</th>`;
        edgeList.forEach(edge => {
            // Check if edge is in circuit
            // Circuit is list of nodes [A, B, C, A]
            // We need to check if edge (u,v) connects two consecutive nodes in circuit
            let inCircuit = false;
            for (let k = 0; k < circuit.length - 1; k++) {
                const u = circuit[k];
                const v = circuit[k+1];
                const s = edge.data('source');
                const t = edge.data('target');
                
                if (isDirected) {
                    if (s === u && t === v) inCircuit = true;
                } else {
                    if ((s === u && t === v) || (s === v && t === u)) inCircuit = true;
                }
            }
            html += `<td>${inCircuit ? 1 : 0}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';
    matrixContainer.innerHTML = html;

    // Build Visualizations
    visualContainer.innerHTML = "";
    circuits.forEach((circuit, i) => {
        const div = document.createElement('div');
        div.style.width = '200px';
        div.style.height = '200px';
        div.style.border = '1px solid #ccc';
        div.style.position = 'relative';
        visualContainer.appendChild(div);

        const subCy = cytoscape({
            container: div,
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'width': '20px',
                        'height': '20px',
                        'font-size': '10px'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#f00',
                        'target-arrow-color': '#f00',
                        'target-arrow-shape': isDirected ? 'triangle' : 'none'
                    }
                }
            ],
            layout: { name: 'circle' }
        });

        // Add nodes and edges for this circuit
        for (let k = 0; k < circuit.length - 1; k++) {
            const u = circuit[k];
            const v = circuit[k+1];
            
            if (subCy.getElementById(u).length === 0) subCy.add({ group: 'nodes', data: { id: u, label: u } });
            if (subCy.getElementById(v).length === 0) subCy.add({ group: 'nodes', data: { id: v, label: v } });
            
            subCy.add({ group: 'edges', data: { source: u, target: v } });
        }
        subCy.layout({ name: 'circle' }).run();
    });
}

function findAllCircuits(nodes, edges) {
    // Basic DFS to find all elementary cycles
    // This is a complex problem (NP-hard in general to find ALL), but for small graphs in sim it's fine.
    // Using Johnson's algorithm or a simplified DFS with backtracking.
    
    const adj = {};
    nodes.forEach(n => adj[n] = []);
    
    edges.forEach(edge => {
        const s = edge.data('source');
        const t = edge.data('target');
        adj[s].push(t);
        if (!isDirected) adj[t].push(s);
    });

    const circuits = [];
    const visited = new Set();
    const path = [];

    function dfs(u, startNode, currentPath) {
        currentPath.push(u);
        visited.add(u);

        const neighbors = adj[u] || [];
        for (const v of neighbors) {
            if (v === startNode && currentPath.length > 2) {
                // Found a cycle
                // For undirected, we need to avoid trivial cycles A-B-A
                if (!isDirected) {
                    // Check if we just came from v
                    const prev = currentPath[currentPath.length - 2];
                    if (v !== prev) {
                         // Also check if this cycle is already found (reverse or rotated)
                         // Normalize cycle: start with smallest node, direction?
                         // For simplicity, let's just add and filter duplicates later if needed.
                         // Actually, standard DFS finds duplicates in undirected.
                         // Let's use a simpler approach for undirected:
                         // Only consider edges (u,v) where u < v for uniqueness? No.
                         
                         // Let's just store it.
                         circuits.push([...currentPath, v]);
                    }
                } else {
                    circuits.push([...currentPath, v]);
                }
            } else if (!visited.has(v)) {
                dfs(v, startNode, currentPath);
            }
        }

        currentPath.pop();
        visited.delete(u);
    }

    // Run DFS from each node
    nodes.forEach(n => {
        dfs(n, n, []);
        // After finishing with n as start node, we can remove it from future searches to avoid duplicates?
        // In Johnson's algo yes. Here, let's just do naive and unique-ify.
    });

    // Unique-ify circuits
    const uniqueCircuits = [];
    const signatures = new Set();

    circuits.forEach(c => {
        // Normalize: 
        // 1. Remove last node (it's same as first)
        const cycle = c.slice(0, c.length - 1);
        
        // 2. Find min element index
        let minIdx = 0;
        for(let i=1; i<cycle.length; i++) if(cycle[i] < cycle[minIdx]) minIdx = i;
        
        // 3. Rotate so min is first
        let rotated = [...cycle.slice(minIdx), ...cycle.slice(0, minIdx)];
        
        // 4. For undirected, also consider reverse
        if (!isDirected) {
            // Check if reverse is "smaller" lexicographically?
            // Or just store canonical form.
            // Let's try to match existing signatures.
            // Actually, let's just store string rep.
        }
        
        const sig = rotated.join('-');
        if (!signatures.has(sig)) {
            // Also check reverse for undirected
            let isDuplicate = false;
            if (!isDirected) {
                const reversed = [...rotated].reverse();
                // Rotate reverse to start with min (which is now at end)
                // Wait, if we reverse, min is at end. 
                // Let's just say: canonical is min-first.
                // Reverse of A-B-C is C-B-A. Min is A. So A-C-B.
                
                // Let's re-normalize the reversed version
                let minIdxRev = 0;
                for(let i=1; i<reversed.length; i++) if(reversed[i] < reversed[minIdxRev]) minIdxRev = i;
                const rotatedRev = [...reversed.slice(minIdxRev), ...reversed.slice(0, minIdxRev)];
                const sigRev = rotatedRev.join('-');
                
                if (signatures.has(sigRev)) isDuplicate = true;
            }

            if (!isDuplicate) {
                signatures.add(sig);
                uniqueCircuits.push(c);
            }
        }
    });

    return uniqueCircuits;
}
