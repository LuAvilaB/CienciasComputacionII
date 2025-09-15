let cubetas = 0;
let registros = 0;
let ampliamineto = 0.0;
let reduccion = 0.0;
let tipo = "";
let estructura;
let ingresos = [];

const avisos = document.querySelector("#avisos");

function obtenerUbicacion(key) {
  const hash = document.querySelector("#hash-opt").value;
  let ubicacion;
  switch (hash.toString()) {
    case "Cuadrado":
      ubicacion = hashCuadrado(key, cubetas);
      break;
    case "Plegamiento":
      ubicacion = hashPleg(key, cubetas);
      break;
    case "Truncamiento":
      let posiciones = [];
      for (let i = 1; i <= key.toString().length; i += 2) posiciones.push(i);
      ubicacion = hashTruc(key, posiciones);
      break;
    default:
      ubicacion = hashMod(key, cubetas);
      break;
  }
  return ubicacion;
}

function obtenerUltimaFila() {
  let regMax = 0;
  estructura.map((cubeta) => {
    if (cubeta.length > regMax) {
      regMax = cubeta.length;
    }
    return cubeta;
  });
  return regMax;
}

function actualizarTabla() {
  const tabla = document.createElement("table");
  let regMax = obtenerUltimaFila();
  for (let i = -1; i < regMax; i++) {
    const fila = document.createElement("tr");
    for (let j = -1; j < cubetas; j++) {
      const celda = document.createElement("td");
      // celda.style.height = "5vh";
      // celda.style.width = "5vh";
      celda.className = "fila celda-exp";
      if (i <= registros - 1) {
        // celda.style.border =
        //   "2px dashed " + (i === -1 || j === -1 ? "purple" : "white");
        celda.style.background =
          (i === -1 || j === -1 ? "purple" : "white");
        if(!(i === -1 || j === -1)){
          celda.style.color = 'black'
        }
      }
      if (i === -1 && j === -1) {
        celda.textContent = "";
      } else if (i === -1) {
        celda.textContent = j;
      } else if (j === -1) {
        celda.textContent = i + 1;
      } else {
        celda.textContent =
          estructura[j][i] != undefined ? estructura[j][i] : "";
      }
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  const tablaAnterior = document.querySelector("#tabla-arr");
  tablaAnterior.innerHTML = "";
  tablaAnterior.appendChild(tabla);
}

function iniciar() {
  cubetas = parseInt(document.querySelector("#cubetas").value);
  if (cubetas < 1 || cubetas > 100) {
    avisos.innerHTML = "Cubetas debe ser un número entre 1 y 100";
    return;
  }
  registros = parseInt(document.querySelector("#reg").value);
  if (registros < 1 || registros > 100) {
    avisos.innerHTML = "Registros debe ser un número entre 1 y 100";
    return;
  }
  ampliamineto = parseFloat(document.querySelector("#porexp").value);
  if (ampliamineto < 0 || ampliamineto > 1) {
    avisos.innerHTML =
      "Densidad de ocupación de expansión debe ser un número entre 0 y 1";
    return;
  }
  reduccion = parseFloat(document.querySelector("#porred").value);
  if (reduccion < 0) {
    avisos.innerHTML =
      "Densidad de ocupación de reducción debe ser un número mayor a 0";
    return;
  }
  tipo = document.querySelector("#hash").value.toString();

  estructura = new Array(cubetas);
  for (let i = 0; i < cubetas; i++) estructura[i] = new Array(registros);

  actualizarTabla();
  rellenarEstructura();
  rectificarDensidadOcupacion();
  avisos.innerHTML = "";
}

function ingresar(key = null, verificando = false) {
  if (!key) {
    key = parseFloat(document.querySelector("#i-ach").value);
    if (key < 0 || key > 1000) {
      avisos.innerHTML = "La clave debe ser un número entre 0 y 1000";
      return;
    }
  }
  if (!ingresos.includes(key) || verificando) {
    if (!verificando) ingresos.push(key);
    const ubicacion = obtenerUbicacion(key);
    let huboColision = true;
    for (let index = 0; index < registros; index++) {
      if (estructura[ubicacion - 1][index] == undefined) {
        estructura[ubicacion - 1][index] = key;
        huboColision = false;
        break;
      }
    }
    if (huboColision) {
      estructura[ubicacion - 1].push(key);
    }
    actualizarTabla();
    if (!verificando) rectificarDensidadOcupacion();
    document.querySelector("#i-ach").focus();
    avisos.innerHTML = "Elemento insertado: " + key.toString();
  } else {
    avisos.innerHTML = "El elemento a insertar ya existe en la estructura.";
  }
}

function eliminar() {
  const key = parseFloat(document.querySelector("#i-ach").value);
  if (key < 0 || key > 1000) {
    avisos.innerHTML = "La clave debe ser un número entre 0 y 1000";
    return;
  }
  const ubicacion = obtenerUbicacion(key);
  let regMax = obtenerUltimaFila();
  for (let index = 0; index < regMax; index++) {
    if (estructura[ubicacion - 1][index] == key) {
      if (index >= registros) estructura[ubicacion - 1].pop();
      else estructura[ubicacion - 1][index] = undefined;
      break;
    }
  }
  if (ingresos.includes(key)) {
    ingresos.splice(ingresos.indexOf(key), 1);
    actualizarTabla();
    rectificarDensidadOcupacion();
    avisos.innerHTML = "Elemento eliminado: " + key.toString();
  } else {
    avisos.innerHTML = "El elemento e eliminar no existe en la estructura.";
  }
}

function buscar() {
  const key = parseFloat(document.querySelector("#i-ach").value);
  if (key < 0 || key > 1000) {
    avisos.innerHTML = "La clave debe ser un número entre 0 y 1000";
    return;
  }
  const ubicacion = obtenerUbicacion(key);
  let elemento;
  const ubicacionEncontrado = [];
  for (let index = 0; index < registros; index++) {
    if (estructura[ubicacion - 1][index] == key) {
      elemento = key;
      ubicacionEncontrado.push(ubicacion);
      ubicacionEncontrado.push(index);
      break;
    }
  }
  if (elemento) {
    avisos.innerHTML =
      "Elemento encontrado: " +
      key.toString() +
      ". En la fila " +
      ubicacionEncontrado[0] +
      " y columna " +
      ubicacionEncontrado[1];
  } else {
    avisos.innerHTML = "Elemento " + key.toString() + " no encontrado";
  }
}

function rellenarEstructura() {
  estructura = new Array(cubetas);
  for (let i = 0; i < cubetas; i++) estructura[i] = new Array(registros);
  for (let j = 0; j < ingresos.length; j++) {
    const element = ingresos[j];
    ingresar(element, true);
  }
}

function rectificarDensidadOcupacion() {
  const numRegsOcup = ingresos.length;
  const disponibles = registros * cubetas;
  if (numRegsOcup / disponibles >= ampliamineto) {
    avisos.innerHTML = "Expansión en curso...";
    setTimeout(() => {
      if (tipo === "Parcial") {
        const auxmitad = parseInt(cubetas / 2);
        cubetas = cubetas + auxmitad;
      } else {
        cubetas = cubetas * 2;
      }
      rellenarEstructura();
      avisos.innerHTML = "Expansión finalizada. \n";
    }, 5000);
  } else if (numRegsOcup / cubetas <= reduccion) {
    avisos.innerHTML = "Reducción en curso...";
    setTimeout(() => {
      const nuevasCubetas =
        tipo === "Parcial" ? parseInt(cubetas * 0.75) : cubetas / 2;
      if (nuevasCubetas <= 1) {
        return;
      }
      cubetas = nuevasCubetas;
      rellenarEstructura();
      avisos.innerHTML = "Reducción finalizada.\n";
    }, 5000);
  }
}
