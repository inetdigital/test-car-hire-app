import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/styles/theme.css";
import "@/assets/css/main.css";

createApp(App)
  .use(router) // Use your router instance here
  .mount("#app");
