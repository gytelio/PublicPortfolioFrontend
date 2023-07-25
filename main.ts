import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue"; // or the path to your root component
import router from "./routes/index";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
