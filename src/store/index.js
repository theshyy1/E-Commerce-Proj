import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getProducts2, deleteProduct, addProduct } from "../services/http";
import axios from "axios";

export const useProductStore = defineStore("products", () => {
  const allProducts = ref([]);
  const isLoading = ref(false);

  const getFilteredProducts = async (text = "") => {
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

  const sdeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      allProducts.value = allProducts.value.filter((item) => item.id !== id);
    } catch (error) {
      console.log("ADD_ERROR", error);
    }
  };

  const saddProduct = async (product) => {
    try {
      await addProduct(product);
      allProducts.value.push(product);
    } catch (error) {
      console.log("ADD_ERROR", error);
    }
  };

  const getAllProducts = async () => {
    const res = await getProducts2();
    allProducts.value = res.data;
  };

  return {
    allProducts,
    isLoading,
    getFilteredProducts,
    getAllProducts,
    sdeleteProduct,
    saddProduct,
  };
});
