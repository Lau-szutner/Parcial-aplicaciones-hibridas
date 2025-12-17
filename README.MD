# Aplicaciones Híbridas — Examen Parcial II

## Spend Tracker

**Spend Tracker** es una aplicación full‑stack (MERN) para registrar y gestionar gastos personales y compartidos. Permite a los usuarios **crear, leer, actualizar y eliminar (CRUD)** gastos y compartir gastos con otros usuarios introduciendo su correo electrónico (se muestran en la vista **Gastos compartidos**).

El registro e inicio de sesión generan un token JWT que se guarda en **cookies** para autenticar solicitudes posteriores.

---

## 🚀 Tecnologías

- **Frontend:** React, Vite, Tailwind
- **Backend:** Node.js, Express
- **Base de datos:** MongoDB

---

## ✅ Requisitos previos

- Node.js (recomendado 18.x o superior)
- npm
- MongoDB corriendo localmente o en un servicio (MongoDB Atlas)

---

## 🔧 Configuración y ejecución

1. Instalar dependencias (desde la raíz del proyecto):

```bash
npm run install
```

> Este script ejecuta `install-frontend` y `install-backend` y se encargará de instalar las dependencias del `frontend` y del `backend`.

2. Crear variables de entorno para el backend en `backend/.env` (ejemplo):

```env
MONGODB_URI=mongodb://127.0.0.1:27017/SpendTracker
JWT_SECRET=tu_clave_secreta
PORT=3000
```

3. Iniciar los servicios (en terminales separadas o pestañas):

- Backend:

```bash
npm run start-backend
# -> Servidor en http://127.0.0.1:3000
```

- Frontend:

```bash
npm run start-frontend
# -> Vite en http://127.0.0.1:5173/
```

### Salida esperada

Al arrancar deberías ver mensajes similares a:

```
➞  Local:   http://127.0.0.1:5173/
Servidor corriendo en http://127.0.0.1:3000
Conexión con MongoDB exitosa
```

---

## 🔒 Notas sobre autenticación

- El token se almacena en **cookies**: revisa que las cookies estén configuradas con las opciones de seguridad apropiadas (Secure, SameSite) según el entorno.

---

## ⚠️ Recordatorio (macOS): iniciar MongoDB

Si usas la instalación local en macOS:

```bash
brew services start mongodb-community@7.0
# Para detener:
brew services stop mongodb-community@7.0
```

---

### package.json (raíz)

```json
{
  "name": "app-hibridas-parcial-2",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "install": "npm run install-frontend && npm run install-backend",
    "install-frontend": "cd frontend && npm install",
    "install-backend": "cd backend && npm install",
    "start-frontend": "cd frontend && npm run dev",
    "start-backend": "cd backend && npm run start"
  }
}
```

---

## 🌐 App en línea

- Frontend: https://spend-tracker-frontend-aqyd.onrender.com/
- Backend: https://backend-spendtracker.onrender.com/

> **Nota importante sobre Render:** Si la aplicación está desplegada en Render (especialmente en planes gratuitos), el servicio puede entrar en modo *sleep* cuando no recibe tráfico. La **primera petición** después de un periodo de inactividad puede **tardar varios segundos (o más)** mientras la instancia se inicia. Si necesitas comprobar que el servicio esté activo, abre la URL del backend en el navegador o ejecuta:

```bash
curl -I https://backend-spendtracker.onrender.com/
```

> Esto "despertará" el servicio; ten en cuenta que la respuesta puede tardar y que esto es un comportamiento normal en planes con instancias en reposo.

---

Si querés, puedo dejar una versión más detallada con ejemplos de endpoints o instrucciones para probar con Postman.
