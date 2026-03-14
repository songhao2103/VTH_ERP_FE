import PrivateLayout from "@/layouts/PrivateLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  component: () => (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ),
});
