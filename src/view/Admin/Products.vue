<script setup>
import { useProductStore } from "../../store";
import { toast } from "vue3-toastify";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { deleteProductAPI } from "../../services/http";

const router = useRouter();
const store = useProductStore();

onMounted(() => store.getAllProducts());

const products = computed(() => store.allProducts);

const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure to delete this product?");
  if (confirm) {
    await store.deleteProduct(id);
    await router.push({ path: "/admin/products" });
    toast.error("Deleted successfully", {
      autoClose: 1500,
      position: "bottom-right",
      theme: "colored",
    });
  }
};
</script>

<template>
  <div class="h-[800px] overflow-y-scroll">
    <h1 class="text-4xl font-bold text-blue-700 mt-[30px]">
      Product Management
    </h1>
    <button
      class="block ml-auto bg-transparent text-blue-700 border-2 border-blue-700 py-2 px-6 mb-4 rounded-r-full rounded-l-full hover:opacity-60"
    >
      <RouterLink to="/admin/products/create">Add New</RouterLink>
      <i class="fa-solid fa-plus ml-2"></i>
    </button>
    <p v-if="store.isLoading">isLoading...</p>
    <table
      class="w-full mx-auto bg-white border text-center border-neutral-300 shadow-md"
    >
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">#</th>
          <th class="py-2 px-4 border-b">Name</th>
          <th class="py-2 px-4 border-b">Price ( $ )</th>
          <th class="py-2 px-4 border-b">Quantity ( items )</th>
          <th class="py-2 px-4 border-b">Avatar</th>
          <th class="py-2 px-4 border-b"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product._id">
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
              <i class="fa-solid fa-hand"></i> Update
            </button>
            <button
              class="bg-red-500 text-white py-2 px-6 mb-2 hover:opacity-60 rounded"
              @click="handleDelete(product._id)"
            >
              <i class="fa-solid fa-xmark"></i> Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
