const hashCuadrado = (key, n) => {
    let nStr = n.toString()

    let cuadrado = key * key;
    let cuadradoStr = cuadrado.toString();
    // Original code:
    let diferencia = cuadradoStr.length - nStr.length + 1;
    
    // Proposed fix:
    // let diferencia = cuadradoStr.length - nStr.length;

    let digsARecortar = diferencia / 2; // digitos a recortar por cada lado
    
    console.log(`Key: ${key}, n: ${n}, Sq: ${cuadrado}, LenSq: ${cuadradoStr.length}, LenN: ${nStr.length}, Dif: ${diferencia}, Cut: ${digsARecortar}`);

    let nuevaKey = cuadradoStr.substring(digsARecortar, cuadradoStr.length - digsARecortar);
    
    console.log(`Substr: ${nuevaKey}`);
    
    nuevaKey = parseInt(nuevaKey);
    return nuevaKey;
}

// Test cases
hashCuadrado(123, 100); // n=100 (len 3). Sq=15129 (len 5). Dif=5-3+1=3. Cut=1.5. Substr(1.5, 3.5) -> "51" (if 1.5->1, 3.5->3? JS substring rounds? No, it treats float as int? Let's see)
