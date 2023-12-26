import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(VueQueryPlugin).mount("#app");
