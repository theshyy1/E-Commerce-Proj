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

  const deleteProduct = async (product) => {
    try {
      await axios.delete(`http://localhost:3000/products/${product.id}`);
      allProducts.value = allProducts.value.splice(
        allProducts.value.findIndex((item) => item.id === product.id)
      );
    } catch (error) {
      console.log("ADD_ERROR", error);
    }
  };

  const addProduct = async (product) => {
    try {
      const res = await axios.post("http://localhost:3000/products", product);
      allProducts.value.push(product);
      return res;
    } catch (error) {
      console.log("ADD_ERROR", error);
    }
  };

  getProducts();

  return { products, isLoading, getProducts, deleteProduct, addProduct };
});
