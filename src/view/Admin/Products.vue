<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "../../store";
import { useAuthStore } from "../../store/auth";
// import { deletedProduct } from "../../services/http";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRoute, useRouter } from "vue-router";

const router = useRoute();

const { products, isLoading, deleteProduct } = useProductStore();
const {
  loginUser: { user },
} = useAuthStore();
// const { products, isLoading } = storeToRefs(store);

const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete");
  if (confirm) {
    await deleteProduct(id);
    toast.error("Deleted successfully");
    router.push({ path: "/admin/products" });
  }
};
</script>

<template>
  <div class="h-[800px] overflow-y-scroll">
    <h1 class="text-4xl font-bold mt-[30px]">Products</h1>
    <button
      class="block ml-auto bg-orange-500 text-white py-2 px-6 mb-2 hover:opacity-60"
    >
      <RouterLink to="/admin/products/create">ADD NEW</RouterLink>
    </button>
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
          <th class="py-2 px-4 border-b">Thao tác</th>
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
              :src="product.image || 'https://picsum.photos/100/100'"
              alt=""
              class="w-[70px] h-[70px] object-cover"
            />
          </td>
          <td>
            <button
              class="bg-blue-500 text-white py-2 px-6 mb-2 hover:opacity-60 rounded mr-2"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white py-2 px-6 mb-2 hover:opacity-60 rounded"
              @click="handleDelete(product)"
            >
              Del
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
