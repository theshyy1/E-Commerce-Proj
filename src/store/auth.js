import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getAllUsers, signin } from "../services/http";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  // State
  const loginUser = reactive({
    isLoggin: false,
    token: null,
    user: null,
  });
  const allUsers = ref([]);

  // Actions
  const login = async (user) => {
    try {
      const res = await signin(user);
      const data = res.data;

      if (data && data.accessToken && data.user) {
        loginUser.token = data.accessToken;
        loginUser.user = data.user;
        loginUser.isLoggin = true;
        return data;
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    loginUser.isLoggin = false;
    loginUser.user = null;
    loginUser.token = null;

    router.push({ path: "/signin" });
  };

  const getUsers = async () => {
    const res = await getAllUsers();
    allUsers.value = res.data;
  };

  return { loginUser, allUsers, login, logout, getUsers };
});
