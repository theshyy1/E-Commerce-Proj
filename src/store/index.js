import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  getProducts2API,
  deleteProductAPI,
  addProductAPI,
  getProductAPI,
  getProductsAPI,
} from "../services/http";

export const useProductStore = defineStore("products", () => {
  const allProducts = ref([]);
  const isLoading = ref(false);

  const getFilteredProducts = async (text = "") => {
    if (text.trim) {
      isLoading.value = true;
      const res = await getProductsAPI();
      const data = await res.data;
      allProducts.value = data;
      isLoading.value = false;
    } else {
      try {
        isLoading.value = true;
        getProductAPI().then((data) => {
          console.log(data);
          allProducts.value = data;
          isLoading.value = false;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductAPI(id);
      allProducts.value = allProducts.value.filter((item) => item.id !== id);
    } catch (error) {
      console.log("ADD_ERROR", error);
    }
  };

  const addProduct = async (product) => {
    try {
      await addProductAPI(product);
      allProducts.value.push(product);
    } catch (error) {
      console.log("ADD_ERROR", error);
    }
  };

  const getAllProducts = () => {
    getProducts2API().then(({ data }) => {
      allProducts.value = data;
    });
  };

  return {
    allProducts,
    isLoading,
    getFilteredProducts,
    getAllProducts,
    deleteProduct,
    addProduct,
  };
});
