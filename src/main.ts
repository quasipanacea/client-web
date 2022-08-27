import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as formkitPlugin, defaultConfig } from '@formkit/vue'
import { lavaKey } from '@/subprojects/lavakey'

import App from './App.vue'
import router from './router'

const app = createApp(App)
// TODO
// app.config.errorHandler = (err, instance, info) => {
// 	console.error(err, instance, info)
// 	console.log(instance)
// }
// app.config.warnHandler = (err, instance, info) => {
// 	console.warn(err, instance, info)
// }
app.use(createPinia())
app.use(formkitPlugin, defaultConfig)
app.use(router)
app.mount('#app')

document.addEventListener('keydown', lavaKey.getHandlerKeyDown())
document.addEventListener('keypress', lavaKey.getHandlerKeypress())
document.addEventListener('keyup', lavaKey.getHandlerKeyup())
