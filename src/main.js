import { createApp } from "vue";
import "./style.css";
import "./styles/index.css";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import Vue3Toastify from "vue3-toastify";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(VueQueryPlugin)
  .use(Vue3Toastify)
  .mount("#app");
