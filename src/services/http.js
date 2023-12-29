import instance from "./api";

export const getProductsAPI = () => instance.get("/products");

export const getProducts2API = () => instance.get("/products");

export const registerAPI = (user) => instance.post("/register", user);

export const signinAPI = (user) => instance.post("/signin", user);

export const updateUserAPI = (user) =>
  instance.patch(`/users/${user.id}`, user);

export const getProductAPI = (id) => instance.get(`/products/${id}`);

export const addProductAPI = (product) => instance.post("/products", product);

export const deleteProductAPI = (id) => instance.delete(`/products/${id}`);

export const getAllUsersAPI = () => instance.get(`/users`);
