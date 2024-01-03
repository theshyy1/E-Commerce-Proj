import instance from "./api";

export const getProductsAPI = (page, limit) =>
  instance.get("/products", {
    params: {
      page: page,
      limit: limit,
    },
  });

export const getProducts2API = () => instance.get("/products");

export const registerAPI = (user) => instance.post("/auth/register", user);

export const signinAPI = (user) => instance.post("/auth/login", user);

export const updateUserAPI = (user) => instance.put(`/users/${user._id}`, user);

export const getProductAPI = (id) => instance.get(`/products/${id}`);

export const addProductAPI = (product) =>
  instance.post("products/create", product);

export const deleteProductAPI = (id) => instance.delete(`/products/${id}`);

export const getAllUsersAPI = () => instance.get(`/users`);
