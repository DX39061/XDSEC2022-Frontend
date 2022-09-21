import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {installNaive} from "@/components/native";
import {installAxios} from "@/api/axios";

const app = createApp(App)
installNaive(app)
installAxios(app)
app.use(router).mount('#app')
