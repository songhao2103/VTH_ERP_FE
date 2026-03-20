import { authGuard } from "@/app/guards/authGuard";
import PrivateLayout from "@/layouts/PrivateLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  component: () => (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ),
  beforeLoad: async ({ context }) => {
    await authGuard(context.auth);
  },
});
