import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
console.log(api.defaults.baseURL);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);