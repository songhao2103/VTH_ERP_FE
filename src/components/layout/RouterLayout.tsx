import type { LayoutProps } from "@/components/layout/type";
import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/hello",
    element: <div>Hello World</div>,
  },
]);
const RouterLayout: React.FC<LayoutProps> = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default RouterLayout;
{
}
