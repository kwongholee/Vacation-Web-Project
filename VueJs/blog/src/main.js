import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import routerMake from './router'

createApp(App).use(routerMake).mount('#app')