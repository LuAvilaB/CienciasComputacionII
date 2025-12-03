/**
 * Módulo para Guardar y Recuperar el Estado de Simulaciones
 * Proporciona funcionalidad reutilizable para todas las simulaciones
 */

// ==================== CAPTURA DE ESTADO ====================

/**
 * Captura el estado actual de una simulación de búsqueda
 * @returns {Object} Estado de la simulación
 */
function captureSearchState() {
    const state = {
        type: 'search',
        timestamp: new Date().toISOString(),
        data: {}
    };

    // Capturar tamaño de estructura
    const sizeInput = document.getElementById('i-n');
    if (sizeInput) state.data.structureSize = sizeInput.value;

    // Capturar tamaño de clave
    const keySizeInput = document.getElementById('i-tam-clave');
    if (keySizeInput) state.data.keySize = keySizeInput.value;

    // Capturar tipo de memoria (si existe)
    const memTypeInput = document.getElementById('mem-opt');
    if (memTypeInput) state.data.memoryType = memTypeInput.value;

    // Capturar método de búsqueda (si existe)
    const searchOptInput = document.getElementById('busq-opt');
    if (searchOptInput) state.data.searchMethod = searchOptInput.value;

    // Capturar método de colisión (para hash)
    const collisionMethod = document.getElementById('collision-method');
    if (collisionMethod) state.data.collisionMethod = collisionMethod.value;

    // Capturar función hash (si existe)
    const hashOptInput = document.getElementById('hash-opt');
    if (hashOptInput) state.data.hashFunction = hashOptInput.value;

    // Capturar el array/estructura actual
    // Intentar obtener la estructura de varias fuentes posibles
    let currentStructure = null;
    if (typeof window.estructura !== 'undefined' && window.estructura !== null) {
        currentStructure = window.estructura;
    } else if (typeof arr !== 'undefined' && arr !== null) {
        currentStructure = arr;
    }

    if (currentStructure) {
        // Convertir el array preservando undefined y null
        const arrayData = [];
        const sourceArray = currentStructure.array || [];
        
        // Copiar todos los elementos, preservando null y undefined como null
        for (let i = 0; i < currentStructure.tam; i++) {
            if (i < sourceArray.length) {
                arrayData[i] = sourceArray[i] === undefined ? null : sourceArray[i];
            } else {
                arrayData[i] = null;
            }
        }
        
        state.data.array = arrayData;
        state.data.arraySize = currentStructure.tam;
        state.data.blockSize = currentStructure.tamBloq || null;
        state.data.collisionMethodInArray = currentStructure.collisionMethod || null;
        
        console.log('Estado capturado - Array length:', arrayData.length, 'Datos:', arrayData);
    }

    return state;
}

/**
 * Captura el estado actual de una simulación de grafos (usando Cytoscape)
 * @param {Object} cyInstance - Instancia de Cytoscape
 * @returns {Object} Estado de la simulación
 */
function captureGraphState(cyInstance) {
    const state = {
        type: 'graph',
        timestamp: new Date().toISOString(),
        data: {}
    };

    if (!cyInstance) {
        console.warn('No se proporcionó instancia de Cytoscape');
        return state;
    }

    // Capturar nodos
    state.data.nodes = cyInstance.nodes().map(node => ({
        id: node.id(),
        label: node.data('label'),
        position: node.position()
    }));

    // Capturar aristas
    state.data.edges = cyInstance.edges().map(edge => ({
        id: edge.id(),
        source: edge.data('source'),
        target: edge.data('target'),
        weight: edge.data('weight') || 1
    }));

    // Capturar estado de dirigido/no dirigido
    const directedCheckbox = document.getElementById('chk-directed');
    if (directedCheckbox) {
        state.data.isDirected = directedCheckbox.checked;
    }

    return state;
}

/**
 * Captura el estado actual de la simulación Floyd-Warshall
 * @param {Object} cyInstance - Instancia de Cytoscape
 * @returns {Object} Estado de la simulación
 */
function captureFloydState(cyInstance) {
    const state = captureGraphState(cyInstance);
    state.type = 'floyd';

    // Capturar matrices de Floyd si existen (como variables globales)
    if (typeof distanceMatrix !== 'undefined') {
        state.data.distanceMatrix = distanceMatrix;
    }
    if (typeof intermediateMatrices !== 'undefined') {
        state.data.intermediateMatrices = intermediateMatrices;
    }

    return state;
}

// ==================== GUARDAR ARCHIVO ====================

/**
 * Guarda el estado en un archivo JSON y lo descarga
 * @param {Object} state - Estado a guardar
 * @param {string} simulationType - Tipo de simulación
 * @param {string} filename - Nombre del archivo (opcional)
 */
