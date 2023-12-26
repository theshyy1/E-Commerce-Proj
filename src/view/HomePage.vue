<script setup>
import {
  computed,
  onBeforeMount,
  onMounted,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import { useProductStore } from "../store";
import { storeToRefs } from "pinia";

const store = useProductStore();
const { products, isLoading } = storeToRefs(store);
</script>

<template>
  <section class="container relative flex justify-between">
    <span
      class="absolute top-0 left-[338px] border-neutral-400 border-[0.5px] h-full"
    ></span>
    <aside class="mt-[40px]">
      <ul class="space-y-4">
        <li
          class="relative hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-300 ease-in-out"
        >
          <a class="" href=""
            >Woman’s Fashion
            <span
              class="after:content-['>'] absolute top-0 right-[-70px]"
            ></span
          ></a>
        </li>
        <li
          class="relative hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-300 ease-in-out"
        >
          <a href="" class=""
            >Men’s Fashion
            <span
              class="after:content-['>'] absolute top-0 right-[-70px] hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-300 ease-in-out"
            ></span
          ></a>
        </li>
        <li
          class="hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-500 ease-in-out"
        >
          <a href="" class="">Electronics</a>
        </li>
        <li
          class="hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-500 ease-in-out"
        >
          <a href="" class="hover:">Home & Lifestyle</a>
        </li>
        <li
          class="hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-500 ease-in-out"
        >
          <a href="" class="hover:">Medicine</a>
        </li>
        <li
          class="hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-500 ease-in-out"
        >
          <a href="" class="hover:">Sports & Outdoor</a>
        </li>
        <li
          class="hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-500 ease-in-out"
        >
          <a href="" class="">Baby’s & Toys</a>
        </li>
        <li
          class="hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-500 ease-in-out"
        >
          <a href="" class="hover:">Groceries & Pets</a>
        </li>
        <li
          class="hover:underline hover:text-shadow-md hover:translate-x-[-15px] transition-transform transition-duration-500 ease-in-out"
        >
          <a href="" class="hover:">Health & Beauty</a>
        </li>
      </ul>
    </aside>
    <main class="mt-[40px] ml-[45px] block border-l-2 border-neutral-700">
      <img src="../assets/coverimage.png" alt="" />
    </main>
  </section>
  <section class="container my-[60px]">
    <div class="mb-[40px]">
      <section class="flex items-center mb-6">
        <span class="block w-5 h-[40px] rounded-md bg-red-700 mr-2"></span>
        <p class="text-red-700">Today’s</p>
      </section>
      <section class="flex justify-between items-center">
        <h4 class="text-4xl font-semibold">Flash Sales</h4>
        <div class="flex items-center space-x-2">
          <span
            class="flex justify-center items-center w-[46px] h-[46px] bg-neutral-300 rounded-full"
            ><i class="fa-solid fa-arrow-left"></i
          ></span>
          <span
            class="flex justify-center items-center w-[46px] h-[46px] bg-neutral-300 rounded-full"
            ><i class="fa-solid fa-arrow-right"></i
          ></span>
        </div>
      </section>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <span v-if="isLoading">Loading...</span>
      <template v-else>
        <article v-for="product in products" :key="product.id">
          <div class="mb-4">
            <img :src="product.image" alt="" />
          </div>
          <div class="">
            <h5 class="text-base">{{ product.name }}</h5>
            <p class="text-red-600 mr-2 my-2">
              ${{ product.newPrice }}
              <span class="text-neutral-400 line-through"
                >${{ product.oldPrice }}</span
              >
            </p>
            <ul>
              <template v-for="index in 5">
                <i
                  v-if="index <= product.star"
                  key="index"
                  class="fa-solid fa-star text-red-600"
                ></i>
                <i v-else class="fa-regular fa-star"></i>
              </template>
              <span>({{ product.soldQuantity }})</span>
            </ul>
          </div>
        </article>
      </template>
    </div>
    <div class="">
      <button
        class="block mx-auto mt-[60px] w-[234px] bg-red-600 text-white rounded py-4 hover:opacity-40"
      >
        View All Products
      </button>
    </div>
  </section>
</template>
