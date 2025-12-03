# GUÍA DE INSTALACIÓN Y CONFIGURACIÓN

## 📋 Tabla de Contenidos
1. [Requisitos](#requisitos-del-sistema)
2. [Instalación](#instalación)
3. [Configuración Local](#configuración-local)
4. [Despliegue en Firebase](#despliegue-en-firebase)
5. [Troubleshooting](#troubleshooting)

---

## Requisitos del Sistema

### Software
- **Node.js**: v12.0.0 o superior
- **npm**: incluido con Node.js
- **Git**: para control de versiones (opcional)
- **Firebase CLI**: para despliegue

### Navegadores
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Hardware Mínimo
- 512MB RAM
- 100MB espacio en disco
- Procesador: Dual Core 2GHz

### Conexión de Internet
- Recomendado: 5 Mbps
- Mínimo: 1 Mbps

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
1. Instala extensión "Live Server" en VS Code
2. Click derecho en public/inicio.html
3. Selecciona "Open with Live Server"
4. Se abrirá http://127.0.0.1:5500
```

**Ventajas**:
- Recarga automática
- Sin línea de comandos
- Muy simple

### Opción 2: Usar http-server

```bash
# Instalar globalmente
npm install -g http-server

# Ejecutar en la carpeta del proyecto
http-server public

# Abre http://localhost:8080 en navegador
```

### Opción 3: Abrir Directamente

```
1. Abre el explorador de archivos
2. Navega a: public/inicio.html
3. Abre con navegador web
   (arrastrar sobre navegador o doble clic)

Nota: Algunas funciones podrían no funcionar
```

### Verificar que Funciona

1. Abre inicio.html en navegador
2. Verifica que ves dos botones: BÚSQUEDAS y GRAFOS
3. Haz clic en BÚSQUEDAS
4. Deberías ver el menú de búsquedas

---

## Despliegue en Firebase

### 1. Crear Cuenta Firebase

```
1. Visita https://console.firebase.google.com
2. Haz clic en "Agregar Proyecto"
3. Ingresa nombre del proyecto
4. Sigue pasos de configuración
5. Selecciona "Hosting"
```

### 2. Instalar Firebase CLI

```bash
# Windows/macOS/Linux
npm install -g firebase-tools

# Verifica
firebase --version
```

### 3. Inicializar Firebase Localmente

```bash
# En la carpeta del proyecto
firebase login
# Se abrirá navegador para autenticarte

firebase init
# Cuando pregunte:
# ? Are you ready to proceed? Y
# ? Which Firebase features do you want to set up? Hosting
# ? What do you want to use as your public directory? public
# ? Configure as a single-page app? N
# ? Set up automatic builds? N
```

### 4. Actualizar .firebaserc

```bash
# Verificar que firebaserc esté actualizado
cat .firebaserc

# Deberías ver:
{
  "projects": {
    "default": "tu-proyecto-firebase"
  }
}
```

### 5. Desplegar

```bash
firebase deploy

# Esperarás mensaje similar a:
# ✔  Deploy complete!
# Project Console: https://console.firebase.google.com/project/...
# Hosting URL: https://tu-proyecto.firebaseapp.com
```

### 6. Verificar Despliegue

```
1. Abre la URL mostrada en navegador
2. Deberías ver "Ciencias de la Computación II"
3. Prueba un módulo para verificar que funciona
```

---

## Actualizar Despliegue

Cada vez que hagas cambios:

```bash
# Haz cambios en los archivos
# Luego ejecuta:

firebase deploy

# Solo despliega los cambios
```

### Ver Historial de Despliegues

```bash
firebase hosting:channel:list

# Ver detalles
firebase hosting:channel:details nombre-canal
```

---

## Configuración Avanzada

### Habilitar HTTPS (Firebase lo hace automáticamente)
```
Firebase Hosting proporciona certificados SSL gratis
Automáticamente redirige HTTP → HTTPS
```

### Agregar Dominio Personalizado

```bash
1. Ve a Firebase Console
2. Hosting → Dominios
3. Agregar dominio
4. Sigue instrucciones de DNS
5. Espera validación (hasta 24 horas)
```

### Configurar Redirecciones

En `firebase.json`:
```json
{
  "hosting": {
    "redirects": [
      {
        "source": "/antiguo/**",
        "destination": "/nuevo/**",
        "type": 301
      }
    ]
  }
}
```

### Agregar Headers de Seguridad

En `firebase.json`:
```json
{
  "hosting": {
    "headers": [
      {
        "source": "/**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          }
        ]
      }
    ]
  }
}
```

---

## Desarrollo Local Avanzado

### Usar Firebase Emulator (Desarrollo sin desplegar)

```bash
# Instalar emulador
firebase init emulators
? Which emulators? Hosting

# Ejecutar emulador
firebase emulators:start

# Accede a http://localhost:5000
```

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
npm install -g firebase-tools
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

**Causa**: No hay permisos en proyecto Firebase

**Solución**:
```bash
# Verifica credenciales
firebase login:list

# Re-login si necesario
firebase logout
firebase login

# Verifica permisos en Firebase Console
```

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

- [ ] Node.js instalado: `node --version` ✓
- [ ] npm instalado: `npm --version` ✓
- [ ] Proyecto descargado
- [ ] `npm install` completado sin errores
- [ ] Inicio local funciona (ves páginas HTML)
- [ ] Firebase CLI instalado: `firebase --version` ✓
- [ ] Cuente Firebase creada
- [ ] Proyecto inicializado: `firebase init` ✓
- [ ] `firebase deploy` exitoso
- [ ] Proyecto online funciona

---

## Próximos Pasos

1. ✅ Instalación completada
2. 📖 Lee [MANUAL_USUARIO.md](./MANUAL_USUARIO.md)
3. 🎮 Prueba un módulo
4. 🔧 Si quieres modificar, lee [MANUAL_TECNICO.md](./MANUAL_TECNICO.md)

---

**¿Necesitas ayuda? Consulta MANUAL_TECNICO.md sección Troubleshooting**

*Última actualización: Diciembre 2024*
