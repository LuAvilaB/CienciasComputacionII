// Clases para los diferentes tipos de árboles
class Nodo {
    constructor(valor, letra) {
        this.valor = valor;
        this.letra = letra;
        this.izquierdo = null;
        this.derecho = null;
        this.altura = 1;
    }
}

class ArbolBST {
    constructor() {
        this.raiz = null;
    }

    limpiar() {
        this.raiz = null;
    }

    insertar(valor, letra) {
        this.raiz = this._insertar(this.raiz, valor, letra);
    }

    _insertar(nodo, valor, letra) {
        if (nodo === null) {
            return new Nodo(valor, letra);
        }

        if (valor < nodo.valor) {
            nodo.izquierdo = this._insertar(nodo.izquierdo, valor, letra);
        } else if (valor > nodo.valor) {
            nodo.derecho = this._insertar(nodo.derecho, valor, letra);
        }

        return nodo;
    }

    eliminar(valor) {
        this.raiz = this._eliminar(this.raiz, valor);
    }

    _eliminar(nodo, valor) {
        if (nodo === null) return nodo;

        if (valor < nodo.valor) {
            nodo.izquierdo = this._eliminar(nodo.izquierdo, valor);
        } else if (valor > nodo.valor) {
            nodo.derecho = this._eliminar(nodo.derecho, valor);
        } else {
            if (nodo.izquierdo === null) {
                return nodo.derecho;
            } else if (nodo.derecho === null) {
                return nodo.izquierdo;
            }

            nodo.valor = this._minValor(nodo.derecho);
            nodo.letra = this._obtenerLetraPorValor(nodo.derecho, nodo.valor);
            nodo.derecho = this._eliminar(nodo.derecho, nodo.valor);
        }

        return nodo;
    }

    _minValor(nodo) {
        let minv = nodo.valor;
        while (nodo.izquierdo !== null) {
            minv = nodo.izquierdo.valor;
            nodo = nodo.izquierdo;
        }
        return minv;
    }

    _obtenerLetraPorValor(nodo, valor) {
        if (nodo === null) return null;
        if (nodo.valor === valor) return nodo.letra;

        if (valor < nodo.valor) {
            return this._obtenerLetraPorValor(nodo.izquierdo, valor);
        } else {
            return this._obtenerLetraPorValor(nodo.derecho, valor);
        }
    }

    buscar(valor) {
        return this._buscar(this.raiz, valor);
    }

    _buscar(nodo, valor) {
        if (nodo === null) return false;
        if (nodo.valor === valor) return true;

        if (valor < nodo.valor) {
            return this._buscar(nodo.izquierdo, valor);
        } else {
            return this._buscar(nodo.derecho, valor);
        }
    }

    obtenerNodoPorValor(valor) {
        return this._obtenerNodoPorValor(this.raiz, valor);
    }

    _obtenerNodoPorValor(nodo, valor) {
        if (nodo === null) return null;
        if (nodo.valor === valor) return nodo;

        if (valor < nodo.valor) {
            return this._obtenerNodoPorValor(nodo.izquierdo, valor);
        } else {
            return this._obtenerNodoPorValor(nodo.derecho, valor);
        }
    }

    preorden() {
        const resultado = [];
        this._preorden(this.raiz, resultado);
        return resultado;
    }

    _preorden(nodo, resultado) {
        if (nodo !== null) {
            resultado.push(nodo.letra);
            this._preorden(nodo.izquierdo, resultado);
            this._preorden(nodo.derecho, resultado);
        }
    }

    inorden() {
        const resultado = [];
        this._inorden(this.raiz, resultado);
        return resultado;
    }

    _inorden(nodo, resultado) {
        if (nodo !== null) {
            this._inorden(nodo.izquierdo, resultado);
            resultado.push(nodo.letra);
            this._inorden(nodo.derecho, resultado);
        }
    }

    postorden() {
        const resultado = [];
        this._postorden(this.raiz, resultado);
        return resultado;
    }

    _postorden(nodo, resultado) {
        if (nodo !== null) {
            this._postorden(nodo.izquierdo, resultado);
            this._postorden(nodo.derecho, resultado);
            resultado.push(nodo.letra);
        }
    }

