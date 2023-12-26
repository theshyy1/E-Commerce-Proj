<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useProductStore } from "../store";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
// const { products } = storeToRefs(productStore);
const authStore = useAuthStore();
const { loginUser } = storeToRefs(authStore);
const searchText = ref("");

const handleSubmit = () => {
  productStore.getProducts(searchText.value);
  console.log(`Redirect to /products?q=${searchText.value}`);
};

const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <header class="bg-black text-white">
    <div class="container py-[14px] flex justify-between items-center">
      <span></span>
      <p class="text-sm">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <span class="border-b-1 border-white ml-4">ShopNow</span>
      </p>
      <p class="text-sm">
        English
        <span class="ml-2 text-xl"
          ><i class="fa-solid fa-chevron-down"></i
        ></span>
      </p>
    </div>
  </header>
  <section class="border-b-[1px] border-neutral-500">
    <div class="container flex justify-between items-center mt-9 mb-4">
      <h3 class="text-2xl font-bold">Exclusive</h3>
      <nav>
        <ul class="flex justify-center items-center space-x-6">
          <li><RouterLink to="/" class="hover:underline">Home</RouterLink></li>
          <li>
            <RouterLink to="/contact" class="hover:underline"
              >Contact</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/about" class="hover:underline">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/collections" class="hover:underline"
              >Collections</RouterLink
            >
          </li>
        </ul>
      </nav>
      <div class="flex justify-between items-center">
        <div
          class="border-2 border-neutral-300 rounded-md mr-4"
          @submit.prevent="handleSubmit"
        >
          <input
            type="text"
            placeholder="What are you looking for?"
            class="px-4 py-2 outline-none"
            v-model="searchText"
            @keyup.enter="handleSubmit"
          />
          <button class="pr-2">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <p class="space-x-4 text-2xl">
          <i class="fa-regular fa-heart"></i>
          <i class="fa-solid fa-cart-plus"></i>
          <span v-if="loginUser.isLoggin" class="hover-trigger group relative">
            <i class="fa-regular fa-user"></i>
            <ul
              class="hidden group-hover:block absolute top-[30px] right-0 rounded z-[2] text-sm py-2 px-4 space-y-4 text-white w-[200px] bg-gradient-to-l from-transparent to-black"
            >
              <li class="">
                <RouterLink
                  to="/profile"
                  class="block p-1 hover:bg-orange-600 rounded text-white"
                >
                  <i class="fa-solid fa-circle-user"></i> Manage My Account
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to=""
                  class="block p-1 hover:bg-orange-600 rounded text-white"
                >
                  <i class="fa-solid fa-bag-shopping mr-3"></i>My Order
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to=""
                  class="block p-1 hover:bg-orange-600 rounded text-white"
                >
                  <i class="fa-solid fa-ban mr-3"></i>My Cancellations
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to=""
                  class="block p-1 hover:bg-orange-600 rounded text-white"
                >
                  <i class="fa-regular fa-star mr-3"></i>My Reviews
                </RouterLink>
              </li>
              <li @click="handleLogout">
                <RouterLink
                  to=""
                  class="block p-1 hover:bg-orange-600 rounded text-white"
                >
                  <i class="fa-solid fa-right-from-bracket mr-3"></i>Logout
                </RouterLink>
              </li>
            </ul>
          </span>
          <span v-else>
            <RouterLink
              class="text-xl border-[1px] border-black rounded py-2 px-3"
              to="/signin"
              >Sign In</RouterLink
            >
          </span>
        </p>
      </div>
    </div>
  </section>
</template>
