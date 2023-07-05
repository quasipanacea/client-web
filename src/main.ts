import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bulma/css/bulma.min.css'

import App from '@client/App.vue'
import router from '@client/router/index.ts'
import '@client/assets/style.css'
import '@client/assets/tailwind.css'

import { initAll } from '@quasipanacea/plugin-pack-core/_client.js'

await initAll()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
