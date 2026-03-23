/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, type FileRoutesByPath } from "@tanstack/react-router";

export type FileRouteOptions<TPath extends keyof FileRoutesByPath> = Parameters<
  ReturnType<typeof createFileRoute<TPath>>
>[0];

/**
 * Builder chuẩn: truyền path trước để TypeScript khóa đúng route path,
 * tránh bị union toàn bộ keyof FileRoutesByPath.
 */
export function buildPageRouteOptions<TPath extends keyof FileRoutesByPath>(
  _path: TPath,
  options: FileRouteOptions<TPath>,
): FileRouteOptions<TPath> {
  return options;
}

/**
 * Phiên bản có default options dùng chung.
 */
export function buildPageRouteOptionsWithDefaults<
  TPath extends keyof FileRoutesByPath,
>(_path: TPath, options: FileRouteOptions<TPath>): FileRouteOptions<TPath> {
  return {
    pendingComponent: DefaultPendingComponent,
    notFoundComponent: DefaultNotFoundComponent,
    ...options,
  };
}

export function DefaultPendingComponent() {
  return <div>Loading...</div>;
}

export function DefaultNotFoundComponent() {
  return <div>Not found</div>;
}
