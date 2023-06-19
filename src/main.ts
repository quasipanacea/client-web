import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bulma/css/bulma.min.css'
import '@client/assets/base.css'

import App from '@client/App.vue'
import router from '@client/router/index.ts'
import { initPlugins } from '@client/util/util.ts'

await initPlugins()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
