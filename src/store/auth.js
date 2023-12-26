import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const loginUser = reactive({
    isLoggin: false,
    token: null,
    user: null,
  });

  const login = async (user) => {
    try {
      const res = await axios.post("http://localhost:3000/signin", user);
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

  const logout = async () => {
    loginUser.isLoggin = false;
    loginUser.user = null;
    loginUser.token = null;

    router.push({ path: "/signin" });
  };

  return { loginUser, login, logout };
});
