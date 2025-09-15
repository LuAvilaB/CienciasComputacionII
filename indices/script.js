
let numRegistros = 0;
let longRegDato = 0;
let longRegIndice = 0;
let capacidadBloque = 0;
let regXBloqueDato = 0;
let regXBloqueIndice = 0;
let bloquesDato = 0;
let bloquesIndice = 0;
let tipo = "";
const direcciones = [];
const estructura = [];
const indices = [];

const contenedor = document.querySelector("#tabla-arr");
const avisos = document.querySelector("#avisos");
const verPasos = document.querySelector('#cb-verP');
const tiempo = document.querySelector('#i-t');

function _volverADibujarEstructuras(esMultinivel, esAcoplamiento, esSecundaria) {
  while (indices[0]) indices.pop();
  if (!esMultinivel) {
    indices.push([]);
    const aumento = esSecundaria ? 1 : regXBloqueDato;
    for (let i = 0; i < numRegistros; i += aumento) {
      indices[0].push({
        direccion: _generarDireccionHexadecimal().toString(),
        clave: esAcoplamiento ? estructura[i].valor : estructura[i].clave,
        valor: estructura[i].direccion
      });
    }
  } else {
    let indice, maxIndice, paso, estructuraIndiceAux;
    maxIndice = numRegistros;
    paso = regXBloqueDato;
    estructuraIndiceAux = estructura;
    while (maxIndice > regXBloqueIndice) {
      indices.push([]);
      indice = indices.length - 1;
      for (let i = 0; i < maxIndice; i += paso) {
        indices[indice].push({
          direccion: _generarDireccionHexadecimal().toString(),
          clave: estructuraIndiceAux[i].clave,
          valor: estructuraIndiceAux[i].direccion
        });
      }
      maxIndice = indices[indices.length - 1].length;
      paso = regXBloqueIndice;
      estructuraIndiceAux = indices[indices.length - 1];
    }
  }
  contenedor.innerHTML = "";
  contenedor.style.overflowX = "auto";

  for (let i = indices.length - 1; i >= 0; i--) {
    const divIndices = document.createElement("div");
    divIndices.style.height = "80vh";
    divIndices.style.width = "400px";
    divIndices.style.border = "2px dashed white";
    divIndices.style.padding = "5px";
    divIndices.style.overflowY = "auto";
    let contenidoIndices = '<div class="contenedor" style="display: flex; flex-direction: row; padding: 0px;"><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">#</b><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Clave</b> <b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Valor</b></div><div style="border: 2px dashed gray;">';
    for (let j = 0; j < indices[i].length; j++) {
      if (j % regXBloqueIndice === 0)
        contenidoIndices += '</div><div style="border: 2px dashed gray;">';
      contenidoIndices += `<div id="${indices[i][j].direccion}"  class="contenedor" style="border: dashed; border-color: transparent; border-width: 2px; display: flex; flex-direction: row; padding: 0px;"><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${indices[i][j].direccion}</p><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${indices[i][j].clave}</p> <p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${indices[i][j].valor}</p></div>`;
    }
    contenidoIndices += '</div>';
    divIndices.innerHTML = contenidoIndices;
    contenedor.appendChild(divIndices);
  }

  const divDatos = document.createElement("div");
  divDatos.style.height = "80vh";
  divDatos.style.width = "400px";
  divDatos.style.border = "2px dashed white";
  divDatos.style.padding = "5px";
  divDatos.style.overflowY = "auto";
  let contenidoDatos = '<div class="contenedor" style="display: flex; flex-direction: row; padding: 0px;"><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">#</b><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Clave</b> <b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Valor</b></div><div style="border: 2px dashed gray;">';
  for (let i = 0; i < estructura.length; i++) {
    if (i % regXBloqueDato === 0)
      contenidoDatos += '</div><div style="border: 2px dashed gray;">';
    contenidoDatos += `<div id="${estructura[i].direccion}"  class="contenedor" style="border: dashed; border-color: transparent; border-width: 2px; display: flex; flex-direction: row; padding: 0px;"><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${estructura[i].direccion}</p><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${estructura[i].clave}</p> <p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${estructura[i].valor}</p></div>`;
  }
  contenidoDatos += '</div>';
  divDatos.innerHTML = contenidoDatos;
  contenedor.appendChild(divDatos);
}

function _generarDireccionHexadecimal() {
  const caracteresHexadecimales = '0123456789ABCDEF';
  let direccionHexadecimal = '0x';

  do {
    for (let i = 0; i < 4; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresHexadecimales.length);
      direccionHexadecimal += caracteresHexadecimales.charAt(indiceAleatorio);
    }
  } while (direcciones.includes(direccionHexadecimal));
  direcciones.push(direccionHexadecimal);

  return direccionHexadecimal;
}

function _rellenarNoMultinivel(esAcoplamiento, esSecundaria) {
  for (let i = 0; i < numRegistros; i++) {
    estructura.push({
      direccion: _generarDireccionHexadecimal().toString(),
      clave: i + 1,
      valor: esAcoplamiento ? "VALOR" + (i + 1).toString() : "",
    });
  }
  indices.push([]);
  const aumento = esSecundaria ? 1 : regXBloqueDato;
  for (let i = 0; i < numRegistros; i += aumento) {
    indices[0].push({
      direccion: _generarDireccionHexadecimal().toString(),
      clave: esAcoplamiento ? estructura[i].valor : estructura[i].clave,
      valor: estructura[i].direccion
    });
  }

  contenedor.innerHTML = "";
  const divIndices = document.createElement("div");
  divIndices.style.height = "80vh";
  divIndices.style.width = "400px";
  divIndices.style.border = "2px dashed white";
  divIndices.style.padding = "5px";
  divIndices.style.overflowY = "auto";
  let contenidoIndices = '<div class="contenedor" style="display: flex; flex-direction: row; padding: 0px;"><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">#</b><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Clave</b> <b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Valor</b></div><div style="border: 2px dashed gray;">';
  for (let i = 0; i < indices[0].length; i++) {
    if (i % regXBloqueIndice === 0)
      contenidoIndices += '</div><div style="border: 2px dashed gray;">';
    contenidoIndices += `<div id="${indices[0][i].direccion}" class="contenedor" style="border: dashed; border-color: transparent; border-width: 2px; display: flex; flex-direction: row; padding: 0px;"><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${indices[0][i].direccion}</p><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${indices[0][i].clave}</p> <p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${indices[0][i].valor}</p></div>`;
  }
  contenidoIndices += '</div>';
  divIndices.innerHTML = contenidoIndices;
  contenedor.appendChild(divIndices);

  const divDatos = document.createElement("div");
  divDatos.style.height = "80vh";
  divDatos.style.width = "400px";
  divDatos.style.border = "2px dashed white";
  divDatos.style.padding = "5px";
  divDatos.style.overflowY = "auto";
  let contenidoDatos = '<div class="contenedor" style="display: flex; flex-direction: row; padding: 0px;"><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">#</b><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Clave</b> <b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Valor</b></div><div style="border: 2px dashed gray;">';
  for (let i = 0; i < estructura.length; i++) {
    if (i % regXBloqueDato === 0)
      contenidoDatos += '</div><div style="border: 2px dashed gray;">';
    contenidoDatos += `<div id="${estructura[i].direccion}"  class="contenedor" style="border: dashed; border-color: transparent; border-width: 2px; display: flex; flex-direction: row; padding: 0px;"><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${estructura[i].direccion}</p><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${estructura[i].clave}</p> <p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${estructura[i].valor}</p></div>`;
  }
  contenidoDatos += '</div>';
  divDatos.innerHTML = contenidoDatos;
  contenedor.appendChild(divDatos);
}

function _obtenerUbicacion(key) {
  const hash = document.querySelector("#hash-opt").value;
  let ubicacion;
  switch (hash.toString()) {
    case "Cuadrado":
      ubicacion = hashCuadrado(key, numRegistros);
      break;
    case "Plegamiento":
      ubicacion = hashPleg(key, numRegistros);
      break;
    case "Truncamiento":
      let posiciones = [];
      for (let i = 1; i <= key.toString().length; i += 2)
        posiciones.push(i);
      ubicacion = hashTruc(key, posiciones);
      break;
    default:
      ubicacion = hashMod(key, numRegistros);
      break;
  }
  return ubicacion;
}

