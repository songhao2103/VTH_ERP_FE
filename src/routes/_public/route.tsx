import PublicLayout from "@/layouts/PublicLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: () => (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  ),
});
