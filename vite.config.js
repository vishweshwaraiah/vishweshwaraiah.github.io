import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicDir: 'public',
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./', import.meta.url))
      },
      {
        find: '@src',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url))
      },
      {
        find: '@components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url))
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
            @import "@assets/styles/_fonts.scss";
            @import "@assets/styles/_variables.scss";
            @import "@assets/styles/_keyframes.scss";
            @import "@assets/styles/_mixins.scss";
          `
      }
    }
  },
  assetsInclude: ['**/*.svg']
})