    altura() {
        return this._altura(this.raiz);
    }

    _altura(nodo) {
        if (nodo === null) return 0;
        return Math.max(this._altura(nodo.izquierdo), this._altura(nodo.derecho)) + 1;
    }

    contarNodos() {
        return this._contarNodos(this.raiz);
    }

    _contarNodos(nodo) {
        if (nodo === null) return 0;
        return 1 + this._contarNodos(nodo.izquierdo) + this._contarNodos(nodo.derecho);
    }
}

// Implementación básica de árbol AVL (simplificada para este ejemplo)
class ArbolAVL extends ArbolBST {
    _insertar(nodo, valor, letra) {
        if (nodo === null) {
            return new Nodo(valor, letra);
        }

        if (valor < nodo.valor) {
            nodo.izquierdo = this._insertar(nodo.izquierdo, valor, letra);
        } else if (valor > nodo.valor) {
            nodo.derecho = this._insertar(nodo.derecho, valor, letra);
        } else {
            return nodo; // No se permiten duplicados
        }

        // Actualizar altura
        nodo.altura = 1 + Math.max(this._obtenerAltura(nodo.izquierdo), this._obtenerAltura(nodo.derecho));

        // Obtener factor de equilibrio
        const equilibrio = this._obtenerEquilibrio(nodo);

        // Casos de desequilibrio
        // Izquierda Izquierda
        if (equilibrio > 1 && valor < nodo.izquierdo.valor) {
            return this._rotarDerecha(nodo);
        }

        // Derecha Derecha
        if (equilibrio < -1 && valor > nodo.derecho.valor) {
            return this._rotarIzquierda(nodo);
        }

        // Izquierda Derecha
        if (equilibrio > 1 && valor > nodo.izquierdo.valor) {
            nodo.izquierdo = this._rotarIzquierda(nodo.izquierdo);
            return this._rotarDerecha(nodo);
        }

        // Derecha Izquierda
        if (equilibrio < -1 && valor < nodo.derecho.valor) {
            nodo.derecho = this._rotarDerecha(nodo.derecho);
            return this._rotarIzquierda(nodo);
        }

        return nodo;
    }

    _obtenerAltura(nodo) {
        if (nodo === null) return 0;
        return nodo.altura;
    }

    _obtenerEquilibrio(nodo) {
        if (nodo === null) return 0;
        return this._obtenerAltura(nodo.izquierdo) - this._obtenerAltura(nodo.derecho);
    }

    _rotarDerecha(y) {
        const x = y.izquierdo;
        const T2 = x.derecho;

        // Realizar rotación
        x.derecho = y;
        y.izquierdo = T2;

        // Actualizar alturas
        y.altura = Math.max(this._obtenerAltura(y.izquierdo), this._obtenerAltura(y.derecho)) + 1;
        x.altura = Math.max(this._obtenerAltura(x.izquierdo), this._obtenerAltura(x.derecho)) + 1;

        return x;
    }

    _rotarIzquierda(x) {
        const y = x.derecho;
        const T2 = y.izquierdo;

        // Realizar rotación
        y.izquierdo = x;
        x.derecho = T2;

        // Actualizar alturas
        x.altura = Math.max(this._obtenerAltura(x.izquierdo), this._obtenerAltura(x.derecho)) + 1;
        y.altura = Math.max(this._obtenerAltura(y.izquierdo), this._obtenerAltura(y.derecho)) + 1;

        return y;
    }
}

// Funciones de utilidad para convertir letras a binario
function letraABinario(letra) {
    if (!letra || letra.length === 0) return null;

    // Tomar solo el primer carácter
    const caracter = letra.charAt(0);

    // Verificar que sea una letra
    if (!/^[A-Za-z]$/.test(caracter)) {
        return null;
    }

    // Obtener el código ASCII y convertirlo a binario
    const codigoAscii = caracter.charCodeAt(0);
    return codigoAscii;
}

function binarioAString(binario) {
    return binario.toString(2).padStart(8, '0');
}

function obtenerLetraAleatoria() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return letras.charAt(Math.floor(Math.random() * letras.length));
}

