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
  const res = await instance.post("http://localhost:3000/register", user);
  return res;
};

export const signin = async (user) => {
  const res = await instance.post("http://localhost:3000/signin", user);
  return res;
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
