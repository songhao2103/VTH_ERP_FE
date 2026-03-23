import type { IMenuItemConfig } from "@/shared/components/menu/type";
import { Route as HomeRoute } from "@/routes/_private/_home/route";
import { Route as EmployeeRoute } from "@/routes/_private/employee/route";

export const menuConfig: IMenuItemConfig[] = [
  {
    heading: "TỔNG QUAN",
  },
  {
    title: "Trang chủ",
    path: HomeRoute.to,
  },
  {
    title: "Nhân viên",
    path: EmployeeRoute.to,
  },
  {
    title: "Báo cáo",
    path: "/reports",
    badge: "NEW",
  },
  {
    separator: true,
  },
  {
    heading: "QUẢN LÝ",
  },
  {
    title: "Người dùng",
    collapse: true,
    rootPath: "/users",
    children: [
      {
        title: "Danh sách người dùng",
        path: "/users",
        childrenIndex: 0,
      },
      {
        title: "Tạo người dùng",
        path: "/users/create",
        childrenIndex: 1,
        badge: "NEW",
      },
      {
        title: "Vai trò",
        path: "/users/roles",
        childrenIndex: 2,
      },
    ],
  },
  {
    title: "Sản phẩm",
    collapse: true,
    rootPath: "/products",
    children: [
      {
        title: "Danh sách sản phẩm",
        path: "/products",
        childrenIndex: 0,
      },
      {
        title: "Thêm sản phẩm",
        path: "/products/create",
        childrenIndex: 1,
      },
      {
        title: "Danh mục",
        path: "/products/categories",
        childrenIndex: 2,
      },
    ],
  },

  {
    separator: true,
  },

  {
    heading: "HỆ THỐNG",
  },
  {
    title: "Cài đặt",
    path: "/settings",
  },
  {
    title: "Quản trị hệ thống",
    path: "/admin",
    isOnlyForAdmin: true,
  },
  {
    title: "Tính năng sắp ra mắt",
    disabled: true,
  },
];
