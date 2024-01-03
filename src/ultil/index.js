import { useRoute, useRouter } from "vue-router";

export const route = useRoute();
export const router = useRouter();

export const getNewestPrice = (price) => {
  return price * 0.85;
};