function _mostrarPasos(key, tiempo) {
  let pasos = false;
  clearInterval(pasos);
  let indiceActual = 0;
  let indiceEstructuraActual = indices.length - 1;
  let estructuraActual = indices[indiceEstructuraActual];
  let elementoActual = estructuraActual[indiceActual];
  let etiquetaHTML = document.getElementById(elementoActual.direccion);
  pasos = setInterval(function () {
    etiquetaHTML.style.borderColor = "transparent";
    if (key < elementoActual.clave) {
      etiquetaHTML = document.getElementById(elementoActual.direccion);
      etiquetaHTML.style.borderColor = "red";
    }
    elementoActual = estructuraActual[indiceActual];
    etiquetaHTML = document.getElementById(elementoActual.direccion);
    etiquetaHTML.style.borderColor = "red";
    if (key === elementoActual.clave) {
      etiquetaHTML.style.borderColor = "transparent";
      elementoActual = estructuraActual[indiceActual + 1];
      etiquetaHTML = document.getElementById(elementoActual.direccion);
      etiquetaHTML.style.borderColor = "red";
      clearInterval(pasos);
    } else if (key < elementoActual.clave) {
      elementoActual = estructuraActual[indiceActual == 0 ? 0 : indiceActual - 1];
      if (indiceEstructuraActual > 0) {
        estructuraActual = indices[--indiceEstructuraActual];
        indiceActual = estructuraActual.findIndex(function (objeto) {
          return objeto.direccion === elementoActual.valor;
        });
      } else if (indiceEstructuraActual !== -1) {
        estructuraActual = estructura;
        indiceActual = estructuraActual.findIndex(function (objeto) {
          return objeto.direccion === elementoActual.valor;
        });
        indiceEstructuraActual = -1;
      } else if (indiceEstructuraActual === -1) {
        clearInterval(pasos);
      }
    } else {
      indiceActual++;
    }
  }, tiempo);
  console.log("saliiii")
}

