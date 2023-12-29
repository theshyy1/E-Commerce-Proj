<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useProductStore } from "../store";
import { useAuthStore } from "../store/auth";
import { updateUserAPI } from "../services/http";
import { toast } from "vue3-toastify";
import { RouterLink } from "vue-router";
import { useFetch } from "@vueuse/core";

const store = useProductStore();
const {
  userState: { user },
} = useAuthStore();

onMounted(() => store.getFilteredProducts());
const productFilters = computed(() => store.allProducts);

// add to wishlist
const handleClick = async (product) => {
  const index = user.careItems.findIndex((item) => item.id === product.id);
  if (index === -1) {
    user.careItems.unshift(product);
  }

  await updateUserAPI(user);
  toast.success("Added x1", {
    autoClose: 1500,
    position: "bottom-right",
    theme: "colored",
  });
};

// remove from wishlist
const removeClick = async (product) => {
  const index = user.careItems.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    user.careItems.splice(index, 1);
  }

  await updateUserAPI(user);
  toast.error("Removed x1", {
    autoClose: 1500,
    position: "bottom-right",
    theme: "colored",
  });
};

// check item in wishlist
const checkItem = (product) => {
  return user.careItems.findIndex((item) => item.id === product.id) !== -1;
};

// Sorted with options
let order = "asc";
const sortAndSetProducts = (key) => {
  const newProducts = ref(productFilters.value);
  productFilters.value = newProducts.value.sort((a, b) => {
    const order1 = order === "asc" ? 1 : -1;
    const comp =
      key === "name" ? a[key].localeCompare(b[key]) : a[key] - b[key];
    return order1 * comp;
  });
};

const sortByName = () => {
  order = order === "asc" ? "desc" : "asc";
  sortAndSetProducts("name");
};

const sortByPrice = () => {
  order = order === "asc" ? "desc" : "asc";
  sortAndSetProducts("newPrice");
};

const sortyByRate = () => {
  order = order === "asc" ? "desc" : "asc";
  sortAndSetProducts("star");
};

// Sorted with icons
const show = reactive({
  name: true,
  price: true,
  star: false,
});
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
        <span class="block w-5 h-[40px] rounded-md bg-orange-500 mr-2"></span>
        <p class="text-orange-700">Today’s</p>
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
    <ul
      class="flex space-x-5 items-center border-[1px] bg-neutral-200 py-2 px-3 my-6"
    >
      <span class="ml-5">Sắp xếp theo</span>
      <li @click="show.name = !show.name">
        <button
          class="px-5 py-3 bg-white text-black hover:bg-orange-500 hover:text-white"
          @click="sortByName"
          transition="fade"
        >
          Tên sản phẩm
          <i v-if="show.name" class="fa-solid fa-chevron-up"></i>
          <i v-else class="fa-solid fa-chevron-down"></i>
        </button>
      </li>
      <li @click="show.price = !show.price">
        <button
          @click="sortByPrice"
          class="px-5 py-3 bg-white text-black hover:bg-orange-500 hover:text-white"
        >
          Giá sản phẩm
          <i v-if="show.price" class="fa-solid fa-chevron-up"></i>
          <i v-else class="fa-solid fa-chevron-down"></i>
        </button>
      </li>
      <li @click="show.star = !show.star">
        <button
          @click="sortyByRate"
          class="px-5 py-3 bg-white text-black hover:bg-orange-500 hover:text-white"
        >
          Đánh giá
          <i v-if="show.star" class="fa-solid fa-chevron-up"></i>
          <i v-else class="fa-solid fa-chevron-down"></i>
        </button>
      </li>
    </ul>
    <div class="grid grid-cols-4 gap-4">
      <span v-if="store.isLoading">Loading...</span>
      <template v-if="productFilters">
        <article v-for="product in productFilters" :key="product.id">
          <div class="relative mb-4">
            <RouterLink :to="`/products/${product.id}`">
              <img
                :src="product.image"
                :alt="product.name"
                class="object-cover"
              />
            </RouterLink>
            <p
              class="flex justify-center items-center absolute top-4 right-[50px] w-[36px] h-[36px] bg-white rounded-full hover:opacity-70 cursor-pointer"
            >
              <i
                class="fa-solid fa-heart text-2xl text-orange-500"
                @click="removeClick(product)"
                v-if="checkItem(product)"
              ></i>
              <i
                v-else
                @click="handleClick(product)"
                class="fa-regular fa-heart text-2xl"
              ></i>
            </p>
          </div>
          <div class="">
            <RouterLink :to="`/products/${product.id}`">
              <h5 class="text-base hover:underline">{{ product.name }}</h5>
            </RouterLink>
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
        class="block mx-auto mt-[60px] w-[234px] bg-orange-500 text-white rounded py-4 hover:opacity-40"
      >
        View All Products
      </button>
    </div>
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