// Variables globales
let arbol;
let tipoArbolActual = '';

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    // Event listeners
    document.getElementById('btn-seleccionar-arbol').addEventListener('click', seleccionarArbol);
    document.getElementById('btn-insertar').addEventListener('click', insertarLetra);
    document.getElementById('btn-insertar-aleatorio').addEventListener('click', insertarLetraAleatoria);
    document.getElementById('btn-eliminar').addEventListener('click', eliminarLetra);
    document.getElementById('btn-buscar').addEventListener('click', buscarLetra);
    document.getElementById('btn-limpiar').addEventListener('click', limpiarArbol);
    document.getElementById('btn-recargar').addEventListener('click', recargarPagina);
    document.getElementById('btn-preorden').addEventListener('click', mostrarPreorden);
    document.getElementById('btn-inorden').addEventListener('click', mostrarInorden);
    document.getElementById('btn-postorden').addEventListener('click', mostrarPostorden);
    document.getElementById('btn-exportar').addEventListener('click', exportarArbol);
    document.getElementById('btn-importar').addEventListener('click', () => {
        document.getElementById('input-importar').click();
    });
    document.getElementById('input-importar').addEventListener('change', importarArbol);

    // Validar entrada para permitir solo letras
    document.getElementById('clave-unica').addEventListener('input', function (e) {
        // Permitir solo letras
        e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');

        // Actualizar información de la letra actual
        const letra = e.target.value;
        if (letra && letra.length > 0) {
            const valorBinario = letraABinario(letra);
            if (valorBinario !== null) {
                document.getElementById('info-letra').textContent = letra;
                document.getElementById('info-binario').textContent = binarioAString(valorBinario);
            }
        } else {
            document.getElementById('info-letra').textContent = '-';
            document.getElementById('info-binario').textContent = '-';
        }
    });
});

function seleccionarArbol() {
    const tipoArbol = document.getElementById('tipo-arbol').value;
    tipoArbolActual = tipoArbol;

    switch (tipoArbol) {
        case 'bst':
            arbol = new ArbolBST();
            document.getElementById('info-tipo').textContent = 'Árbol Binario de Búsqueda (BST)';
            break;
        case 'avl':
            arbol = new ArbolAVL();
            document.getElementById('info-tipo').textContent = 'Árbol AVL (Balanceado)';
            break;
        case 'maxheap':
        case 'minheap':
            arbol = new ArbolBST(); // Usamos BST como base para heap en esta demo
            document.getElementById('info-tipo').textContent = tipoArbol === 'maxheap' ? 'Max-Heap' : 'Min-Heap';
            break;
    }

    mostrarMensaje('Árbol seleccionado: ' + document.getElementById('info-tipo').textContent);
    actualizarInformacion();
    dibujarArbol();
}

function insertarLetra() {
    if (!arbol) {
        mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
        return;
    }

    const claveInput = document.getElementById('clave-unica');
    const letra = claveInput.value;

    if (!letra || letra.length === 0) {
        mostrarMensaje('Por favor ingrese una letra válida', 'error');
        return;
    }

    const valorBinario = letraABinario(letra);
    if (valorBinario === null) {
        mostrarMensaje('Por favor ingrese una letra válida (A-Z, a-z)', 'error');
        return;
    }

    arbol.insertar(valorBinario, letra);
    claveInput.value = '';
    actualizarInformacion();
    dibujarArbol();
    mostrarMensaje('Letra ' + letra + ' (binario: ' + binarioAString(valorBinario) + ') insertada correctamente');
}

function insertarLetraAleatoria() {
    if (!arbol) {
        mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
        return;
    }

    const letra = obtenerLetraAleatoria();
    const valorBinario = letraABinario(letra);

    document.getElementById('clave-unica').value = letra;
    document.getElementById('info-letra').textContent = letra;
    document.getElementById('info-binario').textContent = binarioAString(valorBinario);

    arbol.insertar(valorBinario, letra);
    actualizarInformacion();
    dibujarArbol();
    mostrarMensaje('Letra aleatoria ' + letra + ' (binario: ' + binarioAString(valorBinario) + ') insertada correctamente');
}

