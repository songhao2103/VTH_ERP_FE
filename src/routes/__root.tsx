/////////////////////////////////////////////////////////////////////////////////////
//======     Layout gốc cho toàn app     ========
/////////////////////////////////////////////////////////////////////////////////////
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
// import type { AuthStore } from "@/app/store/authStore";

// import { AppErrorFallback } from "@/shared/components/feedback/AppErrorFallback";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RouterAppContext {
  //   auth: AuthStore;
  //   queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  errorComponent: ({ error }) => <>Lỗi {error.message}</>,
  notFoundComponent: () => <div>404 - Không tìm thấy trang</div>,
});
