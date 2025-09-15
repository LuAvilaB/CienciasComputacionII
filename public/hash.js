/**
 * 
 * @param {number} key 
 * @param {number} n 
 * @returns 
 */
function hashCuadrado(key, n){
    let result;
    let nStr = n.toString()

    let cuadrado = key*key;
    let cuadradoStr = cuadrado.toString();
    let diferencia = cuadradoStr.length-nStr.length+1;
    let digsARecortar = diferencia/2; // digitos a recortar por cada lado
    nuevaKey = cuadradoStr.substring(digsARecortar, cuadradoStr.length-digsARecortar);
    nuevaKey = parseInt(nuevaKey)+1;
    // if(cuadradoStr.length > nStr.length-1){
    // }
    // else {
    //     nuevaKey = cuadradoStr.substring(cuadradoStr.length-n.length+1);
    // }

    return nuevaKey;
}

/**
 * 
 * @param {number} key 
 * @param {number} posiciones Posiciones con las que truncar, se cuenta desde 1
 * @returns 
 */
function hashTruc(key, posiciones){
    let digitos = [];
    let strKey = key.toString();
    for(posicion of posiciones){
        let digito = strKey[posicion-1];
        digito = (digito == undefined) ? '0' : digito;
        digitos.push(digito)
    }
    let nuevaKey = parseInt(digitos.join(''))+1;

    return nuevaKey;
}

/**
 * 
 * @param {number} key 
 * @param {number} n 
 */
function hashMod(key, n){
    return key%n+1
}

/**
 * Realiza el hash de una key por medio de plegamiento
 * @param {number} key 
 * @param {number} n 
 */
function hashPleg(key, n){
    let digitosDeRango = n.toString().length - 1;
    const numerosSignificativos = digitosDeRango == 0 ? 1 : digitosDeRango;
  
    const strKey = key.toString();
    const digitosDeKey = strKey.length;
    let sumaDigitos = 0;
    for(let i=0; i<digitosDeKey; i+=numerosSignificativos){
        sumaDigitos += parseInt(strKey.substring(i, i+numerosSignificativos));
    }
    strSumDigs = sumaDigitos.toString();
    if(sumaDigitos.toString().length >= numerosSignificativos+1){
        sumaDigitos = parseInt(strSumDigs.substring(strSumDigs.length-numerosSignificativos));
    }
    return sumaDigitos+1;
}