function saveToFile(state, simulationType, filename = null) {
    // Generar nombre de archivo si no se proporciona
    if (!filename) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        filename = `${simulationType}_${timestamp}.json`;
    }

    // Convertir estado a JSON
    const jsonString = JSON.stringify(state, null, 2);
    
    // Crear blob
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Crear enlace de descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    
    // Disparar descarga
    document.body.appendChild(link);
    link.click();
    
    // Limpiar
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    console.log('Archivo guardado:', filename);
}

// ==================== CARGAR ARCHIVO ====================

/**
 * Carga un archivo JSON y ejecuta callback con los datos
 * @param {Function} callback - Función a ejecutar con los datos cargados
 */
function loadFromFile(callback) {
    // Crear input file temporal
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // Validar formato básico
                if (!data.type || !data.data) {
                    alert('Formato de archivo inválido');
                    return;
                }
                
                console.log('Archivo cargado:', data);
                callback(data);
            } catch (error) {
                console.error('Error al cargar archivo:', error);
                alert('Error al cargar el archivo. Asegúrese de que sea un archivo JSON válido.');
            }
        };
        
        reader.readAsText(file);
    };
    
    // Disparar selector de archivo
    input.click();
}

// ==================== RESTAURAR ESTADO ====================

/**
 * Restaura el estado de una simulación de búsqueda
 * @param {Object} state - Estado guardado
 */
function restoreSearchState(state) {
    if (state.type !== 'search' && state.type !== 'floyd') {
        alert('El archivo no corresponde a una simulación de búsqueda');
        return;
    }

    const data = state.data;

    // Restaurar campos de entrada
    const sizeInput = document.getElementById('i-n');
    if (sizeInput && data.structureSize) sizeInput.value = data.structureSize;

    const keySizeInput = document.getElementById('i-tam-clave');
    if (keySizeInput && data.keySize) keySizeInput.value = data.keySize;

    const memTypeInput = document.getElementById('mem-opt');
    if (memTypeInput && data.memoryType) memTypeInput.value = data.memoryType;

    const searchOptInput = document.getElementById('busq-opt');
    if (searchOptInput && data.searchMethod) searchOptInput.value = data.searchMethod;

    const collisionMethod = document.getElementById('collision-method');
    if (collisionMethod && data.collisionMethod) collisionMethod.value = data.collisionMethod;

    const hashOptInput = document.getElementById('hash-opt');
    if (hashOptInput && data.hashFunction) hashOptInput.value = data.hashFunction;

    // Restaurar estructura/array
    if (data.array && data.arraySize) {
        // Crear nueva instancia de Estructura
        const isExternal = data.blockSize !== null && data.blockSize !== false;
        
        // Convertir null de vuelta a undefined si es necesario preservar ese estado
        const restoredArray = data.array.map(val => val);
        
        // Determinar qué constructor usar (Estructura o HashTableWithFunctions)
        let newStructure;
        
        // Si estamos en hash doble (detectado por funciones específicas o contexto)
        if (typeof HashTableWithFunctions !== 'undefined') {
             // Recuperar parámetros específicos de hash doble si existen
             const maxLoad = data.maxLoad || 0.7;
             const minLoad = data.minLoad || 0.25;
             const autoReduce = data.autoReduce || false;
             const hashFunc = data.hashFunction || 1;
             
             newStructure = new HashTableWithFunctions(data.arraySize, hashFunc, maxLoad, minLoad, autoReduce);
             newStructure.array = restoredArray;
             // Recalcular items count
             newStructure.itemCount = restoredArray.filter(x => x !== null && x !== undefined).length;
        } else {
             // Estructura estándar
             newStructure = new Estructura(data.arraySize, isExternal, restoredArray);
        }
        
        if (data.collisionMethodInArray) {
            newStructure.collisionMethod = data.collisionMethodInArray;
        }

        // Asignar a la variable global y actualizar local mediante setter
        if (typeof window.setEstructura === 'function') {
            window.setEstructura(newStructure);
        } else {
            window.estructura = newStructure;
            // Fallback para legacy
            if (typeof arr !== 'undefined') arr = newStructure;
        }

        console.log('Estado restaurado - Array length:', newStructure.array.length, 'Datos:', newStructure.array);

        // Renderizar la estructura
        if (typeof window.dibujarArreglo === 'function') {
            window.dibujarArreglo();
        } else if (typeof dibujarArreglo === 'function') {
            dibujarArreglo();
        }
        
        // Actualizar métricas si existen (hash doble)
        if (typeof actualizarMetricas === 'function') { // Si es global
             actualizarMetricas();
        }
    }

    alert('Simulación recuperada exitosamente');
}

