import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // don’t forget this if using React
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/TravelManagementSystem/', // ← important!
  plugins: [react(), tailwindcss()],
});
