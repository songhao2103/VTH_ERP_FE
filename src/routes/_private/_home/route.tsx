import HomePage from "@/modules/home/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/_home")({
  component: HomePage,
});
