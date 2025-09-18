class Nodo {
            constructor(valor) {
                this.valor = valor;
                this.izquierdo = null;
                this.derecho = null;
                this.altura = 1;
            }
        }

        class ArbolBST {
            constructor() {
                this.raiz = null;
            }

            insertar(valor) {
                this.raiz = this._insertar(this.raiz, valor);
            }

            _insertar(nodo, valor) {
                if (nodo === null) {
                    return new Nodo(valor);
                }

                if (valor < nodo.valor) {
                    nodo.izquierdo = this._insertar(nodo.izquierdo, valor);
                } else if (valor > nodo.valor) {
                    nodo.derecho = this._insertar(nodo.derecho, valor);
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

            preorden() {
                const resultado = [];
                this._preorden(this.raiz, resultado);
                return resultado;
            }

            _preorden(nodo, resultado) {
                if (nodo !== null) {
                    resultado.push(nodo.valor);
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
                    resultado.push(nodo.valor);
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
                    resultado.push(nodo.valor);
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
            _insertar(nodo, valor) {
                if (nodo === null) {
                    return new Nodo(valor);
                }

                if (valor < nodo.valor) {
                    nodo.izquierdo = this._insertar(nodo.izquierdo, valor);
                } else if (valor > nodo.valor) {
                    nodo.derecho = this._insertar(nodo.derecho, valor);
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

        // Variables globales
        let arbol;
        let tipoArbolActual = '';

        // Inicialización
        document.addEventListener('DOMContentLoaded', function() {
            // Event listeners
            document.getElementById('btn-seleccionar-arbol').addEventListener('click', seleccionarArbol);
            document.getElementById('btn-insertar').addEventListener('click', insertarClave);
            document.getElementById('btn-insertar-aleatorio').addEventListener('click', insertarClaveAleatoria);
            document.getElementById('btn-eliminar').addEventListener('click', eliminarClave);
            document.getElementById('btn-buscar').addEventListener('click', buscarClave);
            document.getElementById('btn-limpiar').addEventListener('click', limpiarArbol);
            document.getElementById('btn-recargar').addEventListener('click', recargarPagina);
            document.getElementById('btn-preorden').addEventListener('click', mostrarPreorden);
            document.getElementById('btn-inorden').addEventListener('click', mostrarInorden);
            document.getElementById('btn-postorden').addEventListener('click', mostrarPostorden);
        });

        function seleccionarArbol() {
            const tipoArbol = document.getElementById('tipo-arbol').value;
            tipoArbolActual = tipoArbol;
            
            switch(tipoArbol) {
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

        function insertarClave() {
            if (!arbol) {
                mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
                return;
            }
            
            const claveInput = document.getElementById('clave-unica');
            const clave = parseInt(claveInput.value);
            
            if (isNaN(clave)) {
                mostrarMensaje('Por favor ingrese un valor numérico válido', 'error');
                return;
            }
            
            arbol.insertar(clave);
            claveInput.value = '';
            actualizarInformacion();
            dibujarArbol();
            mostrarMensaje('Clave ' + clave + ' insertada correctamente');
        }

        function insertarClaveAleatoria() {
            if (!arbol) {
                mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
                return;
            }
            
            const clave = Math.floor(Math.random() * 100) + 1;
            document.getElementById('clave-unica').value = clave;
            arbol.insertar(clave);
            actualizarInformacion();
            dibujarArbol();
            mostrarMensaje('Clave aleatoria ' + clave + ' insertada correctamente');
        }

        function eliminarClave() {
            if (!arbol) {
                mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
                return;
            }
            
            const claveInput = document.getElementById('clave-unica');
            const clave = parseInt(claveInput.value);
            
            if (isNaN(clave)) {
                mostrarMensaje('Por favor ingrese un valor numérico válido', 'error');
                return;
            }
            
            if (arbol.buscar(clave)) {
                arbol.eliminar(clave);
                claveInput.value = '';
                actualizarInformacion();
                dibujarArbol();
                mostrarMensaje('Clave ' + clave + ' eliminada correctamente');
            } else {
                mostrarMensaje('La clave ' + clave + ' no existe en el árbol', 'error');
            }
        }

        function buscarClave() {
            if (!arbol) {
                mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
                return;
            }
            
            const claveInput = document.getElementById('clave-unica');
            const clave = parseInt(claveInput.value);
            
            if (isNaN(clave)) {
                mostrarMensaje('Por favor ingrese un valor numérico válido', 'error');
                return;
            }
            
            const encontrado = arbol.buscar(clave);
            
            // Resaltar el nodo si se encuentra
            if (encontrado) {
                resaltarNodo(clave);
                mostrarMensaje('La clave ' + clave + ' SÍ existe en el árbol');
            } else {
                mostrarMensaje('La clave ' + clave + ' NO existe en el árbol', 'error');
            }
        }

        function limpiarArbol() {
            if (!arbol) {
                mostrarMensaje('Primero debe seleccionar un tipo de árbol', 'error');
                return;
            }
            
            seleccionarArbol(); // Reinicia el árbol
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
            nodoElement.textContent = nodo.valor;
            nodoElement.style.left = (x - 20) + 'px';
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
                linea.style.left = (x + 20) + 'px';  // Ajuste para conectar desde el borde del nodo
                linea.style.top = (y + 20) + 'px';
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
                linea.style.left = (x + 20) + 'px';  // Ajuste para conectar desde el borde del nodo
                linea.style.top = (y + 20) + 'px';
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