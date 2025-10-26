import axios from "axios";
import { BASE_URL } from "../environment";

const createApiClient = () => {
  const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10 * 1000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return apiClient;
};

export const apiClient = createApiClient();
