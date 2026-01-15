# Sos.Tecnopc - Web

Landing page profesional para servicios informáticos con CMS integrado.

## 🚀 Características

- **React 18** + **Tailwind CSS** (vía CDN)
- **Panel de administración** con login y edición en tiempo real
- **Backend API** con Node.js para persistencia de datos
- **Fallback a localStorage** cuando la API no está disponible
- **Diseño responsive** optimizado para móviles
- **SEO optimizado** con meta tags y Open Graph

## 📁 Estructura del Proyecto

```
SosTecnopc-WEB/
├── index.html      # Aplicación principal
├── api/
│   ├── config.js   # API endpoint para configuración
│   └── users.js    # API endpoint para usuarios
├── vercel.json     # Configuración de Vercel
└── README.md       # Este archivo
```

## 🖥️ Desarrollo Local

Simplemente abre `index.html` en tu navegador, o usa un servidor local:

```bash
# Con Python 3
python -m http.server 3000

# Con Node.js (npx)
npx serve .
```

## ☁️ Deploy en Vercel

### Opción 1: CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer deploy
vercel
```

### Opción 2: Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub/GitLab/Bitbucket
3. Selecciona la carpeta del proyecto
4. Click en **Deploy**

### Opción 3: Arrastrar y soltar

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Arrastra la carpeta `SosTecnopc-WEB` al área de deploy

## 🔐 Acceso al Panel Admin

- Click en el botón de candado (esquina inferior izquierda)
- **Usuario:** `admin`
- **Contraseña:** `admin`

> ⚠️ **Importante:** Cambia las credenciales después del primer login.

## 📝 Funcionalidades del CMS

- ✅ Edición de textos y títulos
- ✅ Personalización de colores
- ✅ Configuración del logo
- ✅ Gestión de servicios y precios
- ✅ Administración de usuarios
- ✅ Vista previa en tiempo real

## 🛡️ Seguridad

- Headers de seguridad configurados en `vercel.json`
- Los datos se almacenan localmente en el navegador
- Para producción, considera implementar un backend con autenticación real

## 📄 Licencia

© 2026 Sos.Tecnopc - Todos los derechos reservados.
