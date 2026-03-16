/////////////////////////////////////////////////////////////////////////////////////
//======     Layout gốc cho toàn app     ========
/////////////////////////////////////////////////////////////////////////////////////
import MainLayout from "@/layouts/MainLayout";
import type { AppRouterContext } from "@/app/router/router.context";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  errorComponent: ({ error }) => <>Lỗi {error.message}</>,
  notFoundComponent: () => <div>404 - Không tìm thấy trang</div>,
});
