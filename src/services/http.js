import instance from "./api";

export const getProducts = async () => {
  return await instance.get("/products");
};

export const getProducts2 = async () => {
  return await instance.get("/products");
};

export const register = async (user) => {
  try {
    return await instance.post("/register", user);
  } catch (error) {
    console.log("SIGNUP_ERROR", error);
  }
};

export const signin = async (user) => {
  try {
    return await instance.post("/signin", user);
  } catch (error) {
    console.log("SIGNIN_ERROR", error);
  }
};

export const updateUser = async (user) => {
  try {
    return await instance.patch(`/users/${user.id}`, user);
  } catch (error) {
    console.log("UPDATE_USER_ERROR", error);
  }
};

export const getProduct = async (id) => {
  try {
    return await instance.get(`/products/${id}`);
  } catch (error) {
    console.log("GET_PRODUCT_ERROR", error);
  }
};

export const addProduct = async (product) => {
  try {
    return await instance.post("/products", product);
  } catch (error) {
    console.log("ADD_PRODUCT_ERROR", error);
  }
};

export const deleteProduct = async (id) => {
  try {
    return await instance.delete(`/products/${id}`);
  } catch (error) {
    console.log("DELETE_PRODUCT_ERROR", error);
  }
};

export const getAllUsers = async () => {
  try {
    return await instance.get(`/users`);
  } catch (error) {
    console.log("GET_USERS_ERROR", error);
  }
};
