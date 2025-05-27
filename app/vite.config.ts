/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Extract domain info from env vars
  const sub = (env.VITE_PROJECT_SUBDOMAIN || '').trim();
  const domain = (env.VITE_PROJECT_DOMAIN || '').trim();
  
  // Build the project URL if domain exists
  const projectUrl = domain
    ? `https://${sub ? sub + '.' : ''}${domain}`
    : '';

  return { 
    plugins: [
      react(),
      // Using Vite's built-in HTML replacement instead of Rollup plugin
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(/%URL%/g, projectUrl || '');
        }
      },
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
