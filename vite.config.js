// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import API_BASE_URL from './config';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(`C:/Windows/System32/localhost-key.pem`),
      cert: fs.readFileSync(`C:/Windows/System32/localhost.pem`),
    },
    open: true, // Automatically open the browser when the server starts
    proxy: {
      // This will proxy all requests starting with "/hi" to the backend server
      '/hi': {
        target: API_BASE_URL, // The backend API URL
        changeOrigin: true, // Ensures the origin of the request is properly set
        secure: false, // Set to true if the API server uses HTTPS
        rewrite: (path) => path.replace(/^\/hi/, '/hi'), // Optional, rewrite the path if needed
      },
    },
  },
});


//for proxy for CROS 
// import fs from 'fs';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: fs.readFileSync(`C:/Windows/System32/localhost-key.pem`),
//       cert: fs.readFileSync(`C:/Windows/System32/localhost.pem`),
//     },
//     proxy: {
//       '/hi/portal_create_user': {
//         target: 'https://staging.lspro.com.tr',
//         changeOrigin: true,
//         secure: false, // Set to true if the target server has a valid SSL certificate
//       },
//     },
    
//     open: true, // Automatically open the browser when the server starts
//   },
// });