function eliminarLetra() {
    if (!arbol) {
        mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
        return;
    }

    const claveInput = document.getElementById('clave-unica');
    const letra = claveInput.value;

    if (!letra || letra.length === 0) {
        mostrarMensaje('Por favor ingrese una letra válida', 'error');
        return;
    }

    const valorBinario = letraABinario(letra);
    if (valorBinario === null) {
        mostrarMensaje('Por favor ingrese una letra válida (A-Z, a-z)', 'error');
        return;
    }

    if (arbol.buscar(valorBinario)) {
        arbol.eliminar(valorBinario);
        claveInput.value = '';
        actualizarInformacion();
        dibujarArbol();
        mostrarMensaje('Letra ' + letra + ' eliminada correctamente');
    } else {
        mostrarMensaje('La letra ' + letra + ' no existe en el árbol', 'error');
    }
}

function buscarLetra() {
    if (!arbol) {
        mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
        return;
    }

    const claveInput = document.getElementById('clave-unica');
    const letra = claveInput.value;

    if (!letra || letra.length === 0) {
        mostrarMensaje('Por favor ingrese una letra válida', 'error');
        return;
    }

    const valorBinario = letraABinario(letra);
    if (valorBinario === null) {
        mostrarMensaje('Por favor ingrese una letra válida (A-Z, a-z)', 'error');
        return;
    }

    const encontrado = arbol.buscar(valorBinario);

    // Resaltar el nodo si se encuentra
    if (encontrado) {
        resaltarNodo(valorBinario);
        mostrarMensaje('La letra ' + letra + ' SÍ existe en el árbol');
    } else {
        mostrarMensaje('La letra ' + letra + ' NO existe en el árbol', 'error');
    }
}

function limpiarArbol() {
    if (!arbol) {
        mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
        return;
    }

    arbol.limpiar();
    actualizarInformacion();
    dibujarArbol();
    mostrarMensaje('Árbol limpiado correctamente');
}

function recargarPagina() {
    location.reload();
}

function mostrarPreorden() {
    if (!arbol) {
        mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
        return;
    }

    const recorrido = arbol.preorden().join(' → ');
    mostrarMensaje('Recorrido Preorden: ' + recorrido);
}

function mostrarInorden() {
    if (!arbol) {
        mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
        return;
    }

    const recorrido = arbol.inorden().join(' → ');
    mostrarMensaje('Recorrido Inorden: ' + recorrido);
}

function mostrarPostorden() {
    if (!arbol) {
        mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
        return;
    }

    const recorrido = arbol.postorden().join(' → ');
    mostrarMensaje('Recorrido Postorden: ' + recorrido);
}

function mostrarMensaje(mensaje, tipo = 'info') {
    const avisos = document.getElementById('avisos');
    avisos.textContent = mensaje;
    avisos.style.color = tipo === 'error' ? '#ff9999' : '#f6f2e9';
}

function actualizarInformacion() {
    if (!arbol) return;

    document.getElementById('info-nodos').textContent = arbol.contarNodos();
    document.getElementById('info-altura').textContent = arbol.altura();
}

function dibujarArbol() {
    const container = document.getElementById('arbol-container');
    container.innerHTML = '';

    if (!arbol || !arbol.raiz) {
        container.innerHTML = '<p style="text-align: center; padding: 50px;">El árbol está vacío</p>';
        return;
    }

    // Calcular dimensiones
    const altura = arbol.altura();
    const ancho = Math.pow(2, altura) * 60;
    container.style.width = ancho + 'px';
    container.style.height = (altura * 100) + 'px';

    // Dibujar nodos recursivamente
    dibujarNodo(arbol.raiz, ancho / 2, 30, ancho / 4, container);
}

