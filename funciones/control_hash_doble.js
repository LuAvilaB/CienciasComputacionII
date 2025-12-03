function controlHashDoble() {
  let hashTable = null;
  let digsTam = false;
  let htmlElements = {};
  let hashFunctionType = 1; // 1=Mod, 2=Cuadrado, 3=Pleg, 4=Trunc

  let filaHeadTemplate = `<div class="fila head">
        <div class="col-i">i</div>
        <div class="col-k">Clave</div>
    </div>`;
  const filaTemplate = (indice, valor) =>
    `<div class="col-i">${indice}</div>
      <div class="col-k">
          <input class="i-numero2" value='${valor}' type="text" readonly>
      </div>`;

  const metricsTemplate = (metrics) =>
    `<div class="metrics-container">
      <div class="metric-item">
        <strong>Cubetas:</strong> ${metrics.bucketCount}
      </div>
      <div class="metric-item">
        <strong>Elementos:</strong> ${metrics.itemCount}
      </div>
      <div class="metric-item">
        <strong>Densidad de ocupación (α):</strong> ${metrics.occupancyDensity}
      </div>
      <div class="metric-item">
        <strong>Densidad de ordenación:</strong> ${metrics.organizationDensity}
      </div>
    </div>`;

  inicializarEventos();

  function formatoEnTabla(valor) {
    if (typeof valor == "object") {
      return valor.join(",");
    }
    if (valor === undefined || valor === null) {
      return "";
    }
    let str = "0".repeat(digsTam) + valor;
    str = parseInt(str) == valor ? str : valor;
    return str.substring(str.length - digsTam);
  }

  function inicializarEventos() {
    htmlElements.nInput = document.querySelector("#i-n");
    htmlElements.tablarArr = document.querySelector("#tabla-arr");
    htmlElements.hashOpt = document.querySelector("#hash-opt");
    htmlElements.inputHash = document.querySelector("#i-ach");
    htmlElements.avisos = document.querySelector("#avisos");
    htmlElements.metricsDiv = document.querySelector("#metrics");
    
    document
      .querySelector("#btn-iniciar-arr")
      .addEventListener("click", eventIniciarEstr);
    document
      .querySelector("#btn-agrega-clave-hash")
      ?.addEventListener("click", eventAgregarHash);
    document
      .querySelector("#btn-buscar-clave-hash")
      ?.addEventListener("click", eventBusqHash);
    document
      .querySelector("#btn-eliminar-clave-hash")
      ?.addEventListener("click", eventEliminarHash);
  }

  function eventIniciarEstr() {
    let n = parseInt(htmlElements.nInput.value);
    let tamClave = parseInt(
      document.querySelector("#i-tam-clave")?.value || n.toString().length
    );
    
    // Read user-specified thresholds
    let maxLoadFactor = parseFloat(document.querySelector("#i-max-load")?.value || 0.7);
    let minLoadFactor = parseFloat(document.querySelector("#i-min-load")?.value || 0.25);
    let autoReduce = document.querySelector("#cb-auto-reduce")?.checked || false;
    
    htmlElements.avisos.textContent = "";
    
    if (isNaN(n) || n <= 0) {
      htmlElements.avisos.textContent = "Tamaño de estructura inválido";
      throw "Tamaño de estructura inválido";
    } else if (n > 5000) {
      htmlElements.avisos.textContent =
        "El tamaño de estructura no puede ser mayor a 5000";
      throw "El tamaño de estructura no puede ser mayor a 5000";
    }
    if (isNaN(tamClave) || tamClave <= 0) {
      htmlElements.avisos.textContent = "Tamaño de clave inválido";
      throw "Tamaño de clave inválido";
    }
    
    // Validate thresholds
    if (isNaN(maxLoadFactor) || maxLoadFactor <= 0 || maxLoadFactor > 1) {
      htmlElements.avisos.textContent = "Umbral de expansión debe estar entre 0 y 1";
      throw "Umbral de expansión inválido";
    }
    if (isNaN(minLoadFactor) || minLoadFactor < 0 || minLoadFactor >= maxLoadFactor) {
      htmlElements.avisos.textContent = "Umbral de reducción debe ser menor que el de expansión";
      throw "Umbral de reducción inválido";
    }

    // Create hash table with user-specified thresholds
    hashTable = new HashTableWithFunctions(n, hashFunctionType, maxLoadFactor, minLoadFactor, autoReduce);
    digsTam = tamClave;
    
    dibujarArreglo();
    actualizarMetricas();
    
    let mensaje = `Tabla hash inicializada con ${n} cubetas\n`;
    mensaje += `Expansión: α ≥ ${maxLoadFactor.toFixed(2)}, `;
    mensaje += `Reducción: α ≤ ${minLoadFactor.toFixed(2)} ${autoReduce ? '(ACTIVA)' : '(DESACTIVADA)'}`;
    htmlElements.avisos.textContent = mensaje;
  }

  function eventAgregarHash() {
    if (!hashTable) {
      htmlElements.avisos.textContent =
        "ERROR: Primero debe inicializar la estructura";
      return;
    }

    let opt = parseInt(
      htmlElements.hashOpt?.selectedOptions
        ? htmlElements.hashOpt.selectedOptions[0].value
        : htmlElements.hashOpt?.value || 1
    );
    hashFunctionType = opt;
    hashTable.hashFunctionType = opt;

    let clave = parseInt(htmlElements.inputHash.value);

    if (isNaN(clave)) {
      htmlElements.avisos.textContent = "ERROR: Clave inválida";
      return;
    }

    let claveStr = clave.toString();
    if (claveStr.length > digsTam) {
      htmlElements.avisos.textContent = `ERROR: La clave debe tener máximo ${digsTam} dígitos`;
      return;
    }

    try {
      const beforeSize = hashTable.size;
      const result = hashTable.insert(clave);
      const afterSize = hashTable.size;

      dibujarArreglo();
      actualizarMetricas();

      let mensaje = `Clave ${clave} agregada en índice ${result.index + 1}`;
      if (result.wasCollision) {
        mensaje += ` (${result.probes} intentos - colisión resuelta con doble hash)`;
      }
      if (beforeSize !== afterSize) {
        mensaje += `\n¡EXPANSIÓN! Tabla expandida de ${beforeSize} a ${afterSize} cubetas`;
      }
      htmlElements.avisos.textContent = mensaje;
    } catch (e) {
      htmlElements.avisos.textContent = "ERROR: " + e;
    }
  }

  function eventBusqHash() {
    if (!hashTable) {
      htmlElements.avisos.textContent =
        "ERROR: Primero debe inicializar la estructura";
      return;
    }

    let opt = parseInt(
      htmlElements.hashOpt?.selectedOptions
        ? htmlElements.hashOpt.selectedOptions[0].value
        : htmlElements.hashOpt?.value || 1
    );
    hashFunctionType = opt;
    hashTable.hashFunctionType = opt;

    let clave = parseInt(htmlElements.inputHash.value);

    if (isNaN(clave)) {
      htmlElements.avisos.textContent = "ERROR: Clave inválida";
      return;
    }

    const result = hashTable.search(clave);
    if (result.found) {
      htmlElements.avisos.textContent = `Clave ${clave} encontrada en posición ${
        result.index + 1
      } (${result.probes} intentos)`;
    } else {
      htmlElements.avisos.textContent = `Clave ${clave} no encontrada (${result.probes} intentos)`;
    }
  }

  function eventEliminarHash() {
    if (!hashTable) {
      htmlElements.avisos.textContent =
        "ERROR: Primero debe inicializar la estructura";
      return;
    }

    let clave = parseInt(htmlElements.inputHash.value);

    if (isNaN(clave)) {
      htmlElements.avisos.textContent = "ERROR: Clave inválida";
      return;
    }

    try {
      const beforeSize = hashTable.size;
      const index = hashTable.delete(clave);
      const afterSize = hashTable.size;

      dibujarArreglo();
      actualizarMetricas();

      let mensaje = `Clave ${clave} eliminada del índice ${index + 1}`;
      if (beforeSize !== afterSize) {
        mensaje += `\n¡REDUCCIÓN! Tabla reducida de ${beforeSize} a ${afterSize} cubetas`;
      }
      htmlElements.avisos.textContent = mensaje;
    } catch (e) {
      htmlElements.avisos.textContent = "ERROR: " + e;
    }
  }

  function actualizarMetricas() {
    if (!hashTable || !htmlElements.metricsDiv) return;
    
    const metrics = hashTable.getMetrics();
    htmlElements.metricsDiv.innerHTML = metricsTemplate(metrics);
  }

  function dibujarArreglo() {
    if (!hashTable) return;

    htmlElements.tablarArr.innerHTML = filaHeadTemplate;
    htmlElements.inputsTabla = [];

    for (let i = 0; i < hashTable.size; i++) {
      let elem = hashTable.array[i];
      let valor = formatoEnTabla(elem);

      let fila = document.createElement("div");
      fila.classList.add("fila");
      fila.innerHTML = filaTemplate(i, valor);
      let inputFila = fila.querySelector(".i-numero2");
      htmlElements.inputsTabla.push(inputFila);
      htmlElements.tablarArr.appendChild(fila);
    }
  }
}

