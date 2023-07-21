import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import router from './router'
import './style.css'
import './API'

import App from './App.vue'

const app = createApp(App)

app.use(MotionPlugin)
app.use(router).mount('#app')