document.querySelector("#iniciar-estruc").addEventListener("click", () => {
  numRegistros = parseInt(document.querySelector("#cantreg").value);
  if (!numRegistros || numRegistros % 10 !== 0 || numRegistros >= 5000) {
    avisos.innerHTML = "Cantidad de registros debe ser un número múltiplo de 10 y menor o igual a 5.000";
    return;
  }
  longRegDato = parseInt(document.querySelector("#longreg").value);
  if (!longRegDato || longRegDato < 1 || longRegDato > numRegistros) {
    avisos.innerHTML = "Longitud por registro dato debe ser un número mayor o igual a 1 no mayor al número de registros";
    return;
  }
  longRegIndice = parseInt(document.querySelector("#longind").value);
  if (!longRegIndice || longRegIndice < 1 || longRegIndice > numRegistros) {
    avisos.innerHTML = "Longitud por registro índice debe ser un número mayor o igual a 1 no mayor al número de registros";
    return;
  }
  capacidadBloque = parseInt(document.querySelector("#capbloq").value);
  if (!capacidadBloque || !Number.isInteger(Math.log2(capacidadBloque))) {
    avisos.innerHTML = "La capacidad de bloque debe ser un número potencia de 2";
    return;
  }
  tipo = document.querySelector("#type-estruc").value.toString();
  avisos.innerHTML = "";

  if (tipo === "Primario" || tipo === "Acoplamiento") {
    regXBloqueDato = Math.floor(capacidadBloque / longRegDato);
    regXBloqueIndice = Math.floor(capacidadBloque / longRegIndice);
    bloquesDato = Math.ceil(numRegistros / regXBloqueDato);
    bloquesIndice = Math.ceil(bloquesDato / regXBloqueIndice);
    _rellenarNoMultinivel(tipo === "Acoplamiento", false);
  }
  else if (tipo === "Secundario") {
    regXBloqueDato = Math.floor(capacidadBloque / longRegDato);
    regXBloqueIndice = Math.floor(capacidadBloque / longRegIndice);
    bloquesDato = Math.ceil(numRegistros / regXBloqueDato);
    bloquesIndice = Math.ceil(numRegistros / regXBloqueIndice);
    _rellenarNoMultinivel(false, true);
  }
  else {
    regXBloqueDato = Math.floor(capacidadBloque / longRegDato);
    regXBloqueIndice = Math.floor(capacidadBloque / longRegIndice);
    bloquesDato = Math.ceil(numRegistros / regXBloqueDato);
    bloquesIndice = Math.ceil(bloquesDato / regXBloqueIndice);
    for (let i = 0; i < numRegistros; i++) {
      estructura.push({
        direccion: _generarDireccionHexadecimal().toString(),
        clave: i + 1,
        valor: "",
      });
    }

    let indice, maxIndice, paso, estructuraIndiceAux;
    maxIndice = numRegistros;
    paso = regXBloqueDato;
    estructuraIndiceAux = estructura;
    while (maxIndice > regXBloqueIndice) {
      indices.push([]);
      indice = indices.length - 1;
      for (let i = 0; i < maxIndice; i += paso) {
        indices[indice].push({
          direccion: _generarDireccionHexadecimal().toString(),
          clave: estructuraIndiceAux[i].clave,
          valor: estructuraIndiceAux[i].direccion
        });
      }
      maxIndice = indices[indices.length - 1].length;
      paso = regXBloqueIndice;
      estructuraIndiceAux = indices[indices.length - 1];
    }

    contenedor.innerHTML = "";
    contenedor.style.overflowX = "auto";

    for (let i = indices.length - 1; i >= 0; i--) {
      const divIndices = document.createElement("div");
      divIndices.style.height = "80vh";
      divIndices.style.width = "400px";
      divIndices.style.border = "2px dashed white";
      divIndices.style.padding = "5px";
      divIndices.style.overflowY = "auto";
      let contenidoIndices = '<div class="contenedor" style="display: flex; flex-direction: row; padding: 0px;"><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">#</b><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Clave</b> <b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Valor</b></div><div style="border: 2px dashed gray;">';
      for (let j = 0; j < indices[i].length; j++) {
        if (j % regXBloqueIndice === 0)
          contenidoIndices += '</div><div style="border: 2px dashed gray;">';
        contenidoIndices += `<div id="${indices[i][j].direccion}" class="contenedor" style="border: dashed; border-color: transparent; border-width: 2px; display: flex; flex-direction: row; padding: 0px;"><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${indices[i][j].direccion}</p><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${indices[i][j].clave}</p> <p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${indices[i][j].valor}</p></div>`;
      }
      contenidoIndices += '</div>';
      divIndices.innerHTML = contenidoIndices;
      contenedor.appendChild(divIndices);
    }

    const divDatos = document.createElement("div");
    divDatos.style.height = "80vh";
    divDatos.style.width = "400px";
    divDatos.style.border = "2px dashed white";
    divDatos.style.padding = "5px";
    divDatos.style.overflowY = "auto";
    let contenidoDatos = '<div class="contenedor" style="display: flex; flex-direction: row; padding: 0px;"><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">#</b><b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Clave</b> <b style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">Valor</b></div><div style="border: 2px dashed gray;">';
    for (let i = 0; i < estructura.length; i++) {
      if (i % regXBloqueDato === 0)
        contenidoDatos += '</div><div style="border: 2px dashed gray;">';
      contenidoDatos += `<div id="${estructura[i].direccion}" class="contenedor" style="border: dashed; border-color: transparent; border-width: 2px; display: flex; flex-direction: row; padding: 0px;"><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${estructura[i].direccion}</p><p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${estructura[i].clave}</p> <p style="flex: 1; width: 33.33%; box-sizing: border-box; margin: 0;">${estructura[i].valor}</p></div>`;
    }
    contenidoDatos += '</div>';
    divDatos.innerHTML = contenidoDatos;
    contenedor.appendChild(divDatos);
  }
});

function _validarClaveYValor(clave, valor) {
  if (!clave || clave === "")
    return "Debe ingresar un valor de clave";
  if (!valor || valor === "")
    return "Debe ingresar un valor de valor";
  if (clave < 1 || clave > numRegistros)
    return "La clave debe ser un valor mayor o igual a 1 y menor a " + numRegistros.toString();
  if (valor.length > 100)
    return "Valor debe tener como máximo 100 caracteres";
  return "";
}

function insertar() {
  if (tipo === "") return;

  const clave = parseInt(document.querySelector("#clave").value);
  const valor = document.querySelector("#valor").value.toString();
  const problema = _validarClaveYValor(clave, valor);
  if (problema !== "") {
    avisos.innerHTML = problema;
    return;
  }
  avisos.innerHTML = "";

  const ubicacion = _obtenerUbicacion(clave) - 1;
  if (verPasos.checked) {
    const segundos = parseFloat(tiempo.value);
    if (segundos < 0.3 || segundos > 5) {
      avisos.innerHTML = "El tiempo debe ser un valor entre 0,3 y 5 (es tiempo en segundos)"
      return;
    }
    _mostrarPasos(ubicacion, segundos * 1000);
  }

  if(estructura[ubicacion].valor === valor){
    avisos.innerHTML = "El elemento ya ha sido ingresado";
    return;
  }
  estructura[ubicacion].valor = valor;
  const valoresHTML = document.getElementById(estructura[ubicacion].direccion);
  const p = valoresHTML.getElementsByTagName("p");
  p[2].textContent = valor;

  //_volverADibujarEstructuras(tipo === "Multinivel", tipo === "Acoplamiento", tipo === "Secundaria");
  avisos.innerHTML = `Elemento insertado:<br>Dirección: ${estructura[ubicacion].direccion}<br>Clave: ${estructura[ubicacion].clave}<br>Valor: ${estructura[ubicacion].valor}`;
}

function buscar() {
  if (tipo === "") return;

  const clave = parseInt(document.querySelector("#clave").value);
  const valor = document.querySelector("#valor").value.toString();
  const problema = _validarClaveYValor(clave, valor);
  if (problema !== "") {
    avisos.innerHTML = problema;
    return;
  }
  avisos.innerHTML = "";

  const ubicacion = _obtenerUbicacion(clave) - 1;
  if (verPasos.checked) {
    const segundos = parseFloat(tiempo.value);
    if (segundos < 0.3 || segundos > 5) {
      avisos.innerHTML = "El tiempo debe ser un valor entre 0,3 y 5 (es tiempo en segundos)"
      return;
    }
    _mostrarPasos(ubicacion, segundos * 1000);
  }
  const elementoBuscado = document.querySelector("#avisos");

  if (estructura[ubicacion].valor === valor) {
    elementoBuscado.innerHTML = `Elemento encontrado:<br>Dirección: ${estructura[ubicacion].direccion}<br>Clave: ${estructura[ubicacion].clave}<br>Valor: ${estructura[ubicacion].valor}`;
  } else {
    elementoBuscado.innerHTML = "Elemento no encontrado";
  }
}

function eliminar() {
  if (tipo === "") return;

  const clave = parseInt(document.querySelector("#clave").value);
  const valor = document.querySelector("#valor").value.toString();
  const problema = _validarClaveYValor(clave, valor);
  if (problema !== "") {
    avisos.innerHTML = problema;
    return;
  }
  avisos.innerHTML = "";

  const ubicacion = _obtenerUbicacion(clave) - 1;
  if (verPasos.checked) {
    const segundos = parseFloat(tiempo.value);
    if (segundos < 0.3 || segundos > 5) {
      avisos.innerHTML = "El tiempo debe ser un valor entre 0,3 y 5 (es tiempo en segundos)"
      return;
    }
    _mostrarPasos(ubicacion, segundos * 1000);
  }
  if(estructura[ubicacion].valor === ""){
    avisos.innerHTML = "No hay nada que eliminar con la clave ingresada";
    return;
  }
  avisos.innerHTML = `Elemento eliminado:<br>Dirección: ${estructura[ubicacion].direccion}<br>Clave: ${estructura[ubicacion].clave}<br>Valor: ${estructura[ubicacion].valor}`;
  estructura[ubicacion].valor = "";

  //_volverADibujarEstructuras(tipo === "Multinivel", tipo === "Acoplamiento", tipo === "Secundaria");
  const valoresHTML = document.getElementById(estructura[ubicacion].direccion);
  const p = valoresHTML.getElementsByTagName("p");
  p[2].textContent = "";
}