import { createApp } from 'vue'
import App from './App.vue'
import StUI from '../packages'
import router from './router'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(StUI).use(router).mount('#app')
// app.use(ElementPlus)
