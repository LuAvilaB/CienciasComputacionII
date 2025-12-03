# Manual de Usuario - CienciasComputacionII

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Inicio Rápido](#inicio-rápido)
4. [Interfaz Principal](#interfaz-principal)
5. [Módulo de Búsquedas](#módulo-de-búsquedas)
6. [Módulo de Grafos](#módulo-de-grafos)
7. [Guía de Tareas Comunes](#guía-de-tareas-comunes)
8. [Preguntas Frecuentes](#preguntas-frecuentes)
9. [Solución de Problemas](#solución-de-problemas)

---

## Introducción

**CienciasComputacionII** es una plataforma educativa interactiva que te permite aprender y practicar conceptos fundamentales de algoritmia y estructuras de datos:

- **Búsquedas**: Algoritmos para buscar datos eficientemente
- **Funciones Hash**: Distribución de claves en tablas
- **Grafos**: Operaciones y propiedades de grafos
- **Árboles**: Representación de árboles como grafos

La plataforma te permite:
✅ Visualizar paso a paso cómo funcionan los algoritmos  
✅ Interactuar con estructuras de datos en tiempo real  
✅ Experimentar con diferentes parámetros  
✅ Ver resultados gráficos e información detallada  

---

## Requisitos del Sistema

### Navegadores Soportados
- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+

### Requisitos Mínimos
- Conexión a Internet
- Resolución de pantalla mínima: 1024x768
- JavaScript habilitado
- Cookies habilitadas

### Dispositivos
- Desktop/Laptop (recomendado)
- Tablet (compatible)
- Teléfono (interfaz limitada, no recomendado)

---

## Inicio Rápido

### Acceder a la Plataforma

1. Abre el navegador web
2. Abre la carpeta del proyecto
3. Ve a `public/inicio.html`
4. Abre con tu navegador (doble clic o arrastra al navegador)
5. O usa Live Server en VS Code (Click derecho en public/inicio.html → Open with Live Server)
6. Verás la pantalla de inicio con dos módulos principales

### Pantalla de Inicio

```
┌────────────────────────────────────────┐
│    CIENCIAS DE LA COMPUTACIÓN II       │
│          Búsquedas y Grafos            │
│                                        │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │ BÚSQUEDAS   │  │ GRAFOS          │  │
│  │             │  │                 │  │
│  │ Iniciar »   │  │ Iniciar »       │  │
│  └─────────────┘  └─────────────────┘  │
└────────────────────────────────────────┘
```

**Opción 1**: Haz clic en **"BÚSQUEDAS"** para explorar algoritmos de búsqueda  
**Opción 2**: Haz clic en **"GRAFOS"** para trabajar con teoría de grafos  

---

## Interfaz Principal

### Componentes Comunes

#### 1. **Barra de Encabezado**
```
┌─────────────────────────────────────────┐
│  Nombre del Módulo        [← Regresar]  │
└─────────────────────────────────────────┘
```
- Muestra el nombre del módulo actual
- Botón "Regresar" para volver al menú anterior

#### 2. **Panel de Operaciones** (Lado Izquierdo)
```
┌─────────────────────────────────────────┐
│  OPERACIONES                            │
│                                         │
│  Estructura Inicial                     │
│  └─ Entrada 1: [________]               │
│  └─ Entrada 2: [________]               │
│  └─ Botón: [Iniciar]                    │
│                                         │
│  Funcionalidades                        │
│  └─ [Opción 1]                          │
│  └─ [Opción 2]                          │
└─────────────────────────────────────────┘
```

#### 3. **Panel de Resultados** (Lado Derecho)
```
┌─────────────────────────────────────────┐
│  ESTRUCTURA / VISUALIZACIÓN             │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ Tabla de resultados               │  │
│  │ Visualización de datos            │  │
│  │ Gráficos                          │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

#### 4. **Mensajes de Alerta/Error**
- **Rojo**: Errores o datos inválidos
- **Verde**: Operaciones exitosas (en algunos módulos)
- **Amarillo**: Advertencias o información

---

## Módulo de Búsquedas

### Estructura General del Menú de Búsquedas

```
BÚSQUEDAS
├── Búsquedas Internas
│   ├── Búsqueda Secuencial
│   └── Búsqueda Binaria
├── Funciones Hash
│   ├── Hash - Módulo
│   ├── Hash - Cuadrado
│   ├── Hash - Doble
│   ├── Hash - Truncamiento
│   └── Hash - Plegamiento
├── Búsquedas Externas
│   ├── Búsqueda Secuencial
│   ├── Búsqueda Binaria
│   └── Otros tipos
└── Índices
    ├── Primario
    ├── Secundario
    ├── Acoplamiento
    └── Multinivel
```

### 1. Búsquedas Internas

#### Búsqueda Secuencial Interna

**¿Qué es?** Busca elementos uno por uno desde el principio hasta encontrar el buscado o llegar al final.

**Paso 1: Inicializar la Estructura**
```
1. Ingresa "Tamaño de estructura" (ej: 10)
   └─ Número máximo de elementos
   
2. Ingresa "Tamaño de clave" (ej: 3)
   └─ Número de dígitos de tus claves
   
3. Haz clic en [Iniciar]
```

**Resultado esperado:**
- Ves un mensaje "Estructura inicializada"
- Se crea un grid vacío en el panel derecho

**Paso 2: Agregar Claves**
```
1. En "Funcionalidades", ingresa una clave (ej: 123)
2. Selecciona "Interna" o "Externa"
3. Haz clic en [Agregar clave]
```

**Paso 3: Buscar una Clave**
```
1. Ingresa la clave a buscar (ej: 123)
2. Haz clic en [Buscar]
```

**Resultados:**
- ✅ Si la clave existe: muestra "Encontrada en posición X"
- ❌ Si no existe: muestra "No encontrada"

---

#### Búsqueda Binaria Interna

**¿Qué es?** Busca eliminando la mitad de las posibilidades en cada paso. **MÁS RÁPIDA** que secuencial pero requiere datos ordenados.

**Ventaja**: Complejidad O(log n) en lugar de O(n)

**Pasos**: Igual que búsqueda secuencial, pero:
- Tus datos se ordenarán automáticamente
- Es más rápida para estructuras grandes

---

### 2. Funciones Hash

#### ¿Qué es una Función Hash?

Una función que convierte una clave en una posición de almacenamiento.

```
Clave (123) ──[Función Hash]──> Posición (5)
```

#### Hash - Módulo

**Fórmula**: `Posición = (Clave % Tamaño) + 1`

**Ejemplo**:
- Clave: 27, Tamaño: 10
- 27 % 10 = 7, resultado = 8

**Paso 1: Inicializar**
```
1. Tamaño de estructura: 10
2. Haz clic en [Iniciar]
```

**Paso 2: Agregar Claves por Hash**
```
1. Ingresa clave: 25
2. Haz clic en [Agregar]
   └─ Se calcula: 25 % 10 = 5
   └─ Se almacena en posición 6 (1-indexado)
```

**Paso 3: Buscar por Hash**
```
1. Ingresa clave: 25
2. Haz clic en [Buscar]
   └─ Se calcula el hash
   └─ Se busca en esa posición
```

---

#### Hash - Cuadrado Medio

**Fórmula**: 
1. Eleva la clave al cuadrado
2. Extrae los dígitos centrales
3. Aplica módulo

**Ejemplo**:
- Clave: 45
- 45² = 2025
- Dígitos centrales: 02
- Resultado: 2

**Ventaja**: Mejor distribución que módulo

---

#### Hash - Doble

También conocido como "double hashing", es una técnica para resolver colisiones donde se aplican dos funciones hash diferentes. Si la primera posición está ocupada, se calcula un desplazamiento usando la segunda función y se intenta la nueva posición.

**Fórmula general**:
```
pos = (h1(key) + i * h2(key)) % m
```
donde `i` es el intento (0,1,2,...), `m` el tamaño de la tabla, `h1` y `h2` son funciones hash diferentes.

**Ventaja**: Reduce clustering primario y mejora la distribución en comparación con el sondeo lineal.

**Ejemplo**:
- `h1(key) = key % m`
- `h2(key) = 1 + (key % (m-1))`

Si `m = 10` y `key = 25`:
- `h1(25) = 5` → intenta posición 5
- si está ocupada, `h2(25) = 1 + (25 % 9) = 1 + 7 = 8`
- siguiente intento: `(5 + 1*8) % 10 = 3`

En esta plataforma hay una implementación complementaria llamada `hash_doble.html` y utilidades en `funciones/control_hash_doble.js` y `funciones/hashtable.js` para experimentar con doble hashing.


#### Hash - Plegamiento

**Fórmula**: 
1. Divide la clave en partes iguales
2. Suma las partes
3. Aplica módulo

**Ejemplo**:
- Clave: 12345 (partes: 12, 34, 5)
- Suma: 12 + 34 + 5 = 51
- Posición: 51 % 10 = 2

**Ventaja**: Rápido y uniforme

---

#### Hash - Truncamiento

**Fórmula**: Selecciona dígitos específicos de la clave

**Ejemplo**:
- Clave: 123456
- Posiciones a seleccionar: 1, 3, 5
- Dígitos: 1, 3, 5 → 135

---

#### Entendiendo las Colisiones

**¿Qué es una colisión?** Cuando dos claves diferentes generan la misma posición.

**Ejemplo**:
- Hash módulo, tamaño 10
- Clave 15: 15 % 10 = 5 (posición 6)
- Clave 25: 25 % 10 = 5 (posición 6) ⚠️ Colisión

**¿Cómo se maneja?** El sistema crea un array en esa posición:
- Posición 6: [15, 25]

Cuando buscas, revisa todos los elementos del array.

---

### 3. Búsquedas Externas

Similares a búsquedas internas, pero para datos en disco/archivos.

**Diferencias principales:**
- Trabajan con "bloques" de datos
- Optimizadas para lectura de disco
- Más importantes cuando la estructura no cabe en RAM

---

### 4. Expansiones y Reducciones Dinámicas

**¿Para qué sirven?** Ajustar automáticamente el tamaño de la tabla hash.

**Paso 1: Configurar**
```
1. Cubetas: 5 (número inicial de posiciones)
2. Registros: 20 (número máximo de elementos)
3. DO expansión: 0.75 (expandir cuando 75% está lleno)
4. DO reducción: 0.25 (reducir cuando 25% está lleno)
5. Tipo: Parcial o Total
```

**Paso 2: Operaciones**
```
- Agregar elementos
- El sistema expande/reduce automáticamente según densidad
- Observa cómo cambia el tamaño
```

---

### 5. Índices

**¿Qué son?** Estructuras que aceleran búsquedas sin recorrer todos los datos.

**Tipos Disponibles**:

1. **Primario**: Un índice ordenado (más rápido)
2. **Secundario**: Múltiples índices por diferentes campos
3. **Acoplamiento**: Índices relacionados entre tablas
4. **Multinivel**: Índices jerárquicos (como un árbol)

**Pasos**:
```
1. Inicializa: longitud del índice, capacidad por bloque
2. Tipo: selecciona Primario/Secundario/etc
3. Haz clic en [Iniciar estructura]
4. Agrega/busca claves usando funciones hash
5. El sistema mantiene el índice actualizado
```

---

## Módulo de Grafos

### Estructura General del Menú de Grafos

```
GRAFOS
├── Operaciones de Grafos
│   ├── Operaciones con dos grafos
│   │   ├── Unión
│   │   ├── Intersección
│   │   ├── Suma
│   │   ├── Suma Anillo
│   │   ├── Producto Cartesiano
│   │   ├── Producto Tensorial
│   │   └── Composición
│   └── Operaciones con un grafo
│       ├── Grafo Línea
│       ├── Complemento
│       ├── Contracción de Aristas
│       └── Fusión de Vértices
├── Árboles como Grafos
│   └── Árbol Generador Mínimo
├── Representación de Grafos
│   ├── Matriz de Adyacencia
│   ├── Lista de Adyacencia
│   └── Matriz de Incidencia
└── Floyd (Distancias)
    └── Algoritmo de Floyd-Warshall
```

### 1. Operaciones de Grafos

#### Crear un Grafo

**Paso 1: Ingresar Nodos**
```
Nodos (separados por comas): A, B, C, D
```

**Paso 2: Ingresar Aristas**
```
Arista 1: A-B
Arista 2: A-C
Arista 3: B-D
...
```

O usa el formato:
```
A,B B,C A,D
```

**Paso 3: Visualización**
- Se dibuja el grafo automáticamente
- Círculos = nodos
- Líneas = aristas

---

#### Operaciones con Dos Grafos

**Unión**
```
G1 ∪ G2
Nodos: todos los nodos de G1 y G2
Aristas: todas las aristas de G1 y G2
```

**Intersección**
```
G1 ∩ G2
Nodos: nodos que están en ambos grafos
Aristas: aristas que están en ambos grafos
```

**Suma**
```
G1 + G2
Todos los nodos y todas las aristas
+ conexiones entre todos los nodos de G1 con todos de G2
```

**Producto Cartesiano**
```
G1 × G2
Nodos: pares (n1, n2) donde n1 ∈ G1, n2 ∈ G2
```

---

#### Operaciones con Un Grafo

**Grafo Línea**
```
Nodos → Aristas
Aristas → Nodos
Nodos adyacentes en L(G) si comparten vértice en G
```

**Complemento**
```
Aristas que NO están en G, entre los mismos nodos
```

**Contracción de Arista**
```
Elimina una arista y fusiona sus vértices
```

**Fusión de Vértices**
```
Combina dos vértices en uno
```

---

### 2. Árboles como Grafos

**¿Qué es un Árbol Generador?** Un subgrafo que:
- Contiene todos los nodos
- Es conexo
- No tiene ciclos (n nodos, n-1 aristas)

**Paso 1: Crear Grafo**
```
Ingresa nodos y aristas (con pesos si es Mínimo)
```

**Paso 2: Visualización**
```
Se muestra el grafo original
Se muestra el árbol generador encontrado
```

**Paso 3: Propiedades Mostradas**
```
Nodos (n): cantidad de vértices
Aristas (e): cantidad de aristas
Ramas: aristas del árbol generador
Cuerdas: aristas no en el árbol
Rango: n - 1
Nulidad: e - n + 1
```

**Paso 4: Análisis Adicional**
```
- Circuitos: ciclos en el grafo
- Circuitos Fundamentales: ciclos básicos
- Conjuntos de Corte: mínimo de aristas para desconectar
- Cortes Fundamentales: cortes básicos
```

---

### 3. Representación de Grafos

#### Matriz de Adyacencia

**¿Qué es?** Tabla donde (i,j) = 1 si hay arista de i a j

**Ejemplo**:
```
  A B C D
A 0 1 1 0
B 1 0 0 1
C 1 0 0 1
D 0 1 1 0

Significa: A conecta con B y C
          B conecta con A y D
          C conecta con A y D
          D conecta con B y C
```

**Ventajas**: Rápido consultar si existe arista  
**Desventajas**: Usa mucha memoria

---

#### Lista de Adyacencia

**¿Qué es?** Para cada nodo, lista sus vecinos

**Ejemplo**:
```
A: [B, C]
B: [A, D]
C: [A, D]
D: [B, C]
```

**Ventajas**: Usa menos memoria  
**Desventajas**: Más lento buscar arista específica  

---

#### Matriz de Incidencia

**¿Qué es?** Tabla donde (i,j) = 1 si nodo i es incidente a arista j

**Ejemplo**:
```
    e1 e2 e3 e4 e5
A   1  1  0  0  0
B   1  0  1  1  0
C   0  1  0  1  0
D   0  0  1  0  1

Significa: e1 conecta A-B
           e2 conecta A-C
           e3 conecta B-D
           e4 conecta C-D
```

---

### 4. Floyd (Distancias Más Cortas)

**¿Qué es?** Algoritmo que encuentra la distancia más corta entre todos los pares de nodos.

**Paso 1: Crear Grafo Ponderado**
```
Ingresa nodos
Ingresa aristas con pesos (distancias)

Ejemplo:
A-B: 5
B-C: 3
A-C: 10
```

**Paso 2: Ejecutar Floyd**
```
Haz clic en [Calcular Distancias]
```

**Paso 3: Resultados**
```
Matriz de distancias final:
  A  B  C
A 0  5  8
B 5  0  3
C 8  3  0

Significa:
- A a B: 5 (arista directa)
- A a C: 8 (ruta A→B→C es más corta que A→C directa)
- B a C: 3 (arista directa)
```

---

## Guía de Tareas Comunes

### Tarea 1: Encontrar si una Clave Existe

**Escenario**: Tienes 100 números y necesitas buscar uno específico rápidamente.

**Solución Recomendada**: Búsqueda Binaria

```
1. Ve a Búsquedas → Búsquedas Internas → Búsqueda Binaria
2. Inicializa estructura con tamaño 100
3. Agrega tus claves (se ordenarán automáticamente)
4. Busca tu número
5. Resultado: O(log n) comparaciones
```

---

### Tarea 2: Distribuir Claves en una Tabla Hash

**Escenario**: 50 números que quieres distribuir en una tabla de 10 posiciones.

**Solución Recomendada**: Hash Módulo o Cuadrado

```
1. Ve a Búsquedas → Funciones Hash → Hash Módulo
2. Inicializa con tamaño 10
3. Agrega 50 claves
4. El sistema distribuye automáticamente
5. Observa colisiones y cómo se manejan
```

---

### Tarea 3: Visualizar Operación entre Dos Grafos

**Escenario**: Necesitas ver cómo se ve la unión de dos grafos.

**Solución**:
```
1. Ve a Grafos → Operaciones de Grafos
2. Define dos grafos con nodos y aristas
3. Selecciona "Unión"
4. Observa el grafo resultante
```

---

### Tarea 4: Encontrar Árbol Generador Mínimo

**Escenario**: Red de ciudades con distancias, encuentras la red mínima que conecta todas.

**Solución**:
```
1. Ve a Grafos → Árboles como Grafos
2. Ingresa ciudades como nodos
3. Ingresa distancias como pesos
4. Haz clic en "Árbol Generador Mínimo"
5. Observa el árbol resultante (conexiones mínimas)
```

---

### Tarea 5: Calcular Distancia Más Corta

**Escenario**: Rutas entre ciudades con distancias, necesitas la ruta más corta.

**Solución**:
```
1. Ve a Grafos → Floyd
2. Ingresa ciudades y distancias
3. Ejecuta Floyd
4. Consulta matriz resultante
```

---

## Preguntas Frecuentes

### ¿Cuál es la diferencia entre búsqueda secuencial y binaria?

**Búsqueda Secuencial**:
- Revisa elemento por elemento
- O(n) - lenta para datos grandes
- Funciona con datos desordenados
- Ejemplo: Revisar lista uno por uno

**Búsqueda Binaria**:
- Divide por la mitad repetidamente
- O(log n) - muy rápida
- Requiere datos ORDENADOS
- Ejemplo: Adivinar número entre 1 y 1000

**Para 1,000,000 elementos**:
- Secuencial: ~500,000 comparaciones
- Binaria: ~20 comparaciones

---

### ¿Cuándo usar cada función hash?

| Función | Ventaja | Desventaja |
|---------|---------|------------|
| **Módulo** | Muy rápido | Distribución puede ser desigual |
| **Cuadrado** | Mejor distribución | Un poco más lento |
| **Plegamiento** | Uniforme | Requiere dividir |
| **Truncamiento** | Muy rápido | Menos uniforme |

**Recomendación**: Usa **Cuadrado** o **Plegamiento** para mejor rendimiento.

---

### ¿Qué es una colisión en hash?

Cuando dos claves diferentes se asignan a la misma posición.

```
Clave 15 → Posición 5
Clave 25 → Posición 5 (colisión!)
```

**Manejo**: El sistema almacena ambas en un array en esa posición.

---

### ¿Qué es un grafo conexo?

Un grafo donde existe camino entre cualquier par de nodos.

```
Conexo:         No Conexo:
  A─B             A─B
  │ │             
  C─D             C   D
```

---

### ¿Qué es el Árbol Generador Mínimo (MST)?

Para un grafo conexo ponderado, el árbol que:
- Conecta todos los nodos
- Tiene peso total mínimo
- Usa exactamente n-1 aristas

**Aplicación Real**: Diseñar red de carreteras con costo mínimo.

---

### ¿Cómo funciona el Algoritmo de Floyd?

**Idea**: Mejora progresivamente las distancias probando rutas intermedias.

```
Inicialmente: distancia directa entre nodos
Iteración 1: permite pasar por nodo 1
Iteración 2: permite pasar por nodos 1,2
...
Final: distancia más corta considerando todos los nodos
```

**Complejidad**: O(n³)

**Uso**: Redes de routers, sistemas de navegación

---

## Solución de Problemas

### Problema 1: "ERROR: Primero debe inicializar la estructura"

**Causa**: No hiciste clic en [Iniciar]

**Solución**:
```
1. Ingresa los valores requeridos (tamaño, etc)
2. Haz clic en [Iniciar] o [Iniciar estructura]
3. Verifica que aparezca el grid/tabla
4. Luego intenta la operación nuevamente
```

---

### Problema 2: "ERROR: Clave inválida"

**Causa**: Ingresaste texto en lugar de número

**Solución**:
```
Ingresa solo números:
❌ "123abc" → Error
✅ "123" → Correcto
```

---

### Problema 3: No se muestra el grafo

**Causa**: Posibles problemas de formato

**Solución**:
```
1. Verifica que los nodos sean válidos
2. Verifica que las aristas conecten nodos existentes
3. Usa nombres cortos (A, B, C en lugar de "Nodo A")
4. Prueba con un grafo simple primero
```

---

### Problema 4: La búsqueda binaria no funciona

**Causa**: Los datos no están ordenados

**Solución**:
```
Asegúrate de:
1. Agregar números que se ordenen bien (todos números)
2. La búsqueda binaria ordena automáticamente
3. Si no funciona, prueba búsqueda secuencial primero
```

---

### Problema 5: Tabla hash muy llena

**Causa**: Agregate más elementos que posiciones

**Solución**:
```
Opción 1: Aumenta el tamaño inicial
Opción 2: Usa expansión/reducción dinámica
Opción 3: Observa que se crean arrays de colisiones
```

---

### Problema 6: Floyd no calcula distancias

**Causa**: Grafo sin pesos en aristas

**Solución**:
```
Floyd necesita pesos (distancias).
Ingresa aristas con formato: A-B:5
El número después de : es el peso
```

---

## Consejos para Máximo Aprendizaje

### 1. Empieza por lo Básico
```
Búsquedas Secuencial → Binaria → Hash → Índices
```

### 2. Experimenta con Parámetros
```
Prueba:
- Tamaños pequeños (10) vs grandes (1000)
- Claves diferentes
- Diferentes funciones
```

### 3. Observa los Patrones
```
- Cómo se distribuyen con diferentes hash
- Cómo cambia el rendimiento con tamaño
- Dónde ocurren colisiones
```

### 4. Relaciona Teoría con Práctica
```
Lee la teoría → Experimenta en la plataforma
Repite hasta comprender
```

### 5. Usa "Ver Pasos" (si disponible)
```
Activa para ver paso a paso cómo funciona
```

---

## Recursos de Ayuda

### Dentro de la Plataforma
- Botones "Regresar" para volver a menú
- Mensajes de error informativos
- Visualización en tiempo real

### Fuera de la Plataforma
- Conceptos en libros de algoritmos
- Khan Academy
- MIT OpenCourseWare

---

## Estructura de Menú Completa (Mapa de Navegación)

```
INICIO
├── BÚSQUEDAS
│   ├── Búsquedas Internas
│   │   ├── Búsqueda Secuencial Interna
│   │   └── Búsqueda Binaria Interna
│   ├── Funciones Hash
│   │   ├── Hash Módulo
│   │   ├── Hash Cuadrado
│   │   ├── Hash Plegamiento
│   │   └── Hash Truncamiento
│   ├── Búsquedas Externas
│   │   ├── Búsqueda Secuencial Externa
│   │   ├── Búsqueda Binaria Externa
│   │   └── Otros tipos
│   ├── Índices
│   │   ├── Primario
│   │   ├── Secundario
│   │   ├── Acoplamiento
│   │   └── Multinivel
│   └── Expansiones/Reducciones
│
└── GRAFOS
    ├── Operaciones de Grafos
    │   ├── Dos Grafos
    │   │   ├── Unión
    │   │   ├── Intersección
    │   │   ├── Suma
    │   │   ├── Suma Anillo
    │   │   ├── Producto Cartesiano
    │   │   ├── Producto Tensorial
    │   │   └── Composición
    │   └── Un Grafo
    │       ├── Grafo Línea
    │       ├── Complemento
    │       ├── Contracción
    │       └── Fusión
    ├── Árboles como Grafos
    │   ├── Árbol Generador
    │   └── MST
    ├── Representación de Grafos
    │   ├── Matriz Adyacencia
    │   ├── Lista Adyacencia
    │   └── Matriz Incidencia
    └── Floyd (Distancias)
```

---

**Versión del Manual**: 1.0  
**Última Actualización**: Diciembre 2024  
**Soporte**: Para preguntas sobre la plataforma, consulta el manual técnico o los administradores

**¡Que disfrutes aprendiendo algoritmia! 🚀**
