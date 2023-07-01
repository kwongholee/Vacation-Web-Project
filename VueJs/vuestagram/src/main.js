import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

let emitter = mitt();
let app = createApp(App)
app.config.globalProperties.emitter = emitter;

import store from './store'
import './registerServiceWorker'

app.use(store).mount('#app')