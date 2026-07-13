# DreamWeb Chile

Sitio corporativo bilingüe de DreamWeb Chile, orientado a captación de proyectos mediante agenda, formulario y WhatsApp.

## Desarrollo

1. Copia `.env.example` como `.env` y completa las variables disponibles.
2. Ejecuta `npm install`.
3. Inicia el entorno con `npm run dev`.
4. Abre `http://localhost:3000`.

## Verificación

- `npm run lint`
- `npm test`
- `GET /api/health`

## Configuración pendiente de lanzamiento

La agenda de Google, SMTP, reCAPTCHA, Google Analytics, Meta Pixel e Instagram se activan mediante variables de entorno. El formulario nunca guarda mensajes en una base de datos.

OnPoint permanece fuera del contenido público. Si se incorpora en el futuro, debe conservar una bandera `published: false` hasta contar con aprobación final.
