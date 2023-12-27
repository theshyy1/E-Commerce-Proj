import { createWebHistory, createRouter } from "vue-router";
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
    path: "/profile/:id/edit",
    name: "Edit Profile",
    component: () => import("../view/EditProfile.vue"),
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../view/HomePage.vue"),
  },
  {
    path: "/products/:id",
    name: "Product Detail",
    component: () => import("../view/DetailPage.vue"),
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
  {
    path: "/wishlist",
    name: "Wishlist",
    component: () => import("../view/Wishlist.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../view/Cart.vue"),
  },
  {
    path: "/checkout",
    name: "Check out",
    component: () => import("../view/Checkout.vue"),
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
