# Gestión de Renovaciones

Proyecto fullstack para gestionar renovaciones de clientes. Incluye backend (Node.js/Express/MySQL) y frontend (React/Vite).

## Requisitos
- Node.js >= 16
- MySQL o MariaDB

## Instalación

### 1. Clona el repositorio
```
git clone <URL_DEL_REPO>
cd <nombre-del-proyecto>
```

### 2. Instala dependencias
#### Backend
```
cd server
npm install
```
#### Frontend
```
cd ../client
npm install
```

### 3. Crea el archivo `.env` en `server/`
Ejemplo:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mi_base_de_datos
DB_PORT=3306
JWT_SECRET=clave_secreta_segura
PORT=5000
NODE_ENV=development
```

### 4. Inicializa la base de datos limpia
Entra en MySQL y ejecuta:
```
CREATE DATABASE mi_base_de_datos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mi_base_de_datos;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crea usuario admin por defecto
INSERT INTO usuarios (username, password_hash, role) VALUES ('admin', '<hash_de_contraseña>', 'admin');
-- NOTA: Genera el hash con bcrypt para la contraseña deseada
```

### 5. Arranca el backend
```
cd server
npm run dev
```

### 6. Arranca el frontend
```
cd ../client
npm run dev
```

## Notas
- El archivo `.env` está excluido del repo por seguridad.
- Al iniciar la base de datos desde cero, puedes crear el usuario admin manualmente.
- Para producción, cambia el JWT_SECRET y las contraseñas.

## Refactorización y modularización
Próximamente se mejorará la arquitectura y modularidad del proyecto.

---

¿Necesitas ayuda para generar el hash de la contraseña admin? Usa bcrypt en Node.js:
```js
const bcrypt = require('bcryptjs');
bcrypt.hash('admin123', 10).then(console.log);
```

