# GUÍA DE INSTALACIÓN Y EJECUCIÓN

## 📋 Tabla de Contenidos
1. [Requisitos](#requisitos-del-sistema)
2. [Instalación](#instalación)
3. [Ejecución Local](#ejecución-local)
4. [Troubleshooting](#troubleshooting)

---

## Requisitos del Sistema

### Software
- **Node.js**: v12.0.0 o superior (opcional, solo para http-server)
- **npm**: incluido con Node.js (opcional)
- **Git**: para clonar el proyecto
- **Navegador**: Chrome, Firefox, Safari o Edge

### Navegadores
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Hardware Mínimo
- 512MB RAM
- 50MB espacio en disco
- Procesador: Dual Core 1GHz

### Conexión de Internet
- No requerida para ejecutar localmente
- Requerida para clonar del repositorio

---

## Instalación

### 1. Instalar Node.js y npm

#### Windows
```
1. Visita https://nodejs.org/
2. Descarga versión LTS (recomendado)
3. Ejecuta instalador
4. Sigue pasos por defecto
5. Abre CMD y verifica:
   node --version
   npm --version
```

#### macOS
```bash
# Opción 1: Homebrew (recomendado)
brew install node

# Opción 2: Descargar desde nodejs.org
# Ejecuta instalador

# Verifica
node --version
npm --version
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm

# Verifica
node --version
npm --version
```

### 2. Descargar Proyecto

#### Opción A: Clonar con Git
```bash
git clone https://github.com/LuAvilaB/CienciasComputacionII.git
cd CienciasComputacionII
```

#### Opción B: Descargar ZIP
```
1. Visita https://github.com/LuAvilaB/CienciasComputacionII
2. Haz clic en [Code] → [Download ZIP]
3. Extrae el archivo
4. Abre CMD/Terminal en la carpeta
```

### 3. Instalar Dependencias

```bash
# En la carpeta del proyecto
npm install

# Verifica que se instaló correctamente
npm list

# Deberías ver:
# cienciascomputacionii@1.0.0
# └── cytoscape@3.33.1
```

---

## Configuración Local

### Opción 1: Usar Live Server en VS Code (RECOMENDADO)

```
1. Abre VS Code
2. Abre la carpeta del proyecto
3. Click derecho en public/inicio.html
4. Selecciona "Open with Live Server"
5. Se abrirá http://127.0.0.1:5500
```

**Ventajas**:
- Recarga automática
- Sin línea de comandos
- Muy simple
- Perfecto para desarrollo

### Opción 2: Usar http-server

```bash
# Instalar globalmente
npm install -g http-server

# Ejecutar en la carpeta del proyecto
http-server public

# Abre http://localhost:8080 en navegador
```

**Ventajas**:
- Control total
- Múltiples archivos estáticos
- Configuración avanzada

### Opción 3: Abrir Directamente

```
1. Abre el explorador de archivos
2. Navega a: public/inicio.html
3. Abre con tu navegador web
   (arrastrar sobre navegador o doble clic)
```

**Nota**: Todas las funciones deberían funcionar correctamente.

### Verificar que Funciona

1. Abre public/inicio.html en navegador
2. Verifica que ves dos botones: BÚSQUEDAS y GRAFOS
3. Haz clic en BÚSQUEDAS
4. Deberías ver el menú de búsquedas

---

## Desarrollo Local Avanzado

### Debug con DevTools

```
1. Abre navegador
2. Presiona F12
3. Consola: ve errores JavaScript
4. Network: ve peticiones HTTP
5. Elements: inspecciona HTML/CSS
```

### Monitorear Performance

```
1. DevTools → Performance
2. Registra sesión
3. Interactúa con la app
4. Detén grabación
5. Analiza gráficos de rendimiento
```

---

## Troubleshooting

### Problema: "npm command not found"

**Causa**: Node.js no está instalado o no en PATH

**Solución**:
```bash
# Verifica instalación
node --version

# Si no aparece, reinstala Node.js
# Visita https://nodejs.org/
```

### Problema: "firebase: command not found"

**Causa**: Firebase CLI no está instalado

**Solución**:
```bash
# No necesitas Firebase CLI para ejecución local
# El proyecto corre directamente en navegador

# Si quieres instalar http-server:
npm install -g http-server
```

### Problema: "ERR! Unable to install dependencies"

**Causa**: Problema con permisos o conexión

**Solución**:
```bash
# Opción 1: Limpiar caché
npm cache clean --force

# Opción 2: Reinstalar
rm -rf node_modules package-lock.json
npm install

# Opción 3: Usar sudo (no recomendado)
sudo npm install
```

### Problema: Puerto 5500/8080 ya en uso

**Causa**: Otro proceso usa el puerto

**Solución**:
```bash
# Opción 1: Usar otro puerto
http-server public -p 8081

# Opción 2: Liberar puerto
# Windows
netstat -ano | findstr :8080
taskkill /PID [PID] /F

# macOS/Linux
lsof -i :8080
kill -9 [PID]
```

### Problema: "Cannot find file" en navegador

**Causa**: Ruta incorrecta o archivo no existe

**Solución**:
```
1. Verifica que estés en carpeta correcta
2. Verifica que archivos existan:
   - public/inicio.html
   - estilos/general.css
   - funciones/arreglo.js
3. Verifica rutas relativas en HTML
```

### Problema: "Cytoscape is not defined"

**Causa**: No se cargó cytoscape.js

**Solución**:
```html
<!-- En HTML, agrega ANTES de usar -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.33.1/cytoscape.min.js"></script>

<!-- O desde node_modules si instaló npm -->
<script src="../node_modules/cytoscape/dist/cytoscape.min.js"></script>
```

### Problema: "ERROR: Permission denied" en deploy

**Causa**: No aplicable, el proyecto no usa despliegue

**Solución**:
El proyecto se ejecuta localmente, no requiere despliegue en servidores

### Problema: Cambios no se ven después de desplegar

**Causa**: Caché del navegador

**Solución**:
```
1. Abre DevTools (F12)
2. Click derecho en refresh
3. Selecciona "Empty cache and hard refresh"

O:
1. Ctrl+Shift+Delete (Windows)
2. Cmd+Shift+Delete (Mac)
3. Limpia todo
```

---

## Checklist: Instalación Exitosa

- [ ] Node.js instalado (opcional): `node --version` ✓
- [ ] npm instalado (opcional): `npm --version` ✓
- [ ] Proyecto descargado/clonado
- [ ] public/inicio.html abierto en navegador
- [ ] Ves la página "Ciencias de la Computación II"
- [ ] Puedes hacer clic en BÚSQUEDAS o GRAFOS
- [ ] Módulos funcionan correctamente

---

## Próximos Pasos

1. ✅ Instalación completada
2. 📖 Lee [MANUAL_USUARIO.md](./MANUAL_USUARIO.md)
3. 🎮 Prueba un módulo
4. 🔧 Si quieres modificar, lee [MANUAL_TECNICO.md](./MANUAL_TECNICO.md)
