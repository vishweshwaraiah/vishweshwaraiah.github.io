import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: '@root',
        replacement: fileURLToPath(new URL('./', import.meta.url))
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `
            @import "@/assets/styles/_fonts.scss";
            @import "@/assets/styles/_variables.scss";
            @import "@/assets/styles/_keyframes.scss";
            @import "@/assets/styles/_mixins.scss";
          `
      }
    }
  },
  assetsInclude: ['**/*.svg']
})
