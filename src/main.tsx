import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "antd/dist/reset.css"; // ✅ ضروري لتجنب تعارض الأنماط

// 🎨 إعداد الثيم (الخط والاتجاه)
const theme = extendTheme({
  fonts: {
    heading: `'Cairo', sans-serif`,
    body: `'Cairo', sans-serif`,
  },
  direction: "rtl",
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
