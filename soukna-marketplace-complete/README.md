# Soukna Marketplace — proyecto completo (Cloudinary)

Marketplace responsive y multilingüe construido con HTML, CSS y JavaScript, Firebase Authentication, Cloud Firestore y Cloudinary para las fotografías. No utiliza Cloudflare R2 ni un servidor propio.

## Funciones incluidas

- Interfaz adaptable a ordenador y móvil.
- Idiomas: español, francés, inglés y árabe (con dirección RTL para árabe).
- Registro e inicio de sesión con correo y contraseña mediante Firebase Authentication.
- Publicación de anuncios con título, precio, moneda EUR/MAD, categoría, ubicación, descripción, WhatsApp y hasta 5 fotos.
- Subida directa de imágenes a Cloudinary mediante un Upload Preset unsigned.
- Visor de fotografías integrado: al pulsar una foto se amplía encima de Soukna; se cierra con ×, clic fuera o tecla Escape. No abre otra pestaña.
- Búsqueda y filtro por categoría.
- Contacto con el vendedor por WhatsApp.
- Área del usuario para consultar, editar y borrar exclusivamente sus propios anuncios.
- Panel de administración para moderar anuncios, gestionar denuncias y suspender/activar perfiles.
- Reglas de Firestore para restringir las operaciones por propietario y administrador.

## Estructura

```text
soukna-marketplace-complete/
├── index.html
├── README.md
├── firebase.json
├── firestore.rules
├── .gitignore
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── translations.js
    └── firebase-config.js
```

## 1. Abrir en VS Code

1. Descarga y descomprime el ZIP.
2. En VS Code selecciona **File > Open Folder** y abre `soukna-marketplace-complete`.
3. Instala la extensión **Live Server** si no la tienes.
4. Pulsa con el botón derecho sobre `index.html` y elige **Open with Live Server**. También puedes ejecutar `python -m http.server 8000` desde la carpeta y abrir `http://localhost:8000`.

No abras `index.html` directamente como `file://`, porque el proyecto usa módulos JavaScript.

## 2. Firebase

El archivo `js/firebase-config.js` contiene la configuración Firebase que estaba preparada para Soukna. Si vas a utilizar otro proyecto Firebase, sustituye esos valores por los de tu aplicación web.

En Firebase Console:

1. Abre **Authentication > Sign-in method** y activa **Email/Password**.
2. Crea una base de datos en **Firestore Database**.
3. En **Firestore > Rules**, pega el contenido de `firestore.rules` y pulsa **Publish**.
4. Comprueba que el dominio de despliegue esté autorizado en **Authentication > Settings > Authorized domains**.

El proyecto usa estas colecciones: `ads`, `users` y `reports`. Las reglas están incluidas en el proyecto.

### Administrador

El UID administrador ya está indicado en la configuración que acompaña este ZIP. Si utilizas otra cuenta o proyecto, cambia el UID en los dos lugares siguientes con el UID real de Firebase Authentication:

- `ADMIN_UIDS` en `js/firebase-config.js` (solo controla la visibilidad de la interfaz).
- La lista de UID dentro de `isAdmin()` en `firestore.rules` (esta es la autorización real). Después vuelve a publicar las reglas.

No basta con ocultar o mostrar el botón de administración en JavaScript: la seguridad real la aplican las reglas de Firestore.

## 3. Cloudinary — imágenes

El proyecto ya está preparado con los datos de Cloudinary que facilitaste:

- Cloud name: `vjq9mwnh`
- Upload preset: `soukna-upload`
- Modo: **Unsigned**
- Carpeta: `soukna/products`

Estos valores están en `js/firebase-config.js`. No pongas nunca el **API Secret** en el código del navegador ni lo subas a GitHub.

En Cloudinary Console entra en **Settings > Upload > Upload presets**, abre `soukna-upload` y verifica:

1. Signing mode = **Unsigned**.
2. La carpeta de destino puede ser `soukna/products`.
3. Restringe los formatos permitidos a JPG, PNG, WEBP y GIF y establece un límite de tamaño razonable si la consola lo permite.

El JavaScript limita las fotos a 5 MB por archivo y a 5 fotos por anuncio. Cloudinary devuelve una URL segura (`secure_url`) y un `public_id`; Firestore guarda esos datos.

**Importante sobre el plan gratuito:** Cloudinary tiene cuotas de uso y límites. No significa almacenamiento ilimitado. Revisa el consumo y las condiciones actuales en tu cuenta.

**Importante sobre borrado de imágenes:** la carga unsigned desde el navegador no permite borrar de forma segura recursos de Cloudinary. Cuando se borra un anuncio o se sustituyen sus fotos, las imágenes antiguas pueden permanecer en Cloudinary. No se expone el API Secret en el frontend. Para automatizar el borrado hace falta un backend firmado seguro; mientras tanto se pueden limpiar manualmente desde Media Library.

## 4. Ejecutar y publicar en Cloudflare Pages

1. Sube la carpeta del proyecto a un repositorio GitHub.
2. En Cloudflare Dashboard abre **Workers & Pages > Create > Pages > Connect to Git**.
3. Selecciona el repositorio.
4. Framework preset: **None**.
5. Build command: déjalo vacío.
6. Build output directory: `/` o la raíz del proyecto, según el formulario de Pages.
7. Pulsa **Save and Deploy**.
8. Añade el dominio `*.pages.dev` que te proporciona Cloudflare a Firebase Authentication > Authorized domains.

No se necesita R2, Worker, tarjeta bancaria de R2 ni variable secreta para la subida de imágenes de esta versión.

## 5. Seguridad y límites conocidos

- Las reglas de Firestore impiden que un cliente edite o borre anuncios de otro usuario, y no le permiten cambiar su `ownerUid` ni su estado de moderación.
- Solo los UID incluidos en `isAdmin()` pueden moderar todos los anuncios, gestionar denuncias y cambiar el estado de perfiles.
- La suspensión bloquea operaciones de Firestore sujetas a las reglas, pero no deshabilita por sí sola la cuenta de Firebase Authentication. Para bloquear el inicio de sesión también se necesita un backend con Firebase Admin SDK.
- Los anuncios nuevos se publican con estado `active` y pueden ser pausados por el administrador.
- La denuncia de anuncios está incluida; antes de abrir el sitio al público conviene añadir protección antispam, política de privacidad, condiciones de uso y pruebas de seguridad.
- No incluye pagos integrados, envíos ni chat interno. La comunicación se hace por WhatsApp.
- Las categorías son estáticas y se definen en `js/translations.js`.

## 6. Comprobación rápida

1. Registra una cuenta de prueba.
2. Publica un anuncio con una foto pequeña.
3. Comprueba que la foto aparece en Cloudinary dentro de `soukna/products`.
4. Pulsa la foto en la tarjeta: debe ampliarse dentro de la misma página.
5. Cierra el visor con ×, Escape y clic fuera de la imagen.
6. Inicia sesión con otra cuenta y comprueba que no puede editar ni borrar el anuncio del primer usuario.
7. Prueba los cuatro idiomas y el contacto por WhatsApp.

