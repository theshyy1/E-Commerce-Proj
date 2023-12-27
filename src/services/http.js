import instance from "./api";

export const getProducts = async (page, limit) => {
  const res = await instance.get("products", {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return res;
};

export const register = async (user) => {
  try {
    const res = await instance.post("http://localhost:3000/register", user);
    return res;
  } catch (error) {
    console.log("SIGNUP_ERROR", error);
  }
};

export const signin = async (user) => {
  try {
    const res = await instance.post("http://localhost:3000/signin", user);
    return res;
  } catch (error) {
    console.log("SIGNIN_ERROR", error);
  }
};

export const updateUser = async (user) => {
  try {
    const res = await instance.patch(
      `http://localhost:3000/users/${user.id}`,
      user
    );
    return res;
  } catch (error) {
    console.log("UPDATE_ERROR", error);
  }
};

export const getProduct = async (id) => {
  try {
    const res = await instance.get(`http://localhost:3000/products/${id}`);
    return res.data;
  } catch (error) {
    console.log("GET_ERROR", error);
  }
};
