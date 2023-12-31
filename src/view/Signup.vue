<script setup>
import { RouterLink } from "vue-router";
import { registerAPI } from "../services/http";
import { reactive } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { signUpSchema } from "../ultil/schema";
const router = useRouter();

const userLogin = reactive({
  name: "",
  email: "",
  password: "",
  confirm_password: "",
});

const errors = reactive({
  name: null,
  email: null,
  password: null,
  confirm_password: null,
});

const handleLogin = async () => {
  const { error } = signUpSchema.validate(userLogin);
  if (error) {
    Object.keys(errors).forEach((field) => (errors[field] = null));

    error.details.forEach((detail) => {
      const field = detail.path[0];
      errors[field] = detail.message;
    });

    return;
  } else {
    const newUser = { ...userLogin, careItems: [], cart: [], role: "2" };
    await registerAPI(newUser);
    await router.push({ path: "/signin" });
    toast.success("Đăng ký thành công, Đăng nhập ngay !!", {
      autoClose: 1500,
      theme: "colored",
    });
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
        <span
          v-if="errors.name"
          class="text-sm text-red-500 w-[300px] block bg-red-200 border-[1px] py-2 px-3"
          >{{ errors.name }}</span
        >
        <input
          type="text"
          placeholder="Email or Phone number"
          class="block w-full outline-none border-b-[1px] border-neutral-400 py-3"
          v-model="userLogin.email"
        />
        <span
          v-if="errors.email"
          class="text-sm text-red-500 w-[300px] block bg-red-200 border-[1px] py-2 px-3"
          >{{ errors.email }}</span
        >
        <input
          type="password"
          placeholder="Password"
          v-model="userLogin.password"
          class="block w-full outline-none border-b-[1px] border-neutral-400 py-3"
        />
        <span
          v-if="errors.password"
          class="text-sm text-red-500 w-[300px] block bg-red-200 border-[1px] py-2 px-3"
          >{{ errors.password }}</span
        >
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="userLogin.confirm_password"
          class="block w-full outline-none border-b-[1px] border-neutral-400 py-3"
        />
        <span
          v-if="errors.confirm_password"
          class="text-sm text-red-500 w-[300px] block bg-red-200 border-[1px] py-2 px-3"
          >{{ errors.confirm_password }}</span
        >
        <button
          class="w-full bg-orange-500 rounded text-white py-4 my-4 hover:opacity-40"
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
