<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleClickBack = () => {
  if (authStore.userState.user.role === "1") {
    router.push({ path: "/admin/dashboard" });
  } else {
    router.push({ path: "/" });
  }
};
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <h1 class="text-8xl text-black">404 Not Found</h1>
    <p class="my-8">Your visited page not found. You may go home page.</p>
    <button
      class="w-[200px] py-3 px-8 bg-orange-500 text-white rounded hover:opacity-60"
      @click="handleClickBack"
    >
      Back home
    </button>
  </div>
</template>
