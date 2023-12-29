<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useProductStore } from "../store";
import { useAuthStore } from "../store/auth";

const productStore = useProductStore();
const { userState, logout } = useAuthStore();
const searchText = ref("");

const handleSubmit = () => {
  productStore.getFilteredProducts(searchText.value);
  searchText.value = "";
};

const handleLogout = () => {
  logout();
};
</script>

<template>
  <header class="bg-white text-black">
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
  <section class="border-b-[1px] bg-orange-500 text-white border-neutral-500">
    <div class="container flex justify-between items-center pt-9 mb-4">
      <RouterLink to="/">
        <h3 class="text-2xl font-bold">Exclusive</h3>
      </RouterLink>
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
            <RouterLink to="/checkout" class="hover:underline"
              >Checkout</RouterLink
            >
          </li>
        </ul>
      </nav>
      <div class="flex justify-between items-center">
        <div
          class="border-2 border-neutral-300 bg-white rounded-md mr-4"
          @submit.prevent="handleSubmit"
        >
          <input
            type="text"
            placeholder="What are you looking for?"
            class="px-4 py-2 outline-none text-black"
            v-model="searchText"
            @keyup.enter="handleSubmit"
          />
          <button class="pr-2">
            <i class="fa-solid fa-magnifying-glass text-black"></i>
          </button>
        </div>
        <p class="space-x-4 text-2xl">
          <RouterLink to="/wishlist" class="hover-trigger group relative">
            <i class="fa-regular fa-heart hover:text-red-500"></i>
            <span
              class="hidden group-hover:block absolute top-[-40px] right-[-20px] text-[12px] z-[2] text-black bg-white rounded px-2"
              >Wishlist</span
            >
            <span
              v-if="userState.user?.careItems?.length > 0"
              class="flex justify-center absolute top-[-7px] right-[-10px] text-sm w-5 h-5 rounded-full bg-orange-800 text-white"
              >{{ userState.user?.careItems.length }}</span
            >
          </RouterLink>
          <RouterLink to="/cart" class="hover-trigger group relative">
            <i class="fa-solid fa-cart-plus"></i>
            <div
              class="hidden group-hover:flex w-[300px] h-[230px] bg-white text-black absolute top-[30px] right-0 z-[2] justify-center items-center text-base shadow-md border-[1px] border-neutral-300 overflow-y-auto"
            >
              <ul
                v-if="userState.user?.cart?.length > 0"
                class="space-y-2 h-full py-2 my-4"
              >
                <li
                  v-for="item in userState.user.cart"
                  class="flex justify-between items-center"
                >
                  <RouterLink
                    :to="`/products/${item.id}`"
                    class="flex justify-between items-center"
                  >
                    <div class="flex items-center">
                      <img
                        :src="item.image"
                        class="object-cover w-[40px] h-[40px] mr-1 rounded"
                        alt=""
                      />
                      <p class="text-sm w-[180px]">{{ item.name }}</p>
                    </div>
                    <span class="text-red-500 text-sm"
                      >${{ item.newPrice }}</span
                    >
                  </RouterLink>
                </li>
                <div class="">
                  <button
                    class="block ml-auto py-2 px-3 bg-orange-500 text-white hover:opacity-60"
                  >
                    View Cart
                  </button>
                </div>
              </ul>
              <span v-else>Chưa có sản phẩm</span>
            </div>
          </RouterLink>
          <span v-if="userState.isLoggin" class="hover-trigger group relative">
            <i class="fa-regular fa-user"></i>
            <Transition name="fade">
              <ul
                class="hidden group-hover:block absolute top-[30px] right-0 rounded z-[2] text-sm py-2 px-3 space-y-2 w-[200px] bg-gradient-to-l from-transparent to-neutral-400"
              >
                <li>
                  <RouterLink
                    to="/profile"
                    class="block p-2 hover:bg-orange-500 hover:text-white rounded text-black"
                  >
                    <i class="fa-solid fa-circle-user"></i> Manage My Account
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to=""
                    class="block p-2 hover:bg-orange-500 hover:text-white rounded text-black"
                  >
                    <i class="fa-solid fa-bag-shopping mr-3"></i>My Order
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to=""
                    class="block p-2 hover:bg-orange-500 hover:text-white rounded text-black"
                  >
                    <i class="fa-solid fa-ban mr-3"></i>My Cancellations
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to=""
                    class="block p-2 hover:bg-orange-500 hover:text-white rounded text-black"
                  >
                    <i class="fa-regular fa-star mr-3"></i>My Reviews
                  </RouterLink>
                </li>
                <li @click="handleLogout">
                  <RouterLink
                    to=""
                    class="block p-2 hover:bg-orange-500 hover:text-white rounded text-black"
                  >
                    <i class="fa-solid fa-right-from-bracket mr-3"></i>Logout
                  </RouterLink>
                </li>
              </ul>
            </Transition>
          </span>
          <span v-else>
            <RouterLink
              class="text-base border-[1px] border-white rounded py-1 px-2"
              to="/signin"
              >Sign in</RouterLink
            >
          </span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
