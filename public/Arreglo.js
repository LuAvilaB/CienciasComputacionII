class Estructura {

    constructor(tam, externo=false, arr=[]){
        this.array = arr;
        this.tamBloq = !externo ? false : Math.floor(Math.sqrt(tam));
        this.tam = tam
    }

    #validarIndice(ind){
        if(ind > this.tam){
            throw 'Indice por encima del rango';
        }
        else if(ind <= 0){
            throw 'Indice invalido';
        }
        return ind-1;
    }

    sset(ind, elem){
        ind = this.#validarIndice(ind);
        if(this.array[ind] == undefined){
            this.array[ind] = elem;
        }
        else{
            if(typeof(this.array[ind]) == 'object'){
                typeof(this.array[ind]).push(elem);
            }
            else {
                this.array[ind] = [this.array[ind], elem]
            }
        }
    }

    set(ind, elem){
        ind = this.#validarIndice(ind);
        this.array[ind] = elem;
    }
    add(elem){
        if(this.array.indexOf(elem) != -1){
            throw 'Clave repetida'
        }
        if(this.array.length < this.tam){
            return this.array.push(elem)-1;
        }
        else{
            throw 'tamaño maximo alcanzado'
        }
    }

    get(ind){
        ind = this.#validarIndice(ind);
        return this.array[ind];
    }


    busquedaSecuencial(elemento){
        for(let i=0; i<this.array.length; i++){
            if(this.array[i] === elemento || (Array.isArray(this.array[i]) && this.array[i].indexOf(elemento) != -1)){
                return i+1;
            }
        }
        return -1;
    }

    busquedaSecuencialG(elemento, i=0, nivelBloque=false){
        let _return = {
            completado: false,
            nivelBloque: nivelBloque
        };
        if(i == 0 && nivelBloque){
            i = this.tamBloq-1;
        }
        if(this.array[i] === elemento || (Array.isArray(this.array[i]) && this.array[i].indexOf(elemento) != -1)){
            _return.completado = true;
        }
        _return.valor = i+1;
        if(this.array[i] > elemento && nivelBloque){
            nivelBloque = false;
            i-= this.tamBloq;
        }
        if(!nivelBloque || !this.tamBloq){
            i++;
        }
        else {
            if(i == 0){
                i = this.tamBloq-1;
            }
            else {
                i += this.tamBloq;
            }
            if(i > this.array.length){
                i = this.array.length-1;
                nivelBloque = false;
            }
        }
        if(i > this.array.length){
            _return.valor = -1;
        }
        if(_return.completado || _return.valor == -1){
            _return.completado = true;
            _return.next = ()=>_return;
        }
        else {
            _return.next = ()=>this.busquedaSecuencialG(elemento, i, nivelBloque)
        }
        return _return;
    }

    /**
     * 
     * @param {number} elemento 
     * @param {number} min 
     * @param {number} max 
     */
    busquedaBinariaG(elemento, min=0, max=-1, ){
        max = max != -1 ? max : this.array.length-1;
        let mitad = Math.floor( (max+min)/2 );
        let caso;
        let _return = {
            completado: false,
            valor: mitad+1
        };
        if(min > max){
            _return.completado = true;
            _return.valor = -1;
            _return.next = ()=>_return;
        }
        if(this.array[mitad] == elemento || (Array.isArray(this.array[mitad]) && this.array[mitad].indexOf(elemento) != -1)){
            _return.completado = true;
            _return.next = ()=>_return;
        }
        else if(elemento < this.array[mitad]){
            _return.next = ()=>{
                return this.busquedaBinariaG(elemento, min, mitad-1);
            }
        }
        else{
            _return.next = ()=>{
                return this.busquedaBinariaG(elemento, mitad+1, max);
            }
        }
        return _return;
    }

    /**
     * 
     * @param {number} elemento
     */
    busquedaBinaria(elemento){
        let min = 0;
        let max = this.array.length;
        while(min <= max){
            let mitad = Math.floor( (max+min)/2 );
            if(this.array[mitad] == elemento || (Array.isArray(this.array[mitad]) && this.array[mitad].indexOf(elemento) != -1)){
                return mitad+1;
            }
            else if(elemento < this.array[mitad]){
                max = mitad-1; //'izquierda'
            }
            else{
                min = mitad+1; //'derecha'
            }
        }
        return -1;
    }
}
prueba = [1,3,5,6,7]

function binarySearch(value, list) {
    let first = 0;    //left endpoint 
    let last = list.length - 1;   //right endpoint 
    let position = -1;
    let found = false;
    let middle;
    while (found === false && first <= last) {
        middle = Math.floor((first + last)/2);
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