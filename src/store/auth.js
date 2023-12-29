import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getAllUsersAPI, signinAPI } from "../services/http";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  // State
  const userState = reactive({
    isLoggin: false,
    token: null,
    user: null,
  });
  const allUsers = ref([]);

  // Actions
  const login = async (user) => {
    const res = await signinAPI(user);
    const data = res.data;
    try {
      if (data && data.accessToken && data.user) {
        userState.token = data.accessToken;
        userState.user = data.user;
        userState.isLoggin = true;
        if (data.user.role === "1") {
          router.push({ path: "/admin" });
        } else {
          router.push({ path: "/" });
        }
      }
    } catch (error) {
      console.error("Error Login:", error);
    }
  };

  const logout = () => {
    userState.isLoggin = false;
    userState.user = null;
    userState.token = null;

    router.push({ path: "/signin" });
  };

  const getUsers = () => {
    getAllUsersAPI().then((data) => {
      allUsers.value = data.data;
    });
  };

  return { userState, allUsers, login, logout, getUsers };
});