/**
 * Restaura el estado de una simulación de grafos
 * @param {Object} state - Estado guardado
 * @param {Object} cyInstance - Instancia de Cytoscape
 */
function restoreGraphState(state, cyInstance) {
    if (state.type !== 'graph' && state.type !== 'floyd') {
        alert('El archivo no corresponde a una simulación de grafos');
        return;
    }

    if (!cyInstance) {
        alert('Error: No se encontró la instancia del grafo');
        return;
    }

    const data = state.data;

    // Limpiar grafo actual
    cyInstance.elements().remove();

    // Restaurar nodos
    if (data.nodes) {
        data.nodes.forEach(node => {
            cyInstance.add({
                group: 'nodes',
                data: { id: node.id, label: node.label },
                position: node.position
            });
        });
    }

    // Restaurar aristas
    if (data.edges) {
        data.edges.forEach(edge => {
            cyInstance.add({
                group: 'edges',
                data: {
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    weight: edge.weight
                }
            });
        });
    }

    // Restaurar estado dirigido/no dirigido
    const directedCheckbox = document.getElementById('chk-directed');
    if (directedCheckbox && typeof data.isDirected !== 'undefined') {
        directedCheckbox.checked = data.isDirected;
        
        // Aplicar clase CSS si es dirigido
        if (data.isDirected) {
            cyInstance.edges().addClass('directed');
        }
        
        // Actualizar representaciones si la función existe
        if (typeof updateRepresentations === 'function') {
            updateRepresentations();
        }
        
        // Actualizar variable global si existe
        if (typeof isDirected !== 'undefined') {
            isDirected = data.isDirected;
        }
    }

    alert('Simulación recuperada exitosamente');
}

/**
 * Restaura el estado de la simulación Floyd
 * @param {Object} state - Estado guardado
 * @param {Object} cyInstance - Instancia de Cytoscape
 */
function restoreFloydState(state, cyInstance) {
    if (state.type !== 'floyd') {
        alert('El archivo no corresponde a una simulación Floyd');
        return;
    }

    // Restaurar el grafo base
    restoreGraphState(state, cyInstance);

    // Restaurar matrices si existen
    const data = state.data;
    if (data.distanceMatrix && typeof distanceMatrix !== 'undefined') {
        distanceMatrix = data.distanceMatrix;
    }
    if (data.intermediateMatrices && typeof intermediateMatrices !== 'undefined') {
        intermediateMatrices = data.intermediateMatrices;
    }
}

// ==================== LIMPIAR SIMULACIÓN ====================

/**
 * Limpia/resetea una simulación según su tipo
 * @param {string} type - Tipo de simulación ('search', 'graph', 'floyd')
 */
function clearSimulation(type) {
    if (type === 'search') {
        // Limpiar campos de entrada
        const sizeInput = document.getElementById('i-n');
        if (sizeInput) sizeInput.value = '';

        const keySizeInput = document.getElementById('i-tam-clave');
        if (keySizeInput) keySizeInput.value = '';

        const collisionMethod = document.getElementById('collision-method');
        if (collisionMethod) collisionMethod.value = '';

        // Limpiar estructura
        if (typeof window.setEstructura === 'function') {
            window.setEstructura(null);
        } else {
            window.estructura = null;
            if (typeof arr !== 'undefined') arr = null;
        }

        // Limpiar visualización
        const tablaArr = document.getElementById('tabla-arr');
        if (tablaArr) {
            tablaArr.innerHTML = '<h3>Por favor inicialice la estructura</h3>';
        }

        // Limpiar avisos
        const avisos = document.getElementById('avisos');
        if (avisos) avisos.innerHTML = '';
        
        // Limpiar métricas si existen
        const metricsDiv = document.getElementById('metrics');
        if (metricsDiv) {
             metricsDiv.innerHTML = '<p style="color: #666;">Inicialice la estructura para ver las métricas</p>';
        }

    } else if (type === 'graph' || type === 'floyd') {
        // Limpiar grafo
        if (typeof cy !== 'undefined' && cy) {
            cy.elements().remove();
        }

        // Desmarcar checkbox dirigido
        const directedCheckbox = document.getElementById('chk-directed');
        if (directedCheckbox) directedCheckbox.checked = false;

        // Actualizar representaciones si existe
        if (typeof updateRepresentations === 'function') {
            updateRepresentations();
        }

        // Limpiar resultados (para Floyd)
        const floydResult = document.getElementById('floyd-result');
        if (floydResult) floydResult.innerHTML = '';

        // Limpiar variables globales si existen
        if (typeof distanceMatrix !== 'undefined') distanceMatrix = null;
        if (typeof intermediateMatrices !== 'undefined') intermediateMatrices = [];
    }

    console.log('Simulación limpiada:', type);
}
