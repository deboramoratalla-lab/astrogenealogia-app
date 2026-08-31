# Astrogenealogía Clínica — Demo

Prototipo de plataforma de astrogenealogía clínica basado en la Formación
Internacional de Astrogenealogía de Enzo De Paola.

Demo con una carta de ejemplo (casas iguales). Muestra el análisis completo:
Carta, Memoria sistémica, Signo oculto, Punto medio Lilith/Quirón, Órdenes del
amor, Aspectos, Asteroides femeninos, Mandatos de Saturno, Ascendente sistémico,
Astrosomática, Esferas Internas y Síntesis clínica.

## Cómo desplegarlo en Vercel (2 minutos)

### Opción A — Subiendo la carpeta (la más fácil)
1. Entra en https://vercel.com e inicia sesión (puedes usar tu cuenta de Google/GitHub).
2. Pulsa **Add New… → Project**.
3. Arrastra esta carpeta completa (o usa "Import" si la tienes en GitHub).
4. Vercel detecta que es un proyecto **Vite** automáticamente. No cambies nada.
5. Pulsa **Deploy**. En un minuto tendrás una URL pública tipo
   `https://astrogenealogia-demo.vercel.app` para enviar a Enzo.

### Opción B — Desde la terminal
```bash
npm install -g vercel
vercel
```
Sigue las instrucciones (acepta los valores por defecto).

## Ejecutarlo en local
```bash
npm install
npm run dev
```
Se abre en http://localhost:5173

## Configuración de build (Vercel la detecta sola)
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
