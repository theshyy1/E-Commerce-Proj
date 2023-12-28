<script setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "../store/auth";

const {
  loginUser: { user },
  logout,
} = useAuthStore();

const handleLogout = () => {
  logout();
};
</script>

<template>
  <ul
    class="w-1/5 bg-green-800 text-white h-[800px] pr-2 border-b-2 float-left"
  >
    <li class="border-b-[1px] pb-3">
      <div class="flex justify-center items-center flex-col">
        <h3 class="shadow-md italic my-4">{{ user.name }}</h3>
        <div class="">
          <img
            :src="user.image"
            class="object-cover w-[100px] h-[100px] rounded-full"
            alt=""
          />
        </div>
        <RouterLink
          to="/admin/profile"
          class="border-gray-200 my-2 hover:underline"
          >Chỉnh sửa</RouterLink
        >
      </div>
    </li>
    <li class="">
      <RouterLink
        class="py-5 px-5 border-b-[1px] border-gray-200 hover:bg-orange-500 block"
        to="/admin/dashboard"
        ><i class="fa-solid fa-house mr-3"></i>Home</RouterLink
      >
    </li>
    <li class="">
      <RouterLink
        class="py-5 px-5 border-b-[1px] border-gray-200 hover:bg-orange-500 block"
        to="/admin/notifications"
        ><i class="fa-solid fa-bell mr-3"></i>Notifications</RouterLink
      >
    </li>
    <li class="">
      <RouterLink
        class="block py-5 px-5 border-b-[1px] border-gray-200 hover:bg-orange-500"
        to="/admin/products"
        ><i class="fa-solid fa-layer-group mr-3"></i>Products</RouterLink
      >
    </li>
    <li>
      <RouterLink
        class="py-5 px-5 border-b-[1px] border-gray-200 hover:bg-orange-500 block"
        to="/admin/users"
        ><i class="fa-regular fa-user mr-3"></i>User</RouterLink
      >
    </li>
    <li>
      <RouterLink
        class="py-5 px-5 border-b-[1px] border-gray-200 hover:bg-orange-500 block"
        to="/admin/setting"
        ><i class="fa-solid fa-gear mr-3"></i>Setting</RouterLink
      >
    </li>
    <li @click="handleLogout">
      <RouterLink
        class="py-5 px-5 border-b-[1px] border-gray-200 hover:bg-orange-500 block"
        to="/admin/setting"
        ><i class="fa-solid fa-right-from-bracket"></i>Logout</RouterLink
      >
    </li>
  </ul>
</template>
