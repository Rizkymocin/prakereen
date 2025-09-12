import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

export const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// interceptor ambil token dari store
api.interceptors.request.use((config) => {
   const token = useAuthStore.getState().token; // pakai getState
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});
