import { createWebHashHistory, createRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/",
    name: "BaseLayout",
    component: () => import("../layouts/BaseLayout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../view/HomePage.vue"),
        meta: { title: "Home" },
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../view/Profile.vue"),
        meta: { title: "Profile" },
      },
      {
        path: "profile/:id/edit",
        name: "Edit Profile",
        component: () => import("../view/EditProfile.vue"),
        meta: { title: "Edit Profile" },
      },
      {
        path: "products/:id",
        name: "Product Detail",
        component: () => import("../view/DetailPage.vue"),
        meta: { title: "Product Detail" },
      },
      {
        path: "about",
        name: "About",
        component: () => import("../view/About.vue"),
        meta: { title: "About" },
      },
      {
        path: "/signup",
        name: "Signup",
        component: () => import("../view/Signup.vue"),
        meta: { title: "Sign Up" },
        hidden: true,
      },
      {
        path: "/signin",
        name: "Signin",
        component: () => import("../view/Signin.vue"),
        meta: { title: "Sign In" },
        hidden: true,
      },
      {
        path: "/wishlist",
        name: "Wishlist",
        component: () => import("../view/Wishlist.vue"),
        meta: { title: "Wishlist" },
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import("../view/Cart.vue"),
        meta: { title: "My Cart" },
      },
      {
        path: "/checkout",
        name: "Checkout",
        component: () => import("../view/Checkout.vue"),
        meta: { title: "Checkout" },
      },
    ],
  },
  {
    path: "/admin",
    name: "AdminLayout",
    component: () => import("../layouts/AdminLayout.vue"),
    redirect: { name: "Dashboard" },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../view/Admin/Dashboard.vue"),
        meta: { title: "Dashboard" },
      },
      {
        path: "products",
        name: "Products",
        component: () => import("../view/Admin/Products.vue"),
        meta: { title: "Product Management" },
      },
      {
        path: "products/create",
        name: "Create Product",
        component: () => import("../view/Admin/CreateForm.vue"),
        meta: { title: "Create Product" },
      },
      {
        path: "users",
        name: "User",
        component: () => import("../view/Admin/User.vue"),
        meta: { title: "User Management" },
      },
      {
        path: "profile",
        name: "Ad Profile",
        component: () => import("../view/Profile.vue"),
        meta: { title: "Profile" },
      },
      {
        path: "profile/:id/edit",
        name: "Ad EditProfile",
        component: () => import("../view/EditProfile.vue"),
        meta: { title: "Edit Profile" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
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
