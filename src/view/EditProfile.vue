<!-- UserInfo.vue -->
<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth";
import { computed } from "vue";
import { updateUser } from "../services/http";
import { useRouter } from "vue-router";

const router = useRouter();
const {
  loginUser: { user },
} = useAuthStore();

const birthday = computed(() => user.birthDay.split("/"));

const handleSave = async (event) => {
  event.preventDefault();
  const res = await updateUser(user);
  if (res) {
    router.push({ path: "/profile" });
  }
};
</script>

<template>
  <div class="container h-[800px] bg-neutral-300 shadow-md">
    <div class="flex flex-col justify-center items-center">
      <h1 class="my-7 text-3xl font-bold">Chỉnh sửa thông tin</h1>
      <div class="">
        <img
          :src="user.image || 'https://picsum.photos/200/200'"
          class="rounded-full w-[200px] h-[200px] object-cover"
          alt=""
        />
      </div>
      <div class="text-center my-4">
        <textarea
          id=""
          rows="2"
          placeholder="Thêm mô tả ..."
          class="w-[600px] rounded mx-auto block p-3 outline-none border-[1px] border-white bg-transparent"
          v-model="user.description"
        ></textarea>
      </div>
    </div>
    <div
      class="w-[600px] mx-auto border-[1px] border-white rounded shadow-md text-sm space-y-4 py-4 px-6"
    >
      <p class="text-xl shadow-sm">Thông tin cá nhân</p>
      <div
        class="flex justify-start mt-[60px] items-center ml-[40px] text-base"
      >
        <ul class="flex flex-col items-end mr-4 space-y-5 text-neutral-600">
          <li>Tên đăng nhập</li>
          <li>Tên</li>
          <li>Giới tính</li>
          <li>Ngày sinh</li>
          <li>Địa chỉ</li>
          <li>Số điện thoại</li>
        </ul>
        <ul class="flex flex-col items-start space-y-4 box-border">
          <li>
            {{ user.email }}
          </li>
          <li>
            <input
              type="text"
              v-model="user.name"
              placeholder="Thêm tên..."
              class="px-3 py-1"
            />
          </li>
          <li>
            <p>
              <input
                type="radio"
                value="1"
                v-model="user.gender"
                :checked="user.gender === '1'"
              />Nam
              <input
                type="radio"
                value="2"
                v-model="user.gender"
                :checked="user.gender === '2'"
              />Nữ
              <input
                type="radio"
                value="0"
                v-model="user.gender"
                :checked="user.gender === '0'"
              />Khác
            </p>
          </li>
          <li>
            <p>
              <input
                type="date"
                v-model="user.birthDay"
                placeholder="Thêm ngày sinh..."
                class="px-3 py-1"
              />
            </p>
          </li>
          <li>
            <input
              type="text"
              v-model="user.address"
              placeholder="Thêm địa chỉ..."
              class="px-3 py-1"
            />
          </li>
          <li>
            <input
              type="text"
              v-model="user.phone"
              placeholder="Thêm số điện thoại..."
              class="px-3 py-1"
            />
          </li>
        </ul>
      </div>
    </div>
    <button
      class="block mx-auto py-2 px-10 outline-none text-white my-4 rounded bg-orange-500 hover:opacity-60"
      @click="handleSave"
    >
      Lưu
    </button>
  </div>
</template>
