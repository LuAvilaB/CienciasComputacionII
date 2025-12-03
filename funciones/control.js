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
          <input class="i-numero2" value='${valor}' type="text" readonly>
      </div>`;


  inicializarEventos();

  function formatoEnTabla(valor) {
    if (typeof valor == "object") {
      return valor.join(",");
    }
    let str = "0".repeat(digsTam) + valor;
    str = parseInt(str) == valor ? str : valor;
    return str.substring(str.length - digsTam);
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
    htmlElements.collisionMethod = document.querySelector("#collision-method");
    document
      .querySelector("#btn-iniciar-arr")
      .addEventListener("click", eventIniciarEstr);
    document
      .querySelector("#btn-agregar-clave")
      ?.addEventListener("click", eventAgregarClave);
    document
      .querySelector("#btn-eliminar-clave")
      ?.addEventListener("click", eventEliminarClave);
    document
      .querySelector("#btn-agrega-clave-hash")
      ?.addEventListener("click", eventAgregarHash);
    document
      .querySelector("#btn-buscar-clave-hash")
      ?.addEventListener("click", eventBusqHash);
    document
      .querySelector("#btn-buscar")
      ?.addEventListener("click", eventBusqueda);
  }

  function eventIniciarEstr() {
    let n = parseInt(htmlElements.nInput.value);
    let tamClave = parseInt(document.querySelector("#i-tam-clave")?.value || n.toString().length);
    htmlElements.avisos.textContent = "";

    // Validar que se haya seleccionado un método de resolución de colisiones
    if (htmlElements.collisionMethod && !htmlElements.collisionMethod.value) {
      htmlElements.avisos.textContent = "Debe seleccionar un método de resolución de colisiones";
      throw "Debe seleccionar un método de resolución de colisiones";
    }

    if (isNaN(n) || n <= 0) {
      htmlElements.avisos.textContent = "Tamaño de estructura inválido";
      throw "Tamaño de estructura inválido";
    } else if (n > 5000) {
      htmlElements.avisos.textContent = "El tamaño de estructura no puede ser mayor a 5000";
      throw "El tamaño de estructura no puede ser mayor a 5000";
    }
    if (isNaN(tamClave) || tamClave <= 0) {
      htmlElements.avisos.textContent = "Tamaño de clave inválido";
      throw "Tamaño de clave inválido";
    }

    // Leer mem-opt como input hidden con valor directo
    let opt = parseInt(htmlElements.memOpt?.value || 1);
    if (opt == 2) {
      estructura = new Estructura(n, Math.sqrt(n));
    } else {
      estructura = new Estructura(n);
    }

    // Guardar método de resolución de colisiones
    if (htmlElements.collisionMethod) {
      estructura.collisionMethod = htmlElements.collisionMethod.value;
      // Deshabilitar el selector después de crear la estructura
      htmlElements.collisionMethod.disabled = true;
    }

    digsTam = tamClave;
    dibujarArreglo();
  }



  function eventAgregarClave() {
    if (estructura) {
      try {
        let valor = parseInt(htmlElements.inputAddClave.value);
        if (isNaN(valor)) {
          throw "Clave invalida";
        }
        // Validar que la clave cumpla con el tamaño especificado
        let valorStr = valor.toString();
        if (valorStr.length > digsTam) {
          throw `La clave debe tener máximo ${digsTam} dígitos`;
        }

        // Verificar clave repetida
        if (estructura.array.indexOf(valor) != -1) {
          throw 'Clave repetida';
        }

        // Insertar de forma ordenada
        let posicion = 0;
        for (let i = 0; i < estructura.array.length; i++) {
          if (estructura.array[i] !== undefined && estructura.array[i] < valor) {
            posicion = i + 1;
          } else {
            break;
          }
        }

        // Insertar en la posición correcta
        estructura.array.splice(posicion, 0, valor);

        // Redibujar
        dibujarArreglo();
        htmlElements.avisos.textContent = `Clave ${valor} agregada en posición ${posicion + 1}`;
      } catch (e) {
        htmlElements.avisos.textContent = "ERROR: " + e;
      }
    } else {
      htmlElements.avisos.textContent = "ERROR: Primero debe inicializar la estructura";
    }
  }

  function eventEliminarClave() {
    if (estructura) {
      try {
        let elimClave = document.querySelector("#i-ec");
        if (!elimClave) {
          throw "Campo de eliminación no encontrado";
        }

        let valor = parseInt(elimClave.value);
        if (isNaN(valor)) {
          throw "Clave invalida";
        }

        // Buscar la clave en el array
        let indice = estructura.array.indexOf(valor);
        if (indice === -1) {
          throw "Clave no encontrada en la estructura";
        }

        // Eliminar la clave
        estructura.array.splice(indice, 1);

        // Verificar si es memoria externa (tiene bloques)
        let optMem = parseInt(htmlElements.memOpt?.selectedOptions ? htmlElements.memOpt.selectedOptions[0].value : htmlElements.memOpt?.value || 1);

        if (optMem == 2) {
          // Reestructurar: eliminar undefined/null y mantener bloques
          estructura.array = estructura.array.filter((e) => e !== undefined && e !== null);
        }

        // Redibujar
        dibujarArreglo();
        htmlElements.avisos.textContent = `Clave ${valor} eliminada correctamente`;
      } catch (e) {
        htmlElements.avisos.textContent = "ERROR: " + e;
      }
    } else {
      htmlElements.avisos.textContent = "ERROR: Primero debe inicializar la estructura";
    }
  }

  function eventAgregarHash() {
    if (!estructura) {
      htmlElements.avisos.textContent = "ERROR: Primero debe inicializar la estructura";
      return;
    }

    // Leer hash-opt correctamente (puede ser select o input hidden)
    let opt = parseInt(htmlElements.hashOpt?.selectedOptions ? htmlElements.hashOpt.selectedOptions[0].value : htmlElements.hashOpt?.value || 1);
    let clave = parseInt(htmlElements.inputHash.value);

    if (isNaN(clave)) {
      htmlElements.avisos.textContent = "ERROR: Clave inválida";
      return;
    }

    // Validar tamaño de clave
    let claveStr = clave.toString();
    if (claveStr.length > digsTam) {
      htmlElements.avisos.textContent = `ERROR: La clave debe tener máximo ${digsTam} dígitos`;
      return;
    }

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
        htmlElements.avisos.textContent = "ERROR: Función hash no válida";
        return;
    }

    try {
      // Usar el método de resolución de colisiones si está configurado
      let finalHash;
      if (estructura.collisionMethod) {
        finalHash = estructura.insertWithCollisionResolution(hash, clave, null, clave);
      } else {
        estructura.sset(hash, clave);
        finalHash = hash;
      }

      // Redibujar toda la estructura para mostrar correctamente los arreglos anidados y encadenamiento
      dibujarArreglo();
      htmlElements.avisos.textContent = "Clave agregada en el índice: " + (finalHash + 1);
    } catch (e) {
      htmlElements.avisos.textContent = "ERROR: " + e;
    }
  }

  function eventBusqHash() {
    if (!estructura) {
      htmlElements.avisos.textContent = "ERROR: Primero debe inicializar la estructura";
      return;
    }

    // Leer hash-opt correctamente (puede ser select o input hidden)
    let opt = parseInt(htmlElements.hashOpt?.selectedOptions ? htmlElements.hashOpt.selectedOptions[0].value : htmlElements.hashOpt?.value || 1);
    let clave = parseInt(htmlElements.inputHash.value);

    if (isNaN(clave)) {
      htmlElements.avisos.textContent = "ERROR: Clave inválida";
      return;
    }

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
        htmlElements.avisos.textContent = "ERROR: Función hash no válida";
        return;
    }

    // Usar el método de resolución de colisiones si está configurado
    let foundIndex;
    if (estructura.collisionMethod) {
      foundIndex = estructura.searchWithCollisionResolution(hash, clave, null, clave);
      if (foundIndex !== -1) {
        htmlElements.avisos.textContent = "Encontrado en la posición: " + (foundIndex + 1);
      } else {
        htmlElements.avisos.textContent = "No encontrado";
      }
    } else {
      if (
        estructura.array[hash] == undefined ||
        estructura.array[hash] == null
      ) {
        htmlElements.avisos.textContent = "No encontrado";
      } else if (
        estructura.array[hash] == clave ||
        (Array.isArray(estructura.array[hash]) &&
          estructura.array[hash].indexOf(clave) != -1)
      ) {
        htmlElements.avisos.textContent = "Encontrado en la posición: " + (hash + 1);
      } else {
        htmlElements.avisos.textContent = "No encontrado";
      }
    }
  }

  function eventBusqueda() {
    let clave = parseInt(htmlElements.inputBusq.value);
    // Leer opciones correctamente (pueden ser select o input hidden)
    let optBusq = parseInt(htmlElements.busqOpt?.selectedOptions ? htmlElements.busqOpt.selectedOptions[0].value : htmlElements.busqOpt?.value || 1);
    let optMem = parseInt(htmlElements.memOpt?.selectedOptions ? htmlElements.memOpt.selectedOptions[0].value : htmlElements.memOpt?.value || 1);
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
      fila.innerHTML = filaTemplate(i + 1, valor);
      let inputFila = fila.querySelector(".i-numero2");
      inputFila.addEventListener("input", () => {
        actualizarPosArr(i);
      });
      htmlElements.inputsTabla.push(inputFila);
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
