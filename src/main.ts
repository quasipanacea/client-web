import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import { lavaKey } from './singletons'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(plugin, defaultConfig)
app.use(router)
app.mount('#app')

document.addEventListener('keydown', lavaKey.getHandlerKeyDown())
document.addEventListener('keypress', lavaKey.getHandlerKeypress())
document.addEventListener('keyup', lavaKey.getHandlerKeyup())
