import { StrictMode } from "react";
import "./styles/main.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}>{/* <App /> */}</RouterProvider>
  </StrictMode>,
);
