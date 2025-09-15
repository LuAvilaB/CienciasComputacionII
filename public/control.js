function control() {
  let estructura = false;
  let digsTam = false;
  let htmlElements = {};
  let pasosInterval = false;

  let filaHeadTemplate = `<div class="fila head">
        <div class="col-i">i</div>
        <div class="col-k">Clave</div>
    </div>`;
  const filaTemplate = (indice, valor) =>
    `<div class="col-i">${indice}</div>
        <div class="col-k">
            <input class="i-numero2" value='${valor}' type="text">
            <button class="btn-eliminar">Eliminar</button>
        </div>`;

  inicializarEventos();

  function formatoEnTabla(valor) {
    if (typeof valor == "object") {
      return valor.join(",");
    } else {
      let str = "0".repeat(digsTam) + valor;
      str = parseInt(str) == valor ? str : valor;
      return str.substring(str.length - digsTam);
      return valor.toString();
    }
    return valor.toString();
  }

  function inicializarEventos() {
    htmlElements.nInput = document.querySelector("#i-n");
    htmlElements.inputAddClave = document.querySelector("#i-ac");
    htmlElements.memOpt = document.querySelector("#mem-opt");
    htmlElements.tablarArr = document.querySelector("#tabla-arr");
    htmlElements.hashOpt = document.querySelector("#hash-opt");
    htmlElements.inputHash = document.querySelector("#i-ach");
    htmlElements.busqOpt = document.querySelector("#busq-opt");
    htmlElements.inputBusq = document.querySelector("#i-busq");
    htmlElements.checkboxVerPasos = document.querySelector("#cb-verP");
    htmlElements.inputTiempo = document.querySelector("#i-t");
    htmlElements.avisos = document.querySelector("#avisos");
    document
      .querySelector("#btn-iniciar-arr")
      .addEventListener("click", eventIniciarEstr);
    document
      .querySelector("#btn-rellenar")
      .addEventListener("click", eventRellenar);
    document
      .querySelector("#btn-agregar-clave")
      .addEventListener("click", eventAgregarClave);
    document
      .querySelector("#btn-agrega-clave-hash")
      .addEventListener("click", eventAgregarHash);
    document
      .querySelector("#btn-buscar-clave-hash")
      .addEventListener("click", eventBusqHash);
    document
      .querySelector("#btn-buscar")
      .addEventListener("click", eventBusqueda);
  }

  function eventIniciarEstr() {
    let n = parseInt(htmlElements.nInput.value);
    htmlElements.avisos.textContent = "";
    if (n <= 0) {
      htmlElements.avisos.textContent = "Rango invalido";
      throw "Rango invalido";
    } else if (n > 5000) {
      htmlElements.avisos.textContent = "El rango no debe se mayor a 5000";
      throw "El rango no debe se mayor a 5000";
    }
    let opt = parseInt(htmlElements.memOpt.selectedOptions[0].value);
    if (opt == 2) {
      estructura = new Estructura(n, Math.sqrt(n));
    } else {
      estructura = new Estructura(n);
    }
    digsTam = n.toString().length;
    dibujarArreglo();
  }

  function eventRellenar() {
    if (typeof estructura == "object") {
      for (let i = 0; i < estructura.tam; i++) {
        estructura.array[i] = i + 1;
      }
      dibujarArreglo();
    }
  }

  function eventAgregarClave() {
    if (estructura) {
      try {
        let valor = parseInt(htmlElements.inputAddClave.value);
        if (isNaN(valor)) {
          throw "Clave invalida";
        }
        let nvalor = parseInt(valor.toString().substring(digsTam));
        valor = isNaN(nvalor) ? valor : nvalor;
        htmlElements.inputsTabla[estructura.add(valor)].value =
          formatoEnTabla(valor);
      } catch (e) {
        htmlElements.avisos.textContent = "ERROR: " + e;
      }
    }
  }

  function eventAgregarHash() {
    let opt = parseInt(htmlElements.hashOpt.selectedOptions[0].value);
    let clave = parseInt(htmlElements.inputHash.value);
    let hash;
    switch (opt) {
      case 1:
        hash = hashMod(clave, estructura.tam);
        break;
      case 2:
        hash = hashCuadrado(clave, estructura.tam);
        break;
      case 3:
        hash = hashPleg(clave, estructura.tam);
        break;
      case 4:
        let posiciones = [];
        for (let i = 1; i <= digsTam; i += 2) {
          posiciones.push(i);
        }
        hash = hashTruc(clave, posiciones);
        break;

      default:
        break;
    }
    try {
      estructura.sset(hash, clave);
      htmlElements.inputsTabla[hash - 1].value = formatoEnTabla(
        estructura.array[hash - 1]
      );
      htmlElements.avisos.textContent = "Clave agregada en el indice: " + hash;
    } catch (e) {
      htmlElements.avisos.textContent = "ERROR: " + e;
    }
  }

  function eventBusqHash() {
    let opt = parseInt(htmlElements.hashOpt.selectedOptions[0].value);
    let clave = parseInt(htmlElements.inputHash.value);
    let hash;
    switch (opt) {
      case 1:
        hash = hashMod(clave, estructura.tam);
        break;
      case 2:
        hash = hashCuadrado(clave, estructura.tam);
        break;
      case 3:
        hash = hashPleg(clave, estructura.tam);
        break;
      case 4:
        let posiciones = [];
        for (let i = 1; i <= digsTam; i += 2) {
          posiciones.push(i);
        }
        hash = hashTruc(clave, posiciones);
        break;

      default:
        break;
    }
    if (
      estructura.array[hash - 1] == undefined ||
      estructura.array[hash - 1] == null
    ) {
      htmlElements.avisos.textContent = "No encontrado";
    } else if (
      estructura.array[hash - 1] == clave ||
      (Array.isArray(estructura.array[hash - 1]) &&
        estructura.array[hash - 1].indexOf(clave) != -1)
    ) {
      htmlElements.avisos.textContent = "Encontrado en la posicion: " + hash;
    } else {
      htmlElements.avisos.textContent = "No encontrado";
    }
  }

  function eventBusqueda() {
    let clave = parseInt(htmlElements.inputBusq.value);
    let optBusq = parseInt(htmlElements.busqOpt.selectedOptions[0].value);
    let optMem = parseInt(htmlElements.memOpt.selectedOptions[0].value);
    let pasos = htmlElements.checkboxVerPasos.checked;
    let t = parseFloat(htmlElements.inputTiempo.value);
    estructura.array = estructura.array.filter((e) => !!e);
    htmlElements.avisos.textContent = "Buscando..";

    if (isNaN(clave)) {
      htmlElements.avisos.textContent = "Clave a buscar invalida";
      throw "Clave invalida";
    }

    if (pasos) {
      clearInterval(pasosInterval);
      let tiempo = t * 1000;
      let paso = false;
      let filaAnt, fila;
      if (optBusq == 2 || optMem == 2) {
        estructura.array = estructura.array.sort((a, b) => a - b);
      }
      let nivelBloque = optMem == 2;
      pasosInterval = setInterval(() => {
        if (optBusq == 1) {
          paso = paso
            ? paso.next()
            : estructura.busquedaSecuencialG(clave, 0, nivelBloque);
        } else {
          paso = paso ? paso.next() : estructura.busquedaBinariaG(clave, 0);
        }
        nivelBloque = paso.nivelBloque;
        if (paso.completado) {
          if (paso.valor != -1) {
            htmlElements.avisos.textContent =
              "Clave encontrada en la posición: " + paso.valor;
          } else {
            htmlElements.avisos.textContent = "Clave NO encontrada";
          }
          clearInterval(pasosInterval);
        }
        filaAnt = fila;
        fila =
          htmlElements.inputsTabla[paso.valor - 1].parentElement.parentElement;
        fila.classList.add("activa");
        setTimeout(() => fila.classList.remove("activa"), 1000);
        if (filaAnt) {
          filaAnt.classList.remove("activa");
        }
      }, tiempo);
    } else {
      let indice;
      if (optBusq == 1) {
        indice = estructura.busquedaSecuencial(clave);
      } else {
        estructura.array = estructura.array.sort((a, b) => a - b);
        indice = estructura.busquedaBinaria(clave);
      }
      if (indice != -1) {
        htmlElements.avisos.textContent =
          "Clave encontrada en la posición: " + indice;
      } else {
        htmlElements.avisos.textContent = "Clave NO encontrada";
      }
    }
    dibujarArreglo();
  }

  function dibujarArreglo() {
    htmlElements.tablarArr.innerHTML = filaHeadTemplate;
    htmlElements.inputsTabla = [];
    let largoTam = estructura.tam.toString().length;
    let bloqueActual = document.createElement("div");
    bloqueActual.className = "bloque";
    for (let i = 0; i < estructura.tam; i++) {
      let elem = estructura.array[i];
      let valor;
      if (elem == 0 || elem == undefined) {
        valor = "";
      } else {
        valor = formatoEnTabla(elem);
      }
      let fila = document.createElement("div");
      fila.classList.add("fila");
      // fila.innerHTML = filaTemplate(i+1, valor.substring(valor.length-largoTam));
      fila.innerHTML = filaTemplate(i + 1, valor);
      let inputFila = fila.querySelector(".i-numero2");
      inputFila.addEventListener("input", () => {
        actualizarPosArr(i);
      });
      htmlElements.inputsTabla.push(inputFila);
      fila.querySelector(".btn-eliminar").addEventListener("click", () => {
        eliminarPosArr(i);
      });
      if (estructura.tamBloq) {
        bloqueActual.appendChild(fila);
        if (
          (i % estructura.tamBloq == estructura.tamBloq - 1 && i != 0) ||
          i == estructura.tam - 1
        ) {
          htmlElements.tablarArr.appendChild(bloqueActual);
          bloqueActual = document.createElement("div");
          bloqueActual.className = "bloque";
        }
      } else {
        htmlElements.tablarArr.appendChild(fila);
      }
    }
  }

  function actualizarPosArr(ind) {
    let texto = htmlElements.inputsTabla[ind].value;
    let valor;
    let nan = false;
    if (texto.indexOf(",") != -1) {
      valor = texto.split(",").map((x) => {
        let n = parseInt(x);
        if (isNaN(n)) {
          nan = true;
        }
        return n;
      });
    } else {
      valor = parseInt(texto);
    }
    if (nan || (!Array.isArray(valor) && isNaN(valor))) {
      estructura.array[ind] = undefined;
    } else {
      estructura.array[ind] = valor;
    }
  }

  function eliminarPosArr(ind) {
    htmlElements.inputsTabla[ind].value = "";
    estructura.array[ind] = undefined;
  }
}

window.addEventListener("load", () => {
  control();
});