/**
 * Extended HashTable that supports different hash functions
 */
class HashTableWithFunctions extends HashTable {
  constructor(initialSize, hashFunctionType = 1, maxLoadFactor = 0.7, minLoadFactor = 0.25, autoReduce = false) {
    super(initialSize, maxLoadFactor, minLoadFactor, autoReduce);
    this.hashFunctionType = hashFunctionType;
  }

  /**
   * Override hash1 to use selected hash function
   */
  hash1(key) {
    switch (this.hashFunctionType) {
      case 1:
        return hashMod(key, this.size);
      case 2:
        return hashCuadrado(key, this.size);
      case 3:
        return hashPleg(key, this.size);
      case 4:
        // For truncamiento, use positions 1, 3, 5, etc.
        let posiciones = [];
        let keyStr = key.toString();
        for (let i = 1; i <= keyStr.length; i += 2) {
          posiciones.push(i);
        }
        return hashTruc(key, posiciones);
      default:
        return hashMod(key, this.size);
    }
  }

  /**
   * Override hash2 to use a different variant for double hashing
   */
  hash2(key) {
    // For double hashing, always use modulo with (size - 1) as base
    // to ensure the step size is never 0
    const prime = this.size > 2 ? this.size - 1 : 1;
    return 1 + (key % prime);
  }
}

window.addEventListener("load", () => {
  controlHashDoble();
});
