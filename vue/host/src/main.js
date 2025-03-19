import { createApp, defineAsyncComponent  } from 'vue'
import './style.css'
import App from './App.vue'

const HelloWorld = defineAsyncComponent(() => import("remote_app/HelloWorld"));

createApp(App)
.component("HelloWorld", HelloWorld)
.mount('#app')
