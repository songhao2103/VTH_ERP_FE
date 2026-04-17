import DataTableFeaturePage from "@/modules/demo/data-grid/DemoDataGridPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/demo/data-grid")({
  component: DataTableFeaturePage,
});
