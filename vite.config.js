import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueDevTools(),
    vue(),
    Components({
      include: [/\.vue$/, /\.vue\?vue/],
      dirs: ['./src/components'],
      resolvers:[PrimeVueResolver()],
      directoryAsNamespace: true,
    }),
    AutoImport({
      include: [
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        {
          'axios'                             : [['default', 'axios']],
          'pinia'                             : ['mapState', 'mapGetters', 'mapMutations', 'mapActions'],
          '@vuelidate/core'                   : ['useVuelidate'],
          '@vuelidate/validators'             : ['required', 'email'],
          '@/utils/date'                      : ['formattedTime', 'formattedDate'],
          '@/router'                          : ['router'],
        }
      ],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
