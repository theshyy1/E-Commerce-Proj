<script setup>
import { reactive } from "vue";
import { toast } from "vue3-toastify";
import { useProductStore } from "../../store";
import Joi from "joi";
import { useRouter } from "vue-router";
import { addProductAPI } from "../../services/http";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantityInStock: Joi.number().min(0).required(),
  image: Joi.string().uri().required(),
});

const router = useRouter();
const store = useProductStore();

const newProduct = reactive({
  name: "",
  price: 0,
  quantityInStock: 0,
  image: "",
});

const handleSubmit = async () => {
  try {
    const { error, value } = productSchema.validate(newProduct);
    if (error) {
      toast.error("Error: " + error.message, {
        autoClose: 3000,
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }

    const product = {
      ...value,
    };
    await addProductAPI(product);
    await router.push({ path: "/admin/products", replace: true });
    toast.success("Added successfully", {
      autoClose: 1500,
      position: "bottom-right",
      theme: "colored",
    });
  } catch (error) {
    console.error("Error adding product:", error);
  }
};
</script>

<template>
  <div class="container">
    <h1 class="text-center text-4xl shadow-sm">Form ADD</h1>
    <form @submit.prevent="handleSubmit">
      <div class="my-3">
        <p>Name*</p>
        <input
          type="text"
          placeholder="...Name"
          v-model="newProduct.name"
          class="py-2 px-3 bg-neutral-300 w-[400px] mt-2 shadow-md"
        />
      </div>
      <div class="my-3">
        <p>Price*</p>
        <input
          type="text"
          placeholder="..."
          v-model="newProduct.price"
          class="py-2 px-3 bg-neutral-300 w-[400px] mt-2 shadow-md"
        />
      </div>
      <div class="my-3">
        <p>Quantity In Stock*</p>
        <input
          type="text"
          placeholder="..."
          v-model="newProduct.quantityInStock"
          class="py-2 px-3 bg-neutral-300 w-[400px] mt-2 shadow-md"
        />
      </div>
      <div class="my-3">
        <p>Image*</p>
        <input
          type="text"
          placeholder="..."
          v-model="newProduct.image"
          class="py-2 px-3 bg-neutral-300 w-[400px] mt-2 shadow-md"
        />
      </div>

      <button class="py-3 px-5 bg-orange-500 text-white rounded">ADD</button>
    </form>
  </div>
</template>
