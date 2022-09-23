import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {installNaive} from "@/components/native";
import {installAxios} from "@/api/axios";
import {installCaptcha} from "@/components/VueRecaptcha";

const app = createApp(App)
installNaive(app)
installAxios(app)
installCaptcha(app)
app.use(router).mount('#app')
