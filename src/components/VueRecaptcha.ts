import VueRecaptcha from "vue3-recaptcha-v2";
import {App} from "vue";

export function installCaptcha(app: App<Element>) {
    app.use(VueRecaptcha, {
        siteKey: "6LfFeiAiAAAAAOFLeGa6KjVZsTTAWZ3oQqYAJIZn",
        alterDomain: true
    });
}