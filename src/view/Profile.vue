<script setup>
import { useAuthStore } from "../store/auth";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";

const {
  loginUser: { user },
} = useAuthStore();

const birthday = computed(() =>
  user.birthDay ? user.birthDay.split("-") : ["01", "01", "2000"]
);

const hidePhoneNumber = computed(() => {
  const newNumber = ref("");

  if (user.phone) {
    newNumber.value = user.phone.slice(0, -4).padEnd(user.phone.length, "*");
  }
  return newNumber.value;
});
</script>

<template>
  <div class="container relative h-[800px] bg-neutral-300 shadow-md">
    <div class="flex flex-col justify-center items-center">
      <h1 class="my-7 text-3xl font-bold text-sky-500">Profile Cá Nhân</h1>
      <RouterLink
        :to="`/profile/${user.id}/edit`"
        class="underline absolute top-8 right-[100px] hover:text-red-600"
        ><i class="fa-solid fa-gear"></i> Thay đổi thông tin</RouterLink
      >
      <div class="">
        <img
          :src="user.image || 'https://picsum.photos/200/200'"
          class="rounded-full w-[200px] h-[200px] object-cover"
          alt=""
        />
      </div>
      <div class="text-center my-4 max-w-[400px]">
        <span class="italic text-base opacity-60">{{
          user.description || ""
        }}</span>
      </div>
    </div>
    <div
      class="w-[600px] mx-auto border-[1px] rounded shadow-md text-sm space-y-4 border-white py-4 px-6"
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
        <ul class="flex flex-col items-start space-y-4 box-border">
          <li>
            <p>{{ user.email || "" }}</p>
          </li>
          <li>
            <p>{{ user.name || "" }}</p>
          </li>
          <li>
            <p>
              <input
                type="radio"
                value="1"
                :checked="user.gender === '1'"
                :disabled="user.gender !== '1'"
              />Nam
              <input
                type="radio"
                value="2"
                :checked="user.gender === '2'"
                :disabled="user.gender !== '2'"
              />Nữ

              <input
                type="radio"
                value="0"
                :disabled="user.gender !== '0'"
              />Khác
            </p>
          </li>
          <li>
            {{ `${birthday[2]} / ${birthday[1]} / ${birthday[0]}` }}
          </li>
          <li>
            <span class="">{{ user.address || "..." }}</span>
          </li>
          <li>
            <span class="">{{ hidePhoneNumber || "..." }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
