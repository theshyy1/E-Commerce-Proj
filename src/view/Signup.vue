<script setup>
import { RouterLink } from "vue-router";
import { register } from "../services/http";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userLogin = reactive({
  name: "",
  email: "",
  password: "",
});

const handleLogin = async () => {
  if (!userLogin.email || !userLogin.password) {
    alert("Please fill both email and password fields");
    return;
  }

  try {
    await register(userLogin);
    // (Optional) Đăng nhập tự động sau khi đăng ký thành công
    // await login(userLogin);

    alert("Registration successful! Please log in.");
    router.push({ path: "/signin" });
  } catch (error) {
    console.error("Registration error:", error);
    alert("Có lỗi xảy ra !!");
  }
};
</script>
<template>
  <div class="container flex justify-between items-center my-[80px]">
    <div class="">
      <img src="https://picsum.photos/570/514" alt="" class="" />
    </div>
    <div class="mr-[130px]">
      <h3 class="text-4xl font-semibold">Create an account</h3>
      <span class="block my-4">Enter your details below</span>
      <form class="block" @submit.prevent="handleLogin">
        <input
          type="text"
          placeholder="Name"
          class="block w-full outline-none border-b-[1px] border-neutral-400 py-3"
          v-model="userLogin.name"
        />
        <input
          type="text"
          placeholder="Email or Phone number"
          class="block w-full outline-none border-b-[1px] border-neutral-400 py-3"
          v-model="userLogin.email"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="userLogin.password"
          class="block w-full outline-none border-b-[1px] border-neutral-400 py-3"
        />
        <button
          class="w-full bg-orange-700 rounded text-white py-4 my-4 hover:opacity-40"
        >
          Create Account
        </button>
      </form>
      <button
        class="w-full bg-transparent rounded text-black border-[1px] border-black py-4 my-4 hover:opacity-40"
      >
        <RouterLink to="/signin">
          <span><i class="fa-brands fa-google"></i></span>
          Sign in with Google
        </RouterLink>
      </button>
    </div>
  </div>
</template>
