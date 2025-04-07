# UDB Medicina - Frontend con React y API Directus

Este proyecto es una aplicación frontend hecha en **React**, conectada a una API backend basada en **Directus**. Permite a los usuarios registrarse, iniciar sesión y ver su perfil de usuario con su rol (Médico, Paciente o Administrador).

---

## 🔧 Tecnologías utilizadas

- React + React Router
- Axios + Axios Retry
- Bootstrap 5
- Vite
- Directus (como backend)

---

## 🌐 Enlace a la colección de Postman

Puedes descargar y probar los endpoints de la API con esta colección:

👉 [Abrir colección en Postman](https://udb444.postman.co/workspace/UDB-Workspace~452fc7bf-433f-4d36-89be-21727b2ab874/request/create?requestId=20689664-b462-457a-980b-944c72404acf)

Abre el archivo en Postman para hacer login, registrar usuarios, consultar perfiles, etc.

---

## 🎓 Funcionalidades

### Registro de usuario
- Ruta: `/register`
- Guarda el usuario directamente en Directus.
- El server tarda en levantarse ya que tenemos la versión gratuita y cuando está inactivo se apaga
- Asigna el rol correspondiente (Paciente, Médico o Administrador).

### Inicio de sesión
- Ruta: `/`
- Valida credenciales en el endpoint `/auth/login` de Directus.

### Perfil
- Ruta: `/profile`
- Muestra el nombre y rol del usuario autenticado.
- Usa el endpoint `/users/me` y luego consulta `/roles/:id` para mostrar el nombre real del rol.

---

## 📆 Estructura principal

- `/src/components/Auth/` → `Login.jsx`, `Register.jsx`
- `/src/components/User/` → `Profile.jsx`
- `/src/context/` → `AuthContext.jsx`
- `vite.config.js` → Contiene el proxy `/api` para evitar problemas de CORS

---

## ⚠️ Notas importantes

- Esta app requiere que el backend de Directus esté disponible. Si está hospedado en Render, puede tardar unos segundos en "despertar".
- Asegúrate de usar el `access_token` que devuelve `/auth/login` para autorizar peticiones con Bearer Token.

---

## 🚀 Instrucciones de instalación

```bash
npm install
npm run dev
```

Luego abre en tu navegador:
```
http://localhost:5173
```

---

## 🧳 Autenticación con token

Los tokens se almacenan en `localStorage` y se cargan desde `AuthContext` para toda la app.

```js
localStorage.setItem('token', access_token);
```

---

## 👤 Visualización del perfil

El perfil del usuario se obtiene así:
```bash
GET /api/users/me
```

Y luego se obtiene el nombre del rol con:
```bash
GET /api/roles/:id
