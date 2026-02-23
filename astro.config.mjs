import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 👇 AÑADE ESTA LÍNEA CON EL DOMINIO REAL (no olvides la coma al final)
  site: 'https://www.cocofibramovil.es', 
  integrations: [tailwind(), sitemap()],
});