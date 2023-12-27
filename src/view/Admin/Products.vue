<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "../../store";
import { useAuthStore } from "../../store/auth";

const store = useProductStore();
const {
  loginUser: { user },
} = useAuthStore();
const { products, isLoading } = storeToRefs(store);
</script>

<template>
  <div class="h-screen overflow-y-scroll">
    <h1 class="text-center text-5xl my-[20px]">Products</h1>
    <p v-if="isLoading">isLoading...</p>
    <table
      v-if="products.length > 0"
      class="w-full mx-auto bg-white border text-center border-neutral-300 shadow-md"
    >
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">#</th>
          <th class="py-2 px-4 border-b">Tên</th>
          <th class="py-2 px-4 border-b">Giá</th>
          <th class="py-2 px-4 border-b">Số lượng</th>
          <th class="py-2 px-4 border-b">Ảnh</th>
          <th class="py-2 px-4 border-b"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td class="py-3 px-4">{{ index + 1 }}</td>
          <td class="py-3 px-4">{{ product.name }}</td>
          <td class="py-3 px-4">{{ product.newPrice }}</td>
          <td class="py-3 px-4">{{ product.quantityInStock || 0 }}</td>
          <td class="py-3 px-4 flex justify-center">
            <img
              :src="product.image"
              alt=""
              class="w-[70px] h-[70px] object-cover"
            />
          </td>
          <td>
            <button>Edit</button>
            <button>Del</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
