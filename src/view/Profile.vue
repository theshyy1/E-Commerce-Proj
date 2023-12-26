<!-- UserInfo.vue -->
<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth";
import { computed } from "vue";

const {
  loginUser: { user },
} = useAuthStore();

const birthday = computed(() => user.birthDay.split("/"));
</script>

<template>
  <div class="container w-[1000px] bg-neutral-300 rounded shadow-md my-4">
    <div class="flex flex-col justify-center items-center">
      <h1 class="my-4 text-3xl font-bold">Profile Cá Nhân</h1>
      <div class="">
        <img src="https://picsum.photos/200/200" class="rounded-full" alt="" />
      </div>
      <div class="text-center my-4 max-w-[400px]">
        <p class="underline">Mô tả</p>
        <span class="italic text-base">{{ user.description }}</span>
      </div>
    </div>
    <div
      class="w-[500px] mx-auto border-[1px] rounded shadow-md text-sm space-y-4 border-black py-4 px-6"
    >
      <p class="text-xl shadow-sm">Thông tin cá nhân</p>
      <div
        class="flex justify-start mt-[60px] items-center ml-[40px] text-base"
      >
        <ul class="flex flex-col items-end mr-4 space-y-4 text-neutral-600">
          <li>Tên đăng nhập</li>
          <li>Tên</li>
          <li>Giới tính</li>
          <li>Ngày sinh</li>
          <li>Địa chỉ</li>
          <li>Số điện thoại</li>
        </ul>
        <ul class="flex flex-col items-start space-y-4 box-border h-[224px]">
          <li>
            <p>{{ user.email }}</p>
          </li>
          <li>
            <p>{{ user.name }}</p>
          </li>
          <li>
            <p>
              <input
                type="radio"
                value="Name"
                v-model="user.gender"
                :checked="user.gender === '1'"
              />Nam
              <input
                type="radio"
                value="Nữ"
                v-model="user.gender"
                :checked="user.gender === '2'"
              />Nữ
              <input
                type="radio"
                value="Khác"
                v-model="user.gender"
                :checked="user.gender === '0'"
              />Khác
            </p>
          </li>
          <li>
            <p>
              <span
                class="mr-3 border-[1px] border-black px-2 w-[80px] inline-block"
                >{{ birthday[0] }} <i class="fa-solid fa-chevron-down ml-3"></i
              ></span>
              <span
                class="mr-3 border-[1px] border-black px-2 w-[80px] inline-block"
                >{{ birthday[1] }} <i class="fa-solid fa-chevron-down ml-3"></i
              ></span>
              <span
                class="mr-3 border-[1px] border-black px-2 w-[80px] inline-block"
                >{{ birthday[2] }} <i class="fa-solid fa-chevron-down ml-3"></i
              ></span>
            </p>
          </li>
          <li>
            <span class="italic ml-5">{{ user.address }}</span>
          </li>
          <li>
            <span class="italic ml-5">{{ user.phone }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
