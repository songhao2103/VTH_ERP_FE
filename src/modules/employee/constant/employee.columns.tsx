import type { EmployeeRow } from "@/modules/employee/types/employee.type.client";
import type { ColumnDef } from "@tanstack/react-table";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export const employeeColumns: ColumnDef<EmployeeRow>[] = [
  {
    accessorKey: "employeeCode",
    id: "employeeCode",
    header: "Mã NV",
    enablePinning: true,
    enableSorting: false,
    meta: {
      basisSize: 180,
      minSize: 160,
      proportional: true,
      cellClassName: ({ value }) =>
        Number(value) > 30000000
          ? "text-emerald-700 dark:text-emerald-300 font-semibold"
          : "text-right",
      headerClassName: "justify-end",
    },
  },
  {
    accessorKey: "fullName",
    header: "Họ tên",
    meta: {
      basisSize: 180,
      minSize: 160,
      proportional: true,
      cellClassName: ({ value }) =>
        Number(value) > 30000000
          ? "text-emerald-700 dark:text-emerald-300 font-semibold"
          : "text-right",
      headerClassName: "justify-end",
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <span className="text-neutral-600 dark:text-neutral-300">
        {String(getValue())}
      </span>
    ),
    meta: {
      basisSize: 180,
      minSize: 160,
      proportional: true,
      cellClassName: ({ value }) =>
        Number(value) > 30000000
          ? "text-emerald-700 dark:text-emerald-300 font-semibold"
          : "text-right",
      headerClassName: "justify-end",
    },
  },
  {
    accessorKey: "department",
    header: "Phòng ban",

    meta: {
      basisSize: 180,
      minSize: 160,
      proportional: true,
      cellClassName: ({ value }) =>
        Number(value) > 30000000
          ? "text-emerald-700 dark:text-emerald-300 font-semibold"
          : "text-right",
      headerClassName: "justify-end",
    },
  },
  {
    accessorKey: "title",
    header: "Chức danh",
    meta: {
      basisSize: 180,
      minSize: 160,
      proportional: true,
      cellClassName: ({ value }) =>
        Number(value) > 30000000
          ? "text-emerald-700 dark:text-emerald-300 font-semibold"
          : "text-right",
      headerClassName: "justify-end",
    },
  },
  {
    accessorKey: "city",
    header: "Khu vực",
    meta: {
      basisSize: 180,
      minSize: 160,
      proportional: true,
      cellClassName: ({ value }) =>
        Number(value) > 30000000
          ? "text-emerald-700 dark:text-emerald-300 font-semibold"
          : "text-right",
      headerClassName: "justify-end",
    },
  },
  {
    accessorKey: "salary",
    header: "Lương",
    meta: {
      basisSize: 180,
      minSize: 160,
      proportional: true,
      cellClassName: ({ value }) =>
        Number(value) > 30000000
          ? "text-emerald-700 dark:text-emerald-300 font-semibold"
          : "text-right",
      headerClassName: "justify-end",
    },
    cell: ({ getValue }) => (
      <span className="font-medium">{formatCurrency(Number(getValue()))}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    meta: {
      basisSize: 180,
      minSize: 160,
      proportional: true,
      cellClassName: ({ value }) =>
        Number(value) > 30000000
          ? "text-emerald-700 dark:text-emerald-300 font-semibold"
          : "text-right",
      headerClassName: "justify-end",
    },
    cell: ({ getValue }) => {
      const value = String(getValue());

      const className =
        value === "active"
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
          : value === "inactive"
            ? "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100"
            : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";

      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${className}`}
        >
          {value}
        </span>
      );
    },
  },
];
