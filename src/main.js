import '@assets/index.scss'
import '@src/utils/prototypes.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@src/App.vue'
import router from '@src/router'

import DisableDevtool from 'disable-devtool'

DisableDevtool()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
