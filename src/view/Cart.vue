<script setup>
import { computed } from "vue";
import { useAuthStore } from "../store/auth";
import { updateUser } from "../services/http";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const {
  loginUser: { user },
} = useAuthStore();

const totalPriceItems = computed(() => {
  const total = user.cart.reduce(
    (total, num) => total + num.quantity * num.newPrice,
    0
  );
  return total;
});

const handleCheckout = async () => {
  user.cart = [];
  await updateUser(user);
  toast.success("Checkout successfully", {
    autoClose: 2000,
    theme: "colored",
  });
};

const handleIncrease = async (product) => {
  const index = user.cart.findIndex((item) => item.id == product.id);

  if (user.cart[index].quantity > 1) {
    user.cart[index].quantity--;
  } else {
    const confirm = window.confirm("Are you sure you want to remove");
    if (confirm) {
      user.cart.splice(index, 1);
    }
  }
  await updateUser(user);
};

const handleDecrease = async (product) => {
  const index = user.cart.findIndex((item) => item.id == product.id);
  user.cart[index].quantity++;
  await updateUser(user);
};

const removeItem = async (product) => {
  const index = user.cart.findIndex((item) => item.id == product.id);
  const confirm = window.confirm("Are you sure you want to remove");
  if (confirm) {
    user.cart.splice(index, 1);
  }
  await updateUser(user);
};
</script>
<template>
  <div class="container my-[60px]">
    <h1 class="my-5 text-3xl border-l-4 border-orange-500 px-3 ml-6">
      My Cart
    </h1>
    <div
      class="border-[1px] shadow-md border-neutral-400 grid grid-cols-4 justify-between text-center py-6"
    >
      <span>Product</span>
      <span>Price</span>
      <span>Quantity</span>
      <span>Subtotal ($)</span>
    </div>
    <!-- Product Cart -->
    <div class="">
      <ul
        v-for="cart in user.cart"
        :key="cart.id"
        class="relative border-[1px] shadow-md border-neutral-400 grid grid-cols-4 justify-between text-center items-center py-3 my-[30px]"
      >
        <li class="flex items-center justify-center">
          <img
            :src="cart.image"
            class="object-cover mr-2 w-[70px] h-[70px]"
            alt=""
          />
          {{ cart.name }}
        </li>
        <li>${{ cart.newPrice }}</li>
        <li>
          <div
            class="flex justify-center items-center rounded py-2 px-3 w-[80px] border-[1px] mx-auto border-neutral-300"
          >
            <p class="mr-2">{{ cart.quantity }}</p>
            <div class="flex flex-col ml-1 items-center justify-start">
              <i
                class="fa-solid fa-chevron-up cursor-pointer"
                @click="handleDecrease(cart)"
              ></i>
              <i
                class="fa-solid fa-chevron-down cursor-pointer"
                @click="handleIncrease(cart)"
              ></i>
            </div>
          </div>
        </li>
        <li>${{ cart.quantity * cart.newPrice }}</li>
        <span
          class="absolute top-[35px] right-[30px] text-base text-red-500 hover:text-red-300 cursor-pointer"
          @click="removeItem(cart)"
        >
          Xoá
          <i class="fa-solid fa-trash"></i>
        </span>
      </ul>
    </div>
    <!-- Checkout -->
    <div class="my-[80px] flex justify-between items-start">
      <form class="checkout-code">
        <input
          type="text"
          placeholder="Coupon Code"
          class="w-[300px] text-sm text-black py-4 px-5 border-[1px] border-neutral-300 rounded"
        />
        <button
          class="w-[210px] py-4 ml-4 bg-orange-500 border-none text-white rounded hover:opacity-60"
        >
          Apply Coupon
        </button>
      </form>
      <div class="w-[470px] border-[1px] border-neutral-300 rounded">
        <div class="my-8 mx-6">
          <h3 class="text-xl mb-6">Cart Total</h3>
          <div class="">
            <p
              class="flex justify-between border-[1px] border-neutral-300 py-1 px-2 mb-4"
            >
              Subtotal: <span class="totalPrice">$ {{ totalPriceItems }}</span>
            </p>
            <p
              class="flex justify-between border-[1px] border-neutral-300 py-1 px-2 mb-4"
            >
              Shipping: <span>Free</span>
            </p>
            <p
              class="flex justify-between border-[1px] border-neutral-300 py-1 px-2 mb-4"
            >
              Total: <span class="totalPrice">$ {{ totalPriceItems }}</span>
            </p>
          </div>
          <button
            class="w-[260px] py-4 ml-4 bg-orange-500 border-none text-white rounded hover:opacity-60"
            id="checkout-done"
            @click="handleCheckout"
          >
            Procees to checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
