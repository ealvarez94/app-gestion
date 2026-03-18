# Gestion de Renovaciones

Aplicacion fullstack para gestionar renovaciones de clientes, con backend en Node.js + Express + MySQL y frontend en React + Vite.

## Requisitos

- Node.js 18 o superior
- MySQL o MariaDB

## Estructura

```text
.
├── client/                 # Frontend Vite + React
├── server/
│   ├── src/
│   │   ├── config/         # Entorno y base de datos
│   │   ├── middlewares/    # Auth y manejo de errores
│   │   ├── modules/        # auth, renovaciones, estadisticas
│   │   └── shared/         # utilidades comunes
│   ├── init-db.js          # Inicializacion de BD/usuario admin
│   ├── change-password.js  # Cambio de password del admin
│   ├── .env.example        # Plantilla de variables de entorno
│   └── package.json
└── START.sh
```

## Instalacion

### 1. Instalar dependencias

```bash
npm --prefix server install
npm --prefix client install
```

### 2. Configurar el entorno del backend

Crea `server/.env` a partir del ejemplo:

```bash
cp server/.env.example server/.env
```

Variables necesarias:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=renovaciones
DB_PORT=3306
JWT_SECRET=pon_aqui_una_clave_larga_y_segura
PORT=5000
```

### 3. Crear o preparar la base de datos

- Crear una base vacia y luego ejecutar el inicializador:

```bash
cd server
node init-db.js
```

Ese script crea la tabla `usuarios` y, si no existe, el usuario `admin`.

## Desarrollo

Desde la raiz:

```bash
npm run server
npm run client
```

O por separado:

```bash
cd server && npm run dev
cd client && npm run dev
```

## URLs por defecto

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Scripts utiles

Backend:

```bash
cd server
npm run dev
npm start
node init-db.js
node change-password.js
```

Frontend:

```bash
cd client
npm run dev
npm run build
npm run preview
```

## API principal

Autenticacion:

- `POST /auth/login`
- `GET /auth/verify`

Renovaciones:

- `GET /api/renovaciones`
- `GET /api/renovaciones/:id`
- `POST /api/renovaciones`
- `PUT /api/renovaciones/:id`
- `DELETE /api/renovaciones/:id`
- `POST /api/renovaciones/aplicar-ipc`

Estadisticas:

- `GET /api/estadisticas/mes`

## Notas

- El archivo `server/.env` no se sube al repositorio.
- `server/.env.example` sirve como plantilla de configuracion.
- El backend ahora esta modularizado por capas: rutas, controladores, servicios y repositorios.
