# 🎨 Gestión de Renovaciones - Cliente

Aplicación React 18 + Vite con autenticación JWT y dashboard interactivo.

## 🌟 Características

- 🔐 **Autenticación JWT** - Login seguro
- 📊 **Dashboard moderno** - Interfaz responsiva
- 🔍 **Búsqueda avanzada** - Por múltiples campos
- 📅 **Filtros por mes/año** - Organización temporal
- 💰 **Cálculo de IPC** - Incrementos de precios
- 📈 **Estadísticas reales** - Total de facturación
- 🎨 **Branding corporativo** - Colores personalizados
- 📱 **Responsive design** - Móvil, tablet, desktop

## 📦 Requisitos

- Node.js v14+
- npm o yarn

## 🚀 Instalación

```bash
cd client
npm install
```

## 🎯 Desarrollo

```bash
npm run dev
```

Abre: **http://localhost:3000**

## 🏗️ Build para Producción

```bash
npm run build
npm run preview
```

## 📁 Estructura de Archivos

```
client/
├── src/
│   ├── App.jsx              # Componente raíz (router)
│   ├── App.css              # Estilos globales
│   ├── Login.jsx            # Página de login
│   ├── Login.css            # Estilos login
│   ├── Dashboard.jsx        # Panel principal
│   ├── Dashboard.css        # Estilos dashboard
│   ├── AuthContext.jsx      # Contexto de autenticación
│   ├── api.js               # Cliente axios configurado
│   ├── main.jsx             # Entry point React
│   ├── index.css            # Estilos base
│   └── assets/
│       ├── logo.png         # Favicon
│       └── logotipo.png     # Logo grande
├── index.html               # HTML principal
├── vite.config.js           # Config Vite
├── package.json             # Dependencias
└── README.md                # Este archivo
```

## 🔐 Autenticación

### AuthContext.jsx
Gestiona el estado de autenticación globalmente:
- `useAuth()` - Hook para acceder a auth
- `login(username, password)` - Inicia sesión
- `logout()` - Cierra sesión
- `isAuthenticated` - Estado de sesión

### api.js
Cliente axios con:
- Interceptores automáticos de token
- Manejo de sesiones expiradas
- Redirección a login si necesario

## 📄 Componentes

### Login.jsx
Página de inicio de sesión:
- Formulario de usuario y contraseña
- Validación de credenciales
- Mensajes de error
- Mostrador de credenciales por defecto

### Dashboard.jsx
Panel principal de la aplicación:
- Tabla de renovaciones
- Búsqueda en tiempo real
- Filtros por mes y año
- Formulario para crear renovaciones
- Selector para aplicar IPC
- Total de facturación
- Botón de logout

## 💬 Uso de la Aplicación

### Login
1. Abre `http://localhost:3000`
2. Ingresa usuario: `admin`
3. Ingresa contraseña: `admin123`
4. Click en "Iniciar Sesión"

### Dashboard
- **Buscar:** Por nombre, empresa, email o teléfono
- **Filtrar:** Selecciona mes y/o año
- **Crear:** Click en "Nueva Renovación" y completa el formulario
- **Aplicar IPC:** Selecciona clientes y aplica porcentaje
- **Eliminar:** Click en 🗑️ para cada renovación
- **Logout:** Click en "Cerrar Sesión" en la esquina superior

## 🎨 Personalización

### Color Corporativo
Cambiar el color #E35554 en:
- `src/Login.css` - Línea con `#E35554`
- `src/Dashboard.css` - Línea con `#E35554`
- `src/App.css` - Variable `--color-primary`

### Logo y Favicon
- Logo pequeño (favicon): `src/assets/logo.png`
- Logo grande: `src/assets/logotipo.png`
- Cambiar en `index.html` si es necesario

### Textos y Traducción
Busca "Gestión de Renovaciones" en:
- `index.html` - Título de página
- `src/Login.jsx` - Título de login
- `src/Dashboard.jsx` - Títulos del dashboard

## 🔌 Integración con API

Todos los datos vienen del servidor en `http://localhost:5000`:

```javascript
// Obtener renovaciones
GET /api/renovaciones
GET /api/renovaciones?search=juan&mes=3

// Crear renovación
POST /api/renovaciones

// Actualizar renovación
PUT /api/renovaciones/:id

// Eliminar renovación
DELETE /api/renovaciones/:id

// Aplicar IPC
POST /api/renovaciones/aplicar-ipc
```

### Manejo de Errores
- ✅ Token inválido → Redirección a login
- ✅ Error de servidor → Mensaje en consola
- ✅ Sin conexión → Mostrar error al usuario

## 📱 Responsive Design

Funciona perfectamente en:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🛠️ Scripts

```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview de la build
npm run preview
```

## 📦 Dependencias

- **react** - Librería UI
- **react-dom** - Rendering
- **axios** - Cliente HTTP
- **vite** - Build tool

## 🔒 Seguridad

- ✅ Token guardado en localStorage
- ✅ Validación en cada petición
- ✅ Sesión expirada = logout automático
- ✅ Variables sensibles en server/.env

## 🐛 Solución de Problemas

### Error: "Módulos no encontrados"
```bash
rm -rf node_modules
npm install
```

### Puerto 3000 en uso
Edita `vite.config.js`:
```javascript
server: {
  port: 3001
}
```

### Imágenes no cargan
Verifica que existan:
- `src/assets/logo.png`
- `src/assets/logotipo.png`

### Login no funciona
- Verifica que el servidor está en http://localhost:5000
- Ejecuta `server/init-db.js`

## 📚 Más Información

- [README Servidor](../server/README.md)
- [CONFIGURACION.md](../CONFIGURACION.md)
- [INICIO_RAPIDO.md](../INICIO_RAPIDO.md)

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Sube la carpeta 'dist' a Netlify
```

## 📄 Licencia

ISC

---

**¿Dudas?** Revisa la documentación del servidor o contacta al equipo.

