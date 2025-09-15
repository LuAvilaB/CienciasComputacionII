
let inputExpLog;
let divAvisos;
let spanResultado;
let bTablaVerdad;

function updateN(event){
    let nuevoValor = parseInt(event.target.value);
    if(isNaN(nuevoValor)){
        document.querySelector('#n-pow').textContent = '0';
    }
    else {
        document.querySelector('#n-pow').textContent = Math.pow(10, nuevoValor);
    }
}

window.addEventListener('load', () => {
    document.querySelector('#btnCuadrado').addEventListener('click', eventCuadrado)
    document.querySelector('#btnTruncamiento').addEventListener('click', eventTruncamiento)
    document.querySelector('#i-n').addEventListener('input', updateN)
})

function eventCuadrado(){
    let key = document.querySelector('#i-cuadrado').value;
    let n = Math.pow(10, parseInt(document.querySelector('#i-n').value));
    let cajaResultado = document.querySelector('#r-cuadrado');
    if(isNaN(n) || key.trim() == ''){
        cajaResultado.classList.remove('verde');
        cajaResultado.classList.add('error');
        cajaResultado.textContent = isNaN(n) ? 'n invalido!' : 'Key invalida';
    }
    else {
        cajaResultado.classList.add('verde');
        cajaResultado.classList.remove('error');
        cajaResultado.textContent = hashCuadrado(key, n);
    }
}

function hashCuadrado(key, n){
    var nuevaKey = "Error";
    let intKey = parseInt(key);
    let intN = n;
    n = n+"";

    let keyCuadrado = Math.pow(intKey, 2);
    let cuadradoStr = keyCuadrado + "";
    if(cuadradoStr.length > n.length-1){
        let diferencia = cuadradoStr.length-n.length+1;
        let digsARecortar = diferencia/2; // digitos a recortar por cada lado
        nuevaKey = cuadradoStr.substring(digsARecortar, cuadradoStr.length-digsARecortar);
        nuevaKey = parseInt(nuevaKey)+1;
        // if(parseInt(digsARecortar) == digsARecortar){
        // }
        // else {
        //     nuevaKey = cuadradoStr.substring(digsARecortar, cuadradoStr.length-digsARecortar);
        // }
    }
    else {
        cuadradoStr = (keyCuadrado+1)+"";
        for (let i = 0; i < n.length-1; i++) {
            cuadradoStr = '0'+cuadradoStr;
        }
        nuevaKey = cuadradoStr.substring(cuadradoStr.length-n.length+1);
    }

    return nuevaKey;
}

function eventTruncamiento(){
    let clave = document.querySelector('#i-truncamiento').value;
    let posicionesInvalidas = false;
    let posiciones = document.querySelector('#i-pos').value.split(' ').join('').split(',')
        .map((e)=>{
            let elem = parseInt(e);
            for(letra of e){
                if(letra.charCodeAt() > 57 || letra.charCodeAt() < 48){
                    posicionesInvalidas = true;
                    break;
                }
            }
            if(isNaN(elem)){
                posicionesInvalidas = true;
            }
            return elem-1;
        });
    let cajaResultado = document.querySelector('#r-trunc');
    if(posicionesInvalidas || posiciones.length == 0){
        cajaResultado.classList.remove('verde');
        cajaResultado.classList.add('error');
        cajaResultado.textContent = 'Posiciones invalidas';
        return;
    }
    else{
        cajaResultado.classList.add('verde');
        cajaResultado.classList.remove('error');
        cajaResultado.textContent = hashTruc(clave, posiciones);

    }
}

function hashTruc(key, posiciones){
    let digitos = [];
    for(posicion of posiciones){
        let digito = key[posicion];
        digito = (digito == undefined) ? '0' : digito;
        digitos.push(digito)
    }
    let num = parseInt(digitos.join(''))+1;
    nuevaKey = num+"";
    while(nuevaKey.length < posiciones.length){
        nuevaKey = nuevaKey+'0';
    }

    return nuevaKey;
}