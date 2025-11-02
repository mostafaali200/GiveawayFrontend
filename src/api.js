import axios from "axios";

// ✅ هذا يختار الرابط الصحيح تلقائيًا
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:7143/api",
  headers: {
    "Content-Type": "application/json",
  },
});
