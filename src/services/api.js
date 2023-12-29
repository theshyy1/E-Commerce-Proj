import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 4000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Server error:", error.response.data);
      alert(error.response.data);
    } else if (error.request) {
      console.error("No response from server");
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response from server");
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
