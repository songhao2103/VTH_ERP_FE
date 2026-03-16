import LoginForm from "@/modules/auth/components/LoginForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/auth/login")({
  component: LoginForm,
});
