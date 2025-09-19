export const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_DEV_BASE_URL.VITE_PROD_BASE_URL
    : import.meta.env.VITE_DEV_BASE_URL;
