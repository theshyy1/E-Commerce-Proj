import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../view/HomePage.vue";
import About from "../view/About.vue";
import Signin from "../view/Signin.vue";
import Signup from "../view/Signup.vue";

import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../view/HomePage.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../view/Profile.vue"),
  },
  {
    path: "/products",
    component: () => import("../view/HomePage.vue"),
  },
  {
    path: "/about",
    component: () => import("../view/About.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../view/Signup.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../view/Signin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.loginUser.isLoggin) {
    if (to.name === "Signin" || to.name === "Signup") {
      next(); //allowed
    } else {
      next({ name: "Signin" });
    }
  } else {
    if (to.name === "Signup" || to.name === "Signin") {
      next({ name: from.name });
    } else {
      next();
    }
  }
});

export default router;
