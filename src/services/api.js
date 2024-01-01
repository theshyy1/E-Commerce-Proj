import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/v1/",
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // console.log("Access token expired");
    if (error.response && error.response.status === 401) {
      try {
        // console.log("Restart fresh token");
        const response = await instance.post(
          "http://localhost:8000/v1/auth/refresh"
        );

        const { accessToken } = response.data;
        localStorage.setItem("access_token", accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (error) {
        console.log("Error Happened", error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
