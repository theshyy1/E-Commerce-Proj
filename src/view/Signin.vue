<script setup>
import { useAuthStore } from "../store/auth";
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { signInSchema } from "../ultil/schema";

const authStore = useAuthStore();
const user = reactive({
  email: "vuquynh@gmail.com",
  password: "vuquynh",
});

const errors = reactive({
  email: null,
  password: null,
});

const handleLogin = async () => {
  const { error } = signInSchema.validate(user);
  if (error) {
    Object.keys(errors).forEach((field) => (errors[field] = null));

    error.details.forEach((detail) => {
      const field = detail.path[0];
      errors[field] = detail.message;
    });

    return;
  } else {
    authStore.login(user);
  }
};
</script>

<template>
  <div class="container flex justify-between items-center my-[80px]">
    <div class="">
      <img src="https://picsum.photos/570/514" alt="" class="" />
    </div>
    <div class="mr-[130px]">
      <h3 class="text-4xl font-semibold">Log in to Exclusive</h3>
      <span class="block my-4">Enter your details below</span>
      <form @submit.prevent="handleLogin">
        <input
          type="text"
          placeholder="Email or Phone number"
          class="block w-full outline-none border-b-[1px] border-neutral-400 py-3"
          v-model="user.email"
        />
        <span
          v-if="errors.email"
          class="text-sm text-red-500 w-[300px] block bg-red-200 border-[1px] py-2 px-3"
          >{{ errors.email }}</span
        >
        <input
          type="password"
          placeholder="Password"
          class="block w-full outline-none border-b-[1px] border-neutral-400 py-3"
          v-model="user.password"
        />
        <span
          v-if="errors.password"
          class="text-sm text-red-500 w-[300px] block bg-red-200 border-[1px] py-2 px-3"
          >{{ errors.password }}</span
        >
        <p class="my-4 text-neutral-600">
          Have you an account?
          <RouterLink to="/signup" class="underline">Register</RouterLink>
        </p>
        <p class="my-4 text-red-600">Forget password</p>
        <button
          class="w-full bg-orange-500 rounded text-white py-4 my-4 hover:opacity-40"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
