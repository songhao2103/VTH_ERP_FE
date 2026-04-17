import { useMemo, useState } from "react";

// material-ui
import PageContainer from "@/shared/components/containers/PageContainer";
import {
  DataTable,
  type ActionColumn,
  type ActiveFilter,
  type DataTableColumn,
  type FilterField,
  type ToolbarButton,
} from "@/shared/components/table";
import type { BaseRow } from "@/shared/components/table/DataTable";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type UserStatus = "active" | "inactive" | "pending";

interface UserRow extends BaseRow {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Staff";
  department: "Kinh doanh" | "Marketing" | "Vận hành" | "Kỹ thuật";
  status: UserStatus;
  createdAt: number;
  isVerified: boolean;
}

interface DateRangeValue {
  from?: number;
  to?: number;
}

const INITIAL_ROWS: UserRow[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@company.com",
    role: "Admin",
    department: "Kỹ thuật",
    status: "active",
    createdAt: new Date("2026-03-02").getTime(),
    isVerified: true,
  },
  {
    id: 2,
    name: "Trần Minh Châu",
    email: "chau.tran@company.com",
    role: "Manager",
    department: "Kinh doanh",
    status: "pending",
    createdAt: new Date("2026-03-05").getTime(),
    isVerified: false,
  },
  {
    id: 3,
    name: "Lê Hoàng Duy",
    email: "duy.le@company.com",
    role: "Staff",
    department: "Marketing",
    status: "inactive",
    createdAt: new Date("2026-03-08").getTime(),
    isVerified: true,
  },
  {
    id: 4,
    name: "Phạm Gia Hân",
    email: "han.pham@company.com",
    role: "Staff",
    department: "Vận hành",
    status: "active",
    createdAt: new Date("2026-03-10").getTime(),
    isVerified: false,
  },
  {
    id: 5,
    name: "Bùi Khánh Linh",
    email: "linh.bui@company.com",
    role: "Manager",
    department: "Marketing",
    status: "active",
    createdAt: new Date("2026-03-12").getTime(),
    isVerified: true,
  },
  {
    id: 6,
    name: "Đặng Quốc Nam",
    email: "nam.dang@company.com",
    role: "Staff",
    department: "Kỹ thuật",
    status: "pending",
    createdAt: new Date("2026-03-13").getTime(),
    isVerified: false,
  },
];

const FILTER_FIELDS: FilterField[] = [
  {
    id: "status",
    label: "Trạng thái",
    type: "select",
    multiple: true,
    defaultVisible: true,
    options: [
      { value: "active", label: "Đang hoạt động" },
      { value: "inactive", label: "Ngưng hoạt động" },
      { value: "pending", label: "Chờ duyệt" },
    ],
  },
  {
    id: "role",
    label: "Vai trò",
    type: "select",
    multiple: true,
    options: [
      { value: "Admin", label: "Admin" },
      { value: "Manager", label: "Manager" },
      { value: "Staff", label: "Staff" },
    ],
  },
  {
    id: "department",
    label: "Phòng ban",
    type: "select",
    options: [
      { value: "Kinh doanh", label: "Kinh doanh" },
      { value: "Marketing", label: "Marketing" },
      { value: "Vận hành", label: "Vận hành" },
      { value: "Kỹ thuật", label: "Kỹ thuật" },
    ],
  },
  {
    id: "isVerified",
    label: "Xác thực",
    type: "select",
    options: [
      { value: true, label: "Đã xác thực" },
      { value: false, label: "Chưa xác thực" },
    ],
  },
  {
    id: "dateRange",
    label: "Ngày tạo",
    type: "date",
  },
];

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString("vi-VN");

