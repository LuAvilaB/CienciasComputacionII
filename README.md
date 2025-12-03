# CienciasComputacionII - Plataforma Educativa

## 📚 Descripción General

**CienciasComputacionII** es una plataforma educativa interactiva para aprender y practicar conceptos fundamentales de Algoritmia y Estructuras de Datos.

### 🎯 Módulos Principales

- **Búsquedas**: Algoritmos de búsqueda interna/externa, funciones hash y índices
- **Grafos**: Operaciones con grafos, árboles, representación y algoritmo de Floyd

---

## 📖 Documentación

### Para Usuarios
👉 **[MANUAL_USUARIO.md](./MANUAL_USUARIO.md)**
- Guía paso a paso de todas las funcionalidades
- Ejemplos interactivos
- Tareas comunes
- FAQ y solución de problemas

### Para Desarrolladores
👉 **[MANUAL_TECNICO.md](./MANUAL_TECNICO.md)**
- Arquitectura del proyecto
- Estructura de carpetas
- APIs y funciones
- Guía de desarrollo
- Despliegue y troubleshooting técnico

---

## 🚀 Inicio Rápido

### Desarrollo Local
```bash
# Clonar repositorio
git clone <url>

# Instalar dependencias
npm install

# Usar Live Server en VS Code
# O abrir public/inicio.html en navegador
```

---

## 🛠 Stack Tecnológico

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Visualización**: Cytoscape.js v3.33.1
- **Control de Versiones**: Git

---

## 📁 Estructura del Proyecto

```
CienciasComputacionII/
├── public/              # Raíz del servidor (Firebase)
├── busquedas/           # Módulo de búsquedas
├── grafos/              # Módulo de grafos
├── indices/             # Índices
├── dinamica/            # Expansiones/Reducciones
├── distancias/          # Floyd
├── arboles/             # Árboles
├── funciones/           # Funciones reutilizables
├── estilos/             # CSS global
├── MANUAL_TECNICO.md    # Documentación técnica
├── MANUAL_USUARIO.md    # Manual de usuario
└── firebase.json        # Configuración Firebase
```

---

## 📝 Contenidos por Módulo

### Búsquedas
- ✅ Búsqueda Secuencial (Interna/Externa)
- ✅ Búsqueda Binaria (Interna/Externa)
- ✅ Hash Módulo
- ✅ Hash Cuadrado Medio
- ✅ Hash Plegamiento
- ✅ Hash Truncamiento
- ✅ Índices (Primario, Secundario, Acoplamiento, Multinivel)
- ✅ Expansiones y Reducciones Dinámicas

### Grafos
- ✅ Operaciones entre dos grafos (Unión, Intersección, Suma, etc)
- ✅ Operaciones con un grafo (Complemento, Contracción, Fusión)
- ✅ Árboles como grafos
- ✅ Árbol Generador Mínimo (MST)
- ✅ Representación (Matriz, Lista, Incidencia)
- ✅ Algoritmo de Floyd (Distancias más cortas)

---

## 🎓 Cómo Usar

### Para Estudiantes
1. Abre [MANUAL_USUARIO.md](./MANUAL_USUARIO.md)
2. Elige un módulo (Búsquedas o Grafos)
3. Sigue la guía paso a paso
4. Experimenta con diferentes parámetros
5. Consulta FAQ si tienes dudas

### Para Instructores
1. Consulta [MANUAL_TECNICO.md](./MANUAL_TECNICO.md) para entender la arquitectura
2. Usa como herramienta didáctica en clases
3. Personaliza según necesidades educativas

### Para Desarrolladores
1. Lee [MANUAL_TECNICO.md](./MANUAL_TECNICO.md) sección "Guía de Desarrollo"
2. Instala dependencias: `npm install`
3. Modifica según necesidad
4. Despliega con `firebase deploy`

---

## 🔧 Configuración

### Prerequisites
- Node.js 12+
- npm o yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Instalación
```bash
npm install
```

### Desarrollo
```bash
# Usar Live Server en VS Code o
npm install -g http-server
http-server public
```

### Despliegue
```bash
firebase login
firebase deploy
```

---

## 📚 Conceptos Cubiertos

### Búsquedas
- Complejidad computacional O(n), O(log n)
- Búsqueda lineal vs binaria
- Tablas hash y funciones de distribución
- Manejo de colisiones
- Índices para optimización
- Expansión/reducción dinámica

### Grafos
- Teoría de grafos básica
- Operaciones entre grafos
- Árboles como grafos especiales
- Grafos conexos y componentes
- Árboles generadores
- Algoritmo de Floyd-Warshall
- Representación de grafos

---

## 🤝 Contribuciones

Para contribuir:
1. Fork del repositorio
2. Crea rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m "Descripción"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Pull Request

---

## 📞 Soporte

### Dudas sobre Uso
👉 Revisa [MANUAL_USUARIO.md](./MANUAL_USUARIO.md) sección FAQ

### Dudas Técnicas
👉 Revisa [MANUAL_TECNICO.md](./MANUAL_TECNICO.md) sección Troubleshooting

### Reportar Bugs
Crea un issue en el repositorio describiendo:
- Qué esperabas
- Qué sucedió
- Pasos para reproducir
- Navegador y OS

---

## 📋 Checklist para Nuevas Características

- [ ] Código funcional
- [ ] Comentarios explicativos
- [ ] Sin errores en consola
- [ ] Estilos CSS consistentes
- [ ] Responsivo (mobile friendly)
- [ ] Documentación actualizada
- [ ] Pruebas manuales completadas

---

## 📄 Licencia

Este proyecto es educativo y está disponible bajo licencia MIT.

---

## 👥 Autores

Desarrollado por: Lucia Avila Bermudez y Juan Contreras
Universidad Distrital

---

## 📅 Historial de Versiones

**v1.0** (Diciembre 2024)
- Manuales técnico y de usuario completos
- Documentación de todos los módulos
- Ejemplos y casos de uso

---

**Para más información, consulta los manuales incluidos en el proyecto.**
