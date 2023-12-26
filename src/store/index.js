import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import axios from "axios";

export const useProductStore = defineStore("products", () => {
  const allProducts = ref([]);
  const isLoading = ref(false);

  const products = computed(() => allProducts.value);

  const getProducts = async (text = "") => {
    if (text.trim) {
      isLoading.value = true;
      const res = await axios.get(`http://localhost:3000/products?q=${text}`);
      const data = await res.data;
      allProducts.value = data;
      isLoading.value = false;
    } else {
      try {
        isLoading.value = true;
        const response = await axios.get("http://localhost:3000/products");
        const data = await response.data;
        allProducts.value = data;
        isLoading.value = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  getProducts();

  return { products, isLoading, getProducts };
});
