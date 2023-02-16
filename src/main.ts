import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as formkitPlugin, defaultConfig } from '@formkit/vue'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)
app.use(createPinia())
app.use(formkitPlugin, defaultConfig)
app.use(router)
app.mount('#app')
