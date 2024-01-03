<script setup>
import { useAuthStore } from "../store/auth";
import { updateUserAPI } from "../services/http";
import { toast } from "vue3-toastify";
import { getNewestPrice } from "../ultil";

const {
  userState: { user },
} = useAuthStore();

const moveAllToBag = async () => {
  const allItemsCare = [
    ...user.cart,
    ...user.careItems.map((item) => ({ ...item, quantity: 1 })),
  ];
  const uniqueItems = new Set(allItemsCare.map((item) => item._id));
  const myLastItems = [...uniqueItems].map((id) =>
    allItemsCare.find((obj) => obj._id === id)
  );

  const confirm = window.confirm(
    "Bạn có chắc chắn muốn thêm tất vào giỏ hàng không?"
  );

  if (!confirm) return;
  user.cart = myLastItems;
  user.careItems = [];

  await updateUserAPI(user);
  toast.success("Moved all to bag", {
    autoClose: 1500,
    position: "bottom-right",
    theme: "colored",
  });
};
const addToCart = async (product) => {
  const index = user.cart.findIndex((item) => item._id === product._id);
  if (index !== -1) {
    user.cart[index].quantity++;
  } else {
    user.cart.push({ ...product, quantity: 1 });
  }

  const res = await updateUserAPI(user);
  if (res) {
    toast.success("Added x1", {
      autoClose: 1500,
      position: "bottom-right",
      theme: "colored",
    });
  }
};

const handleDelete = async (product) => {
  const index = user.careItems.findIndex((item) => item._id === product._id);
  if (index !== -1) {
    user.careItems.splice(index, 1);
    await updateUserAPI(user);
    toast.error("Removed x1", {
      autoClose: 1500,
      position: "bottom-right",
      theme: "colored",
    });
  }
};
</script>

<template>
  <div class="container">
    <div class="flex justify-between items-center mt-[80px]">
      <h1 class="my-5 text-3xl border-l-4 border-orange-500 px-3 ml-6">
        Wishlist ({{ user.careItems.length }})
      </h1>
      <button
        @click="moveAllToBag"
        class="border-[1px] border-black py-3 px-7 hover:text-white hover:border-orange-500 rounded hover:bg-orange-400"
      >
        Move All To Bag
      </button>
    </div>
    <div class="grid grid-cols-4 gap-4 my-[60px]">
      <article
        v-for="(product, index) in user.careItems"
        :key="product._id"
        class="shadow-md py-4 px-4"
      >
        <div class="mb-4 relative">
          <RouterLink :to="`/products/${product._id}`">
            <img :src="product.image" alt="" class="rounded" />
          </RouterLink>
          <p
            class="flex justify-center items-center absolute top-4 right-[35px] w-[30px] h-[30px] bg-white rounded-full hover:opacity-70 cursor-pointer"
            @click="handleDelete(product)"
          >
            <i class="fa-solid fa-trash-can text-xl"></i>
          </p>
          <span
            @click="addToCart(product)"
            class="absolute w-[98%] text-center h-[41px] leading-[41px] text-sm cursor-pointer top-[84%] left-0 bg-black text-white"
            ><i class="fa-solid fa-cart-shopping"></i> Add to cart</span
          >
        </div>
        <div class="pt-5">
          <RouterLink :to="`/products/${product.id}`">
            <h5 class="text-base hover:underline">{{ product.name }}</h5>
          </RouterLink>
          <p class="text-red-600 mr-2 my-2">
            $ {{ getNewestPrice(product.price) }}
            <span class="text-neutral-400 line-through"
              >$ {{ product.price }}</span
            >
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
