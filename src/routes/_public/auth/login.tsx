import AuthPage from "@/modules/auth/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/auth/login")({
  component: AuthPage,
});
