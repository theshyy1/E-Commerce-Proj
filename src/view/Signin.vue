<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth";
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();
const { login } = useAuthStore();

const user = reactive({
  email: "admin@gmail.com",
  password: "anhtrung",
});

const handleLogin = async () => {
  try {
    const res = await login(user);
    if (res.user.role === "1") {
      router.push({ path: "/admin" });
    } else {
      router.push({ path: "/" });
    }
    toast.success("Đăng nhập thành công !", {
      autoClose: 2000,
      position: "top-center",
      theme: "colored",
    });
  } catch (error) {
    console.log(error.message);
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
        <input
          type="password"
          placeholder="Password"
          class="block w-full outline-none border-b-[1px] border-neutral-400 py-3"
          v-model="user.password"
        />
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
