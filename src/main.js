import { createApp } from 'vue'

import './style.css'
import './API'

import App from './App.vue'
import i18n from './locales/i18n'
import router from './router'

const app = createApp(App)

app.use(i18n)
app.use(router).mount('#app')