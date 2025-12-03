# QUICKSTART - Guía Rápida de CienciasComputacionII

## 🎯 ¿Por dónde empiezo?

### Si eres **ESTUDIANTE**
1. 📖 Lee [MANUAL_USUARIO.md](./MANUAL_USUARIO.md) - **Inicio Rápido** (2 min)
2. 🔍 Elige un módulo que quieras aprender
3. 🎮 Sigue los pasos en la plataforma
4. ❓ Si te atascas, consulta la sección **FAQ**

### Si eres **INSTRUCTOR/PROFESOR**
1. 📚 Lee [README.md](./README.md) - Descripción general
2. 🔧 Lee [MANUAL_TECNICO.md](./MANUAL_TECNICO.md) - Arquitectura
3. 💡 Planifica cómo usarla en tu clase
4. 🚀 Despliega o abre en navegador

### Si eres **DESARROLLADOR**
1. ⚙️ Lee [MANUAL_TECNICO.md](./MANUAL_TECNICO.md) - Sección "Guía de Desarrollo"
2. 📁 Explora la estructura de carpetas
3. 💻 Instala: `npm install`
4. ✏️ Modifica según necesidad
5. 🚀 Despliega (opcional): publica los archivos estáticos en GitHub Pages, Netlify o Vercel

---

## 🔥 Tareas Más Rápidas (1 minuto)

### Abrir la plataforma
```
1. Abre la carpeta del proyecto
2. Ve a: public/inicio.html
3. Abre en tu navegador
   (doble clic o arrastra al navegador)

O usa Live Server en VS Code:
1. Click derecho en public/inicio.html
2. "Open with Live Server"
```

### Probar Búsqueda Binaria
```
1. Haz clic en "BÚSQUEDAS"
2. "Búsquedas Internas" → "Búsqueda Binaria"
3. Tamaño: 10 → [Iniciar]
4. Agrega claves: 5, 15, 25, 35
5. Busca: 25 → [Buscar]
```

### Probar Hash Módulo
```
1. "BÚSQUEDAS" → "Funciones Hash" → "Hash Módulo"
2. Tamaño: 10 → [Iniciar]
3. Clave: 27 → [Agregar]
4. Observa dónde se almacena (posición 8)
```

### Ver Operación con Grafos
```
1. "GRAFOS" → "Operaciones de Grafos"
2. Grafo 1: A, B, C
3. Aristas: A-B, B-C
4. Repite para Grafo 2
5. Operación: Unión → Ver resultado
```

---

## 📚 Manuales Disponibles

| Manual | Para | Duración | Contenido |
|--------|------|----------|-----------|
| [MANUAL_USUARIO.md](./MANUAL_USUARIO.md) | Estudiantes | 30 min | Cómo usar cada módulo, ejemplos, FAQ |
| [MANUAL_TECNICO.md](./MANUAL_TECNICO.md) | Desarrolladores | 1 hora | Arquitectura, APIs, desarrollo |
| [README.md](./README.md) | Todos | 5 min | Descripción general, stack tech |

---

## 🎮 Módulos Disponibles

### BÚSQUEDAS
| Módulo | Qué hace | Tiempo |
|--------|----------|--------|
| **Búsqueda Binaria** | Busca rápido en datos ordenados O(log n) | 5 min |
| **Hash Módulo** | Distribuye claves usando operación módulo | 5 min |
| **Hash Cuadrado** | Mejor distribución | 5 min |
| **Índices** | Acelera búsquedas con índices | 10 min |
| **Expansión/Reducción** | Ajusta dinámicamente tabla hash | 10 min |

### GRAFOS
| Módulo | Qué hace | Tiempo |
|--------|----------|--------|
| **Operaciones de Grafos** | Unión, intersección, suma, etc | 10 min |
| **Árboles como Grafos** | MST, circuitos, propiedades | 15 min |
| **Floyd** | Distancia más corta entre nodos | 10 min |

---

