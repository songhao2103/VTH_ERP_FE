import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { router } from "./router/router";
import "./styles/main.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
