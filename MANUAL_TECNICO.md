# Manual Técnico - CienciasComputacionII

## Tabla de Contenidos
1. [Descripción General](#descripción-general)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Dependencias](#dependencias)
5. [Configuración](#configuración)
6. [Componentes Principales](#componentes-principales)
7. [Módulos Funcionales](#módulos-funcionales)
8. [APIs y Funciones](#apis-y-funciones)
9. [Flujo de Datos](#flujo-de-datos)
10. [Guía de Desarrollo](#guía-de-desarrollo)
11. [Despliegue](#despliegue)
12. [Troubleshooting](#troubleshooting)

---

## Descripción General

**CienciasComputacionII** es una aplicación web educativa desarrollada para la enseñanza de conceptos fundamentales en Ciencias de la Computación, específicamente enfocada en:

- **Búsquedas**: Búsquedas internas (secuencial, binaria), búsquedas externas, funciones hash, índices y operaciones de expansión/reducción
- **Grafos**: Operaciones con grafos, árboles como grafos, representación de grafos, algoritmo de Floyd y distancias entre nodos

**Stack Tecnológico:**
- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Visualización de Grafos: Cytoscape.js v3.33.1
- Ejecución: Local (navegador)
- Control de Versiones: Git

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura **modular y basada en componentes** con separación clara de responsabilidades:

```
┌─────────────────────────────────────────┐
│      INTERFAZ DE USUARIO (HTML)         │
│  - Formularios interactivos             │
│  - Paneles de visualización             │
│  - Elementos de control                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│   LÓGICA DE NEGOCIO (JavaScript)        │
│  - Algoritmos de búsqueda               │
│  - Operaciones con grafos               │
│  - Funciones hash                       │
│  - Estructuras de datos                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│   VISUALIZACIÓN (CSS + Cytoscape)       │
│  - Estilos generales                    │
│  - Renderizado de grafos                │
│  - Animaciones                          │
└─────────────────────────────────────────┘
```

---

## Estructura de Carpetas

```
CienciasComputacionII/
├── public/                      # Archivos principales (html, contenido)
│   ├── inicio.html             # Página de inicio principal
│   └── 404.html                # Página de error 404
│
├── busquedas/                   # Módulo de búsquedas
│   ├── menu.html               # Menú principal de búsquedas
│   ├── busquedas_internas.html # Búsquedas secuencial/binaria
│   ├── busquedas_externas.html # Búsquedas externas
│   ├── funciones_hash.html     # Menú de funciones hash
│   ├── hash_modulo.html        # Función hash: módulo
│   ├── hash_cuadrado.html      # Función hash: cuadrado medio
│   ├── hash_plegamiento.html   # Función hash: plegamiento
│   ├── hash_truncamiento.html  # Función hash: truncamiento
│   ├── busquedas_binaria_interna.html
│   ├── busquedas_binaria_externa.html
│   ├── busquedas_secuencial_interna.html
│   ├── busquedas_secuencial_externa.html
│   ├── busquedas_externas_otros.html
│   ├── busquedas_internas_otros.html
│   ├── indices_menu.html       # Menú de índices
│   └── index.js                # Funciones comunes de búsquedas
│
├── grafos/                      # Módulo de grafos
│   ├── grafos.html             # Menú principal de grafos
│   ├── operaciones_grafos.html # Operaciones entre grafos
│   ├── operaciones.html        # Operaciones avanzadas
│   ├── operaciones.js          # Lógica de operaciones
│   ├── operaciones1grafo.html  # Operaciones con un grafo
│   ├── operaciones1grafo.js    # Lógica de un grafo
│   ├── arboles_grafos.html     # Árboles como grafos
│   ├── arboles_como_grafos.html # Visualización de árboles
│   ├── arboles_como_grafos.js  # Lógica de árboles
│   ├── representacion_grafo.html # Representación de grafos
│   ├── selectou1o2.html        # Selector entre 1 o 2 grafos
│   └── arboles.html            # Visualización de árboles
│
├── indices/                     # Módulo de índices
│   ├── index.html              # Página principal de índices
│   └── script.js               # Lógica de índices
│
├── dinamica/                    # Módulo de expansiones/reducciones
│   ├── index.html              # Página principal
│   └── script.js               # Lógica de operaciones dinámicas
│
├── distancias/                  # Módulo de algoritmo de Floyd
│   ├── floyd.html              # Página principal
│   └── floyd.js                # Implementación de Floyd
│
├── arboles/                     # Módulo de árboles
│   ├── arboles.html            # Página principal
│   └── arbolscript.js          # Lógica de árboles
│
├── funciones/                   # Funciones reutilizables
│   ├── arreglo.js              # Clase Estructura (arrays)
│   ├── hash.js                 # Funciones hash
│   ├── control.js              # Controlador de eventos
│   └── [otras funciones]
│
├── estilos/                     # Estilos CSS
│   └── general.css             # Hoja de estilos global
│
├── firebase.json               # Configuración (no se utiliza)
├── package.json                # Dependencias del proyecto
├── package-lock.json           # Lock file de dependencias
├── README.md                   # Documentación base
└── .firebaserc                 # Configuración (no se utiliza)
```

---

## Dependencias

### package.json
```json
{
  "dependencies": {
    "cytoscape": "^3.33.1"
  }
}
```

### Dependencias Externas (CDN)
```html
<!-- Normalize CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">

<!-- Cytoscape.js (usado implícitamente en algunos módulos) -->
<!-- Disponible en node_modules después de npm install -->
```

### Instalación de Dependencias
```bash
npm install
```

---

## Configuración

### Firebase Configuration (firebase.json)
```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

**Detalles:**
- **public**: Carpeta que será servida por Firebase Hosting
- **ignore**: Archivos/carpetas que no se subirán al hosting

### Despliegue
```bash
# Login a Firebase
firebase login

# Desplegar
firebase deploy
```

---

## Componentes Principales

### 1. Clase `Estructura` (arreglo.js)

**Responsabilidad**: Gestionar arrays de búsqueda y almacenamiento.

**Métodos Principales**:

```javascript
class Estructura {
  constructor(tam, externo=false, arr=[])
  // tam: tamaño de la estructura
  // externo: indica si es búsqueda externa
  // arr: array inicial
  
  sset(ind, elem)          // Set con colisión (para hash)
  set(ind, elem)           // Set normal
  add(elem)                // Agregar elemento
  get(ind)                 // Obtener elemento
  busquedaSecuencial(elem) // Búsqueda secuencial
  busquedaBinaria(elem)    // Búsqueda binaria
}
```

### 2. Funciones Hash (hash.js)

**Responsabilidad**: Implementar diferentes funciones hash para distribución de claves.

**Funciones**:

```javascript
hashMod(key, n)              // Hash módulo: key % n + 1
hashCuadrado(key, n)         // Hash cuadrado medio
hashPleg(key, n)             // Hash plegamiento
hashTruc(key, posiciones)    // Hash truncamiento
```

**Ejemplo - Hash Módulo**:
```javascript
function hashMod(key, n) {
  return key % n + 1;  // Retorna valor 1-indexado
}
```

### 3. Controlador de Eventos (control.js)

**Responsabilidad**: Gestionar interacciones del usuario y validar entrada de datos.

**Estructura**:
```javascript
function control() {
  // Obtiene referencias a elementos del DOM
  // Configura listeners de eventos
  // Ejecuta lógica según la acción del usuario
}
```

---

## Módulos Funcionales

### Módulo 1: Búsquedas

#### 1.1 Búsquedas Internas

**Búsqueda Secuencial Interna**
- Implementa búsqueda lineal O(n)
- Funciona con arrays desordenados
- Archivo: `busquedas_secuencial_interna.html`

**Búsqueda Binaria Interna**
- Implementa búsqueda binaria O(log n)
- Requiere array ordenado
- Archivo: `busquedas_binaria_interna.html`

#### 1.2 Búsquedas Externas

- Búsqueda secuencial externa
- Búsqueda binaria externa
- Búsqueda por bloques
- Útiles para datos en disco

#### 1.3 Funciones Hash

**Módulo (hash_modulo.html)**
```javascript
// key % n + 1
Distribución simple mediante operación módulo
```

**Cuadrado Medio (hash_cuadrado.html)**
```javascript
// Eleva key al cuadrado y extrae dígitos centrales
Mejor distribución que módulo
```

**Plegamiento (hash_plegamiento.html)**
```javascript
// Divide la clave en partes y suma
Útil para claves con patrones
```

**Truncamiento (hash_truncamiento.html)**
```javascript
// Selecciona dígitos específicos
Rápido pero menos uniforme
```

#### 1.4 Índices

**Tipos Soportados**:
- Primario: Un solo índice ordenado
- Secundario: Múltiples índices
- Acoplamiento: Índices relacionados
- Multinivel: Índices jerárquicos

#### 1.5 Expansiones y Reducciones

**Dinámico (dinamica/index.html)**
- Expansión: Aumenta número de cubetas cuando densidad > umbral
- Reducción: Disminuye cubetas cuando densidad < umbral
- Configurables: DO expansión, DO reducción

---

### Módulo 2: Grafos

#### 2.1 Operaciones de Grafos

**Operaciones entre dos grafos**:
- Unión
- Intersección
- Suma
- Suma anillo
- Producto cartesiano
- Producto tensorial
- Composición

**Operaciones con un grafo**:
- Grafo línea
- Complemento
- Contracción de aristas
- Fusión de vértices

#### 2.2 Árboles como Grafos

**Funcionalidades**:
- Crear árboles generadores
- Calcular Árbol Generador Mínimo (MST)
- Visualizar circuitos
- Circuitos fundamentales
- Conjuntos de corte
- Cortes fundamentales

#### 2.3 Representación de Grafos

**Formatos Soportados**:
- Matriz de adyacencia
- Lista de adyacencia
- Matriz de incidencia

#### 2.4 Distancias (Floyd)

**Algoritmo de Floyd-Warshall**
```
Calcula distancias más cortas entre todos los pares de nodos
Complejidad: O(n³)
```

---

## APIs y Funciones

### API de Búsqueda

#### Inicializar Estructura
```javascript
let estructura = new Estructura(tamaño, esExterno);
```

#### Agregar Elemento
```javascript
estructura.add(elemento); // Retorna índice
// o
estructura.sset(posicion, elemento); // Para hash (permite colisiones)
```

#### Buscar Elemento
```javascript
let resultado = estructura.busquedaSecuencial(elemento);
// Retorna: posición (1-indexado) o -1 si no existe

let resultado = estructura.busquedaBinaria(elemento);
// Retorna: posición (1-indexado) o -1 si no existe
```

### API de Hash

#### Calcular Hash
```javascript
let indice = hashMod(clave, tamanoTabla);
let indice = hashCuadrado(clave, tamanoTabla);
let indice = hashPleg(clave, tamanoTabla);
let indice = hashTruc(clave, posiciones); // posiciones es array [1,3,5]
```

#### Manejo de Colisiones
```javascript
estructura.sset(indiceHash, nuevoElemento);
// Si ya existe un elemento en esa posición, crea un array
```

### API de Grafos

#### Crear Grafo
```javascript
// Usando Cytoscape
const cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [],
  style: [...]
});
```

#### Agregar Nodos y Aristas
```javascript
cy.add({ data: { id: 'n1', label: 'Nodo 1' } });
cy.add({ data: { id: 'a1', source: 'n1', target: 'n2' } });
```

#### Operaciones de Grafos
```javascript
// Implementadas en operaciones.js
unirGrafos(g1, g2);
intersectarGrafos(g1, g2);
sumaGrafos(g1, g2);
// etc.
```

---

## Flujo de Datos

### Flujo Típico: Búsqueda

```
1. Usuario ingresa parámetros (tamaño, tipo de búsqueda)
   └─> Validación en JavaScript
   
2. Se inicializa Estructura
   └─> Se crea array de tamaño n
   
3. Usuario agrega claves
   └─> Se valida duplicados
   └─> Se calcula hash si aplica
   └─> Se almacena en estructura
   
4. Usuario busca clave
   └─> Se ejecuta algoritmo de búsqueda
   └─> Se muestra resultado en tabla visual
   └─> Se muestran pasos (si está activo)
```

### Flujo Típico: Operación con Grafos

```
1. Usuario crea/carga grafos
   └─> Se validan nodos y aristas
   
2. Usuario selecciona operación
   └─> Se procesan datos según operación
   └─> Se calcula resultado
   
3. Se renderiza resultado con Cytoscape
   └─> Se aplican estilos CSS
   └─> Se actualiza visualización
```

---

## Guía de Desarrollo

### Agregar un Nuevo Módulo de Búsqueda

1. **Crear archivo HTML** en `busquedas/`:
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="../estilos/general.css">
</head>
<body>
    <div class="cabecera">
        <h1>Nuevo Módulo</h1>
        <button><a href="menu.html">Regresar</a></button>
    </div>
    <div class="divisor">
        <div class="divisor-elem" style="flex: 30%;"></div>
        <div class="divisor-elem" style="flex: 70%;"></div>
    </div>
    <script src="../funciones/arreglo.js"></script>
    <script src="../funciones/control.js"></script>
</body>
</html>
```

2. **Agregar entrada al menú** en `busquedas/menu.html`:
```html
<div class="divisor-card">
    <h2>Mi Nuevo Módulo</h2>
    <button><a href='nuevo_modulo.html'>Iniciar</a></button>
</div>
```

3. **Implementar lógica** en archivo JS correspondiente

### Agregar Nueva Función Hash

1. **Implementar en `funciones/hash.js`**:
```javascript
function miHash(key, n) {
    // Implementar lógica
    return resultado;
}
```

2. **Agregar opción en select HTML**:
```html
<select id="hash-opt">
    <option value="1">Modulo</option>
    <option value="5">Mi Hash</option>
</select>
```

3. **Manejar en `funciones/control.js`**:
```javascript
case 5:
    hash = miHash(clave, estructura.tam);
    break;
```

### Buenas Prácticas

1. **Validación de Entrada**:
```javascript
if (isNaN(valor) || valor < 1) {
    document.getElementById('avisos').textContent = "ERROR: Ingrese un número válido";
    return;
}
```

2. **Manejo de Errores**:
```javascript
try {
    estructura.add(elemento);
} catch (error) {
    document.getElementById('avisos').textContent = "ERROR: " + error;
}
```

3. **Actualización Visual**:
```javascript
// Limpiar
document.getElementById('tabla').innerHTML = '';

// Actualizar con nuevos datos
element.innerHTML += `<div>${contenido}</div>`;
```

---

## Despliegue

El proyecto se ejecuta localmente en el navegador. No requiere despliegue en servidores.

### Ejecución Local

```bash
# Opción 1: Live Server en VS Code (RECOMENDADO)
# Click derecho en public/inicio.html → Open with Live Server

# Opción 2: http-server
npm install -g http-server
http-server public
# Abre http://localhost:8080

# Opción 3: Navegador directo
# Abre public/inicio.html en tu navegador
```

### Distribución

Para compartir con otros:
1. Comparte la carpeta del proyecto
2. O comparte el repositorio Git
3. Ellos clonan/descargan
4. Abren public/inicio.html en navegador

---

## Troubleshooting

### Problema: "No se carga la hoja de estilos"

**Solución**: Verificar ruta relativa en `<link rel="stylesheet">`:
```html
<!-- Incorrecto si estás en busquedas/archivo.html -->
<link rel="stylesheet" href="estilos/general.css">

<!-- Correcto -->
<link rel="stylesheet" href="../estilos/general.css">
```

### Problema: "Función hash no definida"

**Solución**: Verificar que el script está incluido antes de usarlo:
```html
<script src="../funciones/arreglo.js"></script>
<script src="../funciones/hash.js"></script>
<script src="../funciones/control.js"></script>
<script src="miScript.js"></script>  <!-- Último -->
```

### Problema: "Cytoscape no renderiza grafo"

**Solución**: Verificar:
1. Elemento contenedor existe en HTML: `<div id="cy"></div>`
2. Contenedor tiene altura/ancho CSS: `height: 500px; width: 100%;`
3. Cytoscape se inicializa después del DOM: En evento `load` o al final del HTML

```javascript
const cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [...],
  style: [...],
  layout: { name: 'grid' }
});
```

### Problema: "Array out of bounds"

**Solución**: Recordar que la clase `Estructura` usa índices 1-basados:
```javascript
// Correcto
estructura.get(1); // Primer elemento
estructura.sset(1, valor);

// Incorrecto
estructura.get(0); // Causará error
```

### Problema: "Hash genera índices fuera de rango"

**Solución**: Todas las funciones hash retornan valores 1-indexados:
```javascript
hashMod(key, n)  // Retorna 1 a n, nunca 0
```

---

## Recursos Adicionales

- **Cytoscape.js Documentation**: https://js.cytoscape.org/
- **MDN JavaScript Reference**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

**Versión del Manual**: 1.0  
**Última Actualización**: Diciembre 2024  
**Mantenedor**: Equipo de Desarrollo CienciasComputacionII