## ❓ Preguntas Rápidas

### P: ¿Cómo agrego una clave?
**R**: En cualquier módulo, ingresa el número en el campo "Clave" y haz clic en [Agregar]

### P: ¿Por qué me sale "ERROR"?
**R**: Lee el mensaje rojo. Generalmente significa:
- No inicializaste la estructura → Haz clic [Iniciar]
- Ingresaste texto en lugar de número → Usa solo números
- Número fuera de rango → Respeta los límites indicados

### P: ¿Cómo busco un elemento?
**R**: Ingresa el valor en "Busca" y haz clic en [Buscar]

### P: ¿Qué es una colisión en hash?
**R**: Cuando dos claves diferentes van a la misma posición. El sistema lo maneja automáticamente.

### P: ¿Necesito internet?
**R**: Sí para acceder online. Para uso offline, descarga los archivos y abre public/inicio.html

---

## 🚀 Despliegue en 3 pasos (opcional)

```bash
# El proyecto corre localmente, no necesita despliegue
# Simplemente abre public/inicio.html en tu navegador

# O usa Live Server:
1. Click derecho en public/inicio.html
2. "Open with Live Server"
3. ¡Listo!
```

---

## 🐛 Si algo no funciona

### Página blanca/en blanco
- Abre consola (F12)
- Verifica que no hay errores rojos
- Revisa ruta del archivo (debe ser relativa: `../estilos/general.css`)

### Grafo no se ve
- Verifica que ingresaste nodos y aristas
- Nodos deben existir antes de crear aristas
- Prueba con nombres cortos (A, B, C)

### Búsqueda no funciona
- ¿Inicializaste la estructura? → [Iniciar]
- ¿Agregaste claves? → [Agregar]
- ¿Esperas mensaje de éxito en rojo/verde?

---

## 💾 Archivos Clave

```
CienciasComputacionII/
├── public/
│   └── inicio.html          ← ABRE ESTO EN EL NAVEGADOR
├── busquedas/
├── grafos/
├── funciones/
├── estilos/
├── MANUAL_USUARIO.md
├── MANUAL_TECNICO.md
└── package.json
```

---

## 🎓 Flujo de Aprendizaje Recomendado

```
1. BÚSQUEDAS INTERNAS (30 min)
   └─ Secuencial → Binaria
   
2. FUNCIONES HASH (45 min)
   └─ Módulo → Cuadrado → Plegamiento → Truncamiento
   
3. ÍNDICES (30 min)
   └─ Primario → Secundario
   
4. GRAFOS BÁSICOS (1 hora)
   └─ Operaciones → Representación
   
5. GRAFOS AVANZADOS (1 hora)
   └─ MST → Floyd
   
TOTAL: ~4 horas para cubrir todo
```

---

## 🔗 Enlaces Útiles

- **Proyecto Local**: Abre public/inicio.html en tu navegador
- **GitHub**: https://github.com/LuAvilaB/CienciasComputacionII
- **Cytoscape.js Docs**: https://js.cytoscape.org/
- **MDN JavaScript**: https://developer.mozilla.org/

---

## 📞 Ayuda Rápida

- **Usuario**: Consulta [MANUAL_USUARIO.md](./MANUAL_USUARIO.md#preguntas-frecuentes) - FAQ
- **Técnico**: Consulta [MANUAL_TECNICO.md](./MANUAL_TECNICO.md#troubleshooting) - Troubleshooting
- **General**: Abre un issue en GitHub

---

## ✅ Checklist: Estoy Listo

- [ ] Leí introducción (2 min)
- [ ] Abrí public/inicio.html en navegador
- [ ] Probé un módulo simple (Búsqueda Binaria o Hash)
- [ ] Entiendo cómo agregar y buscar claves
- [ ] Leí la sección FAQ si tuve dudas
- [ ] Estoy listo para explorar más módulos

---

**¡Que disfrutes aprendiendo! 🚀**

*Última actualización: Diciembre 2024*
