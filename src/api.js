// src/api.ts
import axios from "axios";

// ✅ إعداد Axios بشكل صحيح مع البيئة
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:7143",
  headers: {
    "Content-Type": "application/json",
  },
});
