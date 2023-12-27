<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <ul class="w-1/5 bg-neutral-500 text-white h-[700px] border-b-2 float-left">
    <li class="">
      <RouterLink
        class="py-5 px-5 border-b-[1px] border-gray-200 hover:bg-orange-500 block"
        to="/admin/dashboard"
        ><i class="fa-solid fa-house mr-3"></i>Home</RouterLink
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
  </ul>
</template>