const startOfDay = (timestamp: number) => {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

const endOfDay = (timestamp: number) => {
  const date = new Date(timestamp);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
};

const getStatusLabel = (status: UserStatus) => {
  switch (status) {
    case "active":
      return "Đang hoạt động";
    case "inactive":
      return "Ngưng hoạt động";
    case "pending":
      return "Chờ duyệt";
    default:
      return status;
  }
};

const getStatusColor = (
  status: UserStatus,
): "success" | "default" | "warning" => {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "default";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

const matchesSelectValue = (
  rowValue: string | boolean,
  filterValue: ActiveFilter["value"],
) => {
  if (Array.isArray(filterValue)) {
    return filterValue.includes(rowValue);
  }

  return rowValue === filterValue;
};

const matchesDateRange = (timestamp: number, value: ActiveFilter["value"]) => {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    (!("from" in value) && !("to" in value))
  ) {
    return true;
  }

  const range = value as DateRangeValue;

  if (range.from && timestamp < startOfDay(range.from)) {
    return false;
  }

  if (range.to && timestamp > endOfDay(range.to)) {
    return false;
  }

  return true;
};

const downloadCsv = (rows: UserRow[]) => {
  const header = [
    "ID",
    "Tên",
    "Email",
    "Vai trò",
    "Phòng ban",
    "Trạng thái",
    "Ngày tạo",
    "Xác thực",
  ];

  const body = rows.map((row) => [
    row.id,
    row.name,
    row.email,
    row.role,
    row.department,
    getStatusLabel(row.status),
    formatDate(row.createdAt),
    row.isVerified ? "Đã xác thực" : "Chưa xác thực",
  ]);

  const csv = [header, ...body]
    .map((line) =>
      line.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([`\uFEFF${csv}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data-table-demo.csv";
  link.click();
  URL.revokeObjectURL(url);
};

export default function DataTableFeaturePage() {
  const [rows, setRows] = useState<UserRow[]>(INITIAL_ROWS);
  const [draftFilters, setDraftFilters] = useState<ActiveFilter[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<ActiveFilter[]>([]);
  const [selectedRow, setSelectedRow] = useState<UserRow | null>(null);

  const filteredRows = useMemo(() => {
    if (appliedFilters.length === 0) return rows;

    return rows.filter((row) =>
      appliedFilters.every((filter) => {
        switch (filter.fieldId) {
          case "status":
            return matchesSelectValue(row.status, filter.value);

          case "role":
            return matchesSelectValue(row.role, filter.value);

          case "department":
            return matchesSelectValue(row.department, filter.value);

          case "isVerified":
            return matchesSelectValue(row.isVerified, filter.value);

          case "dateRange":
            return matchesDateRange(row.createdAt, filter.value);

          default:
            return true;
        }
      }),
    );
  }, [rows, appliedFilters]);

  const columns = useMemo<DataTableColumn<UserRow>[]>(
    () => [
      {
        id: "stt",
        label: "STT",
        width: 80,
        align: "center",
        sortable: false,
        searchable: false,
        showRowNumber: true,
      },
      {
        id: "name",
        label: "Họ tên",
        width: 220,
        searchable: true,
        render: (value, row) => (
          <Stack spacing={0.25}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
              }}
            >
              {String(value)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              #{row.id}
            </Typography>
          </Stack>
        ),
      },
      {
        id: "email",
        label: "Email",
        width: 240,
        searchable: true,
      },
      {
        id: "role",
        label: "Vai trò",
        width: 140,
        searchable: true,
      },
      {
        id: "department",
        label: "Phòng ban",
        width: 160,
        searchable: true,
      },
      {
        id: "status",
        label: "Trạng thái",
        width: 160,
        searchable: false,
        render: (value) => (
          <Chip
            size="small"
            label={getStatusLabel(value as UserStatus)}
            color={getStatusColor(value as UserStatus)}
            variant="outlined"
          />
        ),
      },
      {
        id: "isVerified",
        label: "Xác thực",
        width: 140,
        searchable: false,
        render: (value) => (
          <Chip
            size="small"
            label={value ? "Đã xác thực" : "Chưa xác thực"}
            color={value ? "success" : "default"}
            variant={value ? "filled" : "outlined"}
          />
        ),
      },
      {
        id: "createdAt",
        label: "Ngày tạo",
        width: 140,
        searchable: false,
        render: (value) => formatDate(value as number),
      },
    ],
    [],
  );

  const actionColumn = useMemo<ActionColumn<UserRow>>(
    () => ({
      label: "Thao tác",
      width: 180,
      render: (row) => (
        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
          <Button
            size="small"
            variant="text"
            onClick={() => setSelectedRow(row)}
          >
            Xem
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setRows((prev) =>
                prev.map((item) =>
                  item.id === row.id
                    ? {
                        ...item,
                        status:
                          item.status === "active" ? "inactive" : "active",
                      }
                    : item,
                ),
              );
            }}
          >
            Đổi trạng thái
          </Button>
        </Stack>
      ),
    }),
    [],
  );

  const toolbarButtons = useMemo<ToolbarButton[]>(
    () => [
      {
        id: "add",
        label: "Thêm người dùng",
        variant: "contained",
        bgcolor: "primary",
        color: "white",
        icon: "add",
        onClick: () => {
          setRows((prev) => [
            {
              id: prev.length + 1,
              name: `User Demo ${prev.length + 1}`,
              email: `user${prev.length + 1}@company.com`,
              role: "Staff",
              department: "Vận hành",
              status: "pending",
              createdAt: Date.now(),
              isVerified: false,
            },
            ...prev,
          ]);
        },
      },
      {
        id: "export",
        label: "Export CSV",
        variant: "contained",
        color: "secondary",
        icon: "download",
        bgcolor: "white",
        onClick: () => downloadCsv(filteredRows),
      },
      {
        id: "reset-filter",
        label: "Xóa bộ lọc",
        variant: "text",
        color: "error",
        icon: "filter",
        onClick: () => {
          setDraftFilters([]);
          setAppliedFilters([]);
        },
      },
    ],
    [filteredRows],
  );

  return (
    <PageContainer>
      <PageContainer.Header
        title="Danh sách nhân viên"
        description="Quản lý toàn bộ nhân viên trong hệ thống"
        toolbar={{ buttons: toolbarButtons }}
      />

      <PageContainer.Body>
        <DataTable<UserRow>
          filters={{
            availableFields: FILTER_FIELDS,
            activeFilters: draftFilters,
            onFilterChange: setDraftFilters,
            onApplyFilter: () => setAppliedFilters(draftFilters),
          }}
          columns={columns}
          data={filteredRows}
          rowKey="id"
          defaultOrderBy="createdAt"
          defaultOrder="desc"
          defaultRowsPerPage={10}
          rowsPerPageOptions={[5, 10, 20]}
          searchPlaceholder="Tìm theo tên, email, vai trò..."
          onRowClick={(row) => setSelectedRow(row)}
          actionColumn={actionColumn}
        />
      </PageContainer.Body>
    </PageContainer>
  );
}
