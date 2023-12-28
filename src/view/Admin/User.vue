<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
onMounted(() => authStore.getUsers());

const allUsers = computed(() => authStore.allUsers);

// Show / hide options
const selectedUser = ref(null);
function handleShow(id) {
  selectedUser.value = selectedUser.value === id ? "null" : id;
}

const handleDeleteUser = (id) => {
  toast.error("Deleted successfully", {
    position: "bottom-right",
    autoClose: 1500,
    theme: "colored",
  });
};
</script>

<template>
  <div class="h-[800px] overflow-y-scroll">
    <h1 class="text-4xl font-bold text-blue-700 mt-[30px]">User Management</h1>
    <button
      class="block ml-auto bg-transparent text-blue-700 border-2 border-blue-700 py-2 px-6 mb-4 rounded-r-full rounded-l-full hover:opacity-60"
    >
      <RouterLink to="/admin/products/create">Add New</RouterLink>
      <i class="fa-solid fa-plus ml-2"></i>
    </button>
    <div class="flex justify-around items-center flex-wrap">
      <div
        v-for="user in allUsers"
        :key="user.id"
        class="w-[340px] h-[150px] flex justify-around items-center bg-white text-black rounded shadow-md mb-3"
      >
        <section class="flex items-center">
          <img
            src="https://picsum.photos/80/80"
            class="object-cover rounded-full mr-5 shadow-md"
            alt=""
          />
          <article class="">
            <h3 class="text-xl">{{ user.name }}</h3>
            <p class="text-sm my-2">
              <i class="fa-solid fa-envelope-open-text mr-2"></i
              >{{ user.email }}
            </p>
            <span><i class="fa-solid fa-phone mr-2"></i>{{ user.phone }}</span>
          </article>
        </section>
        <span
          class="relative text-xl p-2 cursor-pointer"
          @click="handleShow(user.id)"
        >
          <i class="fa-solid fa-ellipsis-vertical"></i>
          <transition name="fade">
            <div
              v-show="selectedUser === user.id"
              class="absolute top-[40px] right-[0] w-[90px] shadow-sm text-sm border-[1px] bg-white flex flex-col"
            >
              <button
                class="text-black hover:bg-orange-500 hover:text-white px-2 py-1"
              >
                <i class="fa-solid fa-pen-nib"></i>
                Update
              </button>
              <button
                class="text-black hover:bg-orange-500 hover:text-white px-2 py-1"
                @click="handleDeleteUser(user.id)"
              >
                <i class="fa-solid fa-delete-left"></i>
                Delete
              </button>
            </div>
          </transition>
        </span>
      </div>
    </div>
  </div>
</template>