function dibujarNodo(nodo, x, y, offset, container) {
    if (nodo === null) return;

    // Crear elemento nodo
    const nodoElement = document.createElement('div');
    nodoElement.className = 'nodo';
    nodoElement.innerHTML = `<div class="letra">${nodo.letra}</div><div class="valor">${binarioAString(nodo.valor)}</div>`;
    nodoElement.style.left = (x - 25) + 'px';
    nodoElement.style.top = y + 'px';
    nodoElement.id = 'nodo-' + nodo.valor;
    container.appendChild(nodoElement);

    // Dibujar conexiones a hijos
    if (nodo.izquierdo !== null) {
        const x2 = x - offset;
        const y2 = y + 70;

        // Dibujar línea (corregido para conexiones izquierdas)
        const linea = document.createElement('div');
        linea.className = 'conexion';

        // Calcular la longitud y ángulo de la línea
        const dx = x2 - x;
        const dy = y2 - y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        linea.style.width = length + 'px';
        linea.style.left = (x + 25) + 'px';  // Ajuste para conectar desde el borde del nodo
        linea.style.top = (y + 25) + 'px';
        linea.style.transform = `rotate(${angle}deg)`;
        container.appendChild(linea);

        // Dibujar hijo izquierdo
        dibujarNodo(nodo.izquierdo, x2, y2, offset / 2, container);
    }

    if (nodo.derecho !== null) {
        const x2 = x + offset;
        const y2 = y + 70;

        // Dibujar línea
        const linea = document.createElement('div');
        linea.className = 'conexion';

        // Calcular la longitud y ángulo de la línea
        const dx = x2 - x;
        const dy = y2 - y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        linea.style.width = length + 'px';
        linea.style.left = (x + 25) + 'px';  // Ajuste para conectar desde el borde del nodo
        linea.style.top = (y + 25) + 'px';
        linea.style.transform = `rotate(${angle}deg)`;
        container.appendChild(linea);

        // Dibujar hijo derecho
        dibujarNodo(nodo.derecho, x2, y2, offset / 2, container);
    }
}

function resaltarNodo(valor) {
    // Quitar resaltado de todos los nodos
    const todosNodos = document.querySelectorAll('.nodo');
    todosNodos.forEach(nodo => {
        nodo.classList.remove('resaltado');
    });

    // Resaltar el nodo específico
    const nodo = document.getElementById('nodo-' + valor);
    if (nodo) {
        nodo.classList.add('resaltado');

        // Hacer scroll para que el nodo sea visible
        nodo.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
}

function exportarArbol() {
    if (!arbol || !arbol.raiz) {
        mostrarMensaje('No hay árbol para exportar', 'error');
        return;
    }

    const datosArbol = {
        tipo: tipoArbolActual,
        nodos: serializarNodos(arbol.raiz),
        fecha: new Date().toISOString()
    };

    const datosJSON = JSON.stringify(datosArbol, null, 2);
    const blob = new Blob([datosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `arbol-${tipoArbolActual}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    mostrarMensaje('Árbol exportado correctamente');
}

// Función para serializar los nodos del árbol
function serializarNodos(nodo) {
    if (!nodo) return null;

    return {
        valor: nodo.valor,
        letra: nodo.letra,
        izquierdo: serializarNodos(nodo.izquierdo),
        derecho: serializarNodos(nodo.derecho)
    };
}

// Función para importar un árbol desde un archivo JSON
function importarArbol(evento) {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function (e) {
        try {
            const datos = JSON.parse(e.target.result);

            // Validar la estructura del archivo
            if (!datos.tipo || !datos.nodos) {
                throw new Error('Formato de archivo inválido');
            }

            // Seleccionar el tipo de árbol
            document.getElementById('tipo-arbol').value = datos.tipo;
            seleccionarArbol();

            // Reconstruir el árbol
            arbol.raiz = deserializarNodos(datos.nodos);

            actualizarInformacion();
            dibujarArbol();
            mostrarMensaje('Árbol importado correctamente');

        } catch (error) {
            console.error('Error al importar el árbol:', error);
            mostrarMensaje('Error al importar el árbol: ' + error.message, 'error');
        }
    };
    lector.readAsText(archivo);

    // Limpiar el input para permitir cargar el mismo archivo again
    evento.target.value = '';
}

// Función para deserializar los nodos del árbol
function deserializarNodos(datos) {
    if (!datos) return null;

    const nodo = new Nodo(datos.valor, datos.letra);
    nodo.izquierdo = deserializarNodos(datos.izquierdo);
    nodo.derecho = deserializarNodos(datos.derecho);

    return nodo;
}