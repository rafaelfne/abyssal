import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        navigateFallback: '/',
        runtimeCaching: [],
      },
      manifest: {
        name: 'Abyssal Colony Manager',
        short_name: 'Abyssal',
        description: 'Manage a research station above an alien ocean.',
        display: 'standalone',
        background_color: '#03131a',
        theme_color: '#0b2a34',
        orientation: 'portrait',
        icons: [
          {
            src: '/abyssal-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
