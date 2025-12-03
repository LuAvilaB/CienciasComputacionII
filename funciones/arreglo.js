class Estructura {

    constructor(tam, externo = false, arr = []) {
        this.array = arr;
        this.tamBloq = !externo ? false : Math.floor(Math.sqrt(tam));
        this.tam = tam;
        this.collisionMethod = null; // Método de resolución de colisiones
    }

    #validarIndice(ind) {
        if (ind > this.tam) {
            throw 'Indice por encima del rango';
        }
        else if (ind <= 0) {
            throw 'Indice invalido';
        }
        return ind - 1;
    }

    /**
     * Inserta un elemento con resolución de colisiones según el método seleccionado
     * @param {number} hash - Índice hash inicial
     * @param {*} elem - Elemento a insertar
     * @param {function} hashFunc - Función hash original
     * @param {number} key - Clave original
     * @returns {number} - Índice donde se insertó el elemento
     */
    insertWithCollisionResolution(hash, elem, hashFunc, key) {
        if (hash >= this.tam || hash < 0) {
            throw 'Índice fuera del rango válido';
        }

        // Si no hay colisión, insertar directamente
        if (this.array[hash] == undefined || this.array[hash] == null) {
            this.array[hash] = elem;
            return hash;
        }

        // Aplicar método de resolución según la configuración
        switch (this.collisionMethod) {
            case 'lineal': // Prueba Lineal
                for (let i = 1; i < this.tam; i++) {
                    let newHash = (hash + i) % this.tam;
                    if (this.array[newHash] == undefined || this.array[newHash] == null) {
                        this.array[newHash] = elem;
                        return newHash;
                    }
                }
                throw 'No hay espacio disponible en la estructura';

            case 'cuadratica': // Prueba Cuadrática
                for (let i = 1; i < this.tam; i++) {
                    let newHash = (hash + i * i) % this.tam;
                    if (this.array[newHash] == undefined || this.array[newHash] == null) {
                        this.array[newHash] = elem;
                        return newHash;
                    }
                }
                throw 'No hay espacio disponible en la estructura';

            case 'doble': // Doble Función Hash
                let hash2Val = hash2(key, this.tam);
                for (let i = 1; i < this.tam; i++) {
                    let newHash = (hash + i * hash2Val) % this.tam;
                    if (this.array[newHash] == undefined || this.array[newHash] == null) {
                        this.array[newHash] = elem;
                        return newHash;
                    }
                }
                throw 'No hay espacio disponible en la estructura';

            case 'anidado': // Arreglos Anidados
            case 'encadenamiento': // Encadenamiento
                // Si ya es un array, agregar el nuevo elemento
                if (Array.isArray(this.array[hash])) {
                    this.array[hash].push(elem);
                } else {
                    // Convertir el valor existente y el nuevo en un array
                    this.array[hash] = [this.array[hash], elem];
                }
                return hash;

            default:
                throw 'Método de resolución de colisiones no válido';
        }
    }

    /**
     * Busca un elemento con resolución de colisiones según el método seleccionado
     * @param {number} hash - Índice hash inicial
     * @param {*} elem - Elemento a buscar
     * @param {function} hashFunc - Función hash original
     * @param {number} key - Clave original
     * @returns {number} - Índice donde se encontró el elemento, -1 si no existe
     */
    searchWithCollisionResolution(hash, elem, hashFunc, key) {
        if (hash >= this.tam || hash < 0) {
            return -1;
        }

        // Aplicar método de resolución según la configuración
        switch (this.collisionMethod) {
            case 'lineal': // Prueba Lineal
                for (let i = 0; i < this.tam; i++) {
                    let newHash = (hash + i) % this.tam;
                    if (this.array[newHash] == undefined || this.array[newHash] == null) {
                        return -1; // No encontrado
                    }
                    if (this.array[newHash] == elem) {
                        return newHash;
                    }
                }
                return -1;

            case 'cuadratica': // Prueba Cuadrática
                for (let i = 0; i < this.tam; i++) {
                    let newHash = (hash + i * i) % this.tam;
                    if (this.array[newHash] == undefined || this.array[newHash] == null) {
                        return -1; // No encontrado
                    }
                    if (this.array[newHash] == elem) {
                        return newHash;
                    }
                }
                return -1;

            case 'doble': // Doble Función Hash
                let hash2Val = hash2(key, this.tam);
                for (let i = 0; i < this.tam; i++) {
                    let newHash = (hash + i * hash2Val) % this.tam;
                    if (this.array[newHash] == undefined || this.array[newHash] == null) {
                        return -1; // No encontrado
                    }
                    if (this.array[newHash] == elem) {
                        return newHash;
                    }
                }
                return -1;

            case 'anidado': // Arreglos Anidados
            case 'encadenamiento': // Encadenamiento
                if (this.array[hash] == undefined || this.array[hash] == null) {
                    return -1;
                }
                if (this.array[hash] == elem) {
                    return hash;
                }
                if (Array.isArray(this.array[hash]) && this.array[hash].indexOf(elem) != -1) {
                    return hash;
                }
                return -1;

            default:
                return -1;
        }
    }

    sset(ind, elem) {
        // ind is already 0-based from hash functions
        if (ind >= this.tam || ind < 0) {
            throw 'Indice fuera del rango válido';
        }
        if (this.array[ind] == undefined) {
            this.array[ind] = elem;
        }
        else {
            if (typeof this.array[ind] == 'object') {
                this.array[ind].push(elem);
            }
            else {
                this.array[ind] = [this.array[ind], elem]
            }
        }
    }

    set(ind, elem) {
        ind = this.#validarIndice(ind);
        this.array[ind] = elem;
    }
    add(elem) {
        if (this.array.indexOf(elem) != -1) {
            throw 'Clave repetida'
        }
        if (this.array.length < this.tam) {
            return this.array.push(elem) - 1;
        }
        else {
            throw 'Tamaño maximo alcanzado'
        }
    }

    get(ind) {
        ind = this.#validarIndice(ind);
        return this.array[ind];
    }


    busquedaSecuencial(elemento) {
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] === elemento || (Array.isArray(this.array[i]) && this.array[i].indexOf(elemento) != -1)) {
                return i + 1;
            }
        }
        return -1;
    }

    busquedaSecuencialG(elemento, i = 0, nivelBloque = false) {
        let _return = {
            completado: false,
            nivelBloque: nivelBloque
        };
        if (i == 0 && nivelBloque) {
            i = this.tamBloq - 1;
        }
        if (this.array[i] === elemento || (Array.isArray(this.array[i]) && this.array[i].indexOf(elemento) != -1)) {
            _return.completado = true;
        }
        _return.valor = i + 1;
        if (this.array[i] > elemento && nivelBloque) {
            nivelBloque = false;
            i -= this.tamBloq;
        }
        if (!nivelBloque || !this.tamBloq) {
            i++;
        }
        else {
            if (i == 0) {
                i = this.tamBloq - 1;
            }
            else {
                i += this.tamBloq;
            }
            if (i > this.array.length) {
                i = this.array.length - 1;
                nivelBloque = false;
            }
        }
        if (i > this.array.length) {
            _return.valor = -1;
        }
        if (_return.completado || _return.valor == -1) {
            _return.completado = true;
            _return.next = () => _return;
        }
        else {
            _return.next = () => this.busquedaSecuencialG(elemento, i, nivelBloque)
        }
        return _return;
    }

    /**
     * 
     * @param {number} elemento 
     * @param {number} min 
     * @param {number} max 
     */
    busquedaBinariaG(elemento, min = 0, max = -1,) {
        max = max != -1 ? max : this.array.length - 1;
        let mitad = Math.floor((max + min) / 2);
        let caso;
        let _return = {
            completado: false,
            valor: mitad + 1
        };
        if (min > max) {
            _return.completado = true;
            _return.valor = -1;
            _return.next = () => _return;
        }
        if (this.array[mitad] == elemento || (Array.isArray(this.array[mitad]) && this.array[mitad].indexOf(elemento) != -1)) {
            _return.completado = true;
            _return.next = () => _return;
        }
        else if (elemento < this.array[mitad]) {
            _return.next = () => {
                return this.busquedaBinariaG(elemento, min, mitad - 1);
            }
        }
        else {
            _return.next = () => {
                return this.busquedaBinariaG(elemento, mitad + 1, max);
            }
        }
        return _return;
    }

    /**
     * 
     * @param {number} elemento
     */
    busquedaBinaria(elemento) {
        let min = 0;
        let max = this.array.length;
        while (min <= max) {
            let mitad = Math.floor((max + min) / 2);
            if (this.array[mitad] == elemento || (Array.isArray(this.array[mitad]) && this.array[mitad].indexOf(elemento) != -1)) {
                return mitad + 1;
            }
            else if (elemento < this.array[mitad]) {
                max = mitad - 1; //'izquierda'
            }
            else {
                min = mitad + 1; //'derecha'
            }
        }
        return -1;
    }
}

function binarySearch(value, list) {
    let first = 0;    //left endpoint 
    let last = list.length - 1;   //right endpoint 
    let position = -1;
    let found = false;
    let middle;
    while (found === false && first <= last) {
        middle = Math.floor((first + last) / 2);
        if (list[middle] == value) {
            found = true;
            position = middle;
        } else if (list[middle] > value) {  //if in lower half 
            last = middle - 1;
        } else {  //in in upper half 
            first = middle + 1;
        }
    }
    return position;
}