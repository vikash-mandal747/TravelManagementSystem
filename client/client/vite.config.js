import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})



// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//   plugins: [
//     react(),        // Enables JSX support
//     tailwindcss(),  // Tailwind CSS integration
//   ],
  
//   build: {
//     outDir: 'dist', // Default for Vite builds
//   },

//   server: {
//     port: 5173, // Custom dev port, optional
//   },

//   // Needed for proper routing behavior in production builds
//   preview: {
//     port: 4173,
//     strictPort: true,
//   },

//   // Rewrite all requests to index.html (production only)
//   // Render and Netlify users handle this via their settings,
//   // but having this for local preview can also help.
//   // You can also move this into a render.json if preferred:
//   // {
//   //   "routes": [
//   //     { "match": "/*", "serve": "/index.html" }
//   //   ]
//   // }
//   //
//   // Note: Vite’s built-in preview server doesn’t support rewrite by default,
//   // but serves the root index to serve built assets.

// });
