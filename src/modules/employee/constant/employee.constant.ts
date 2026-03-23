import type {
  EmployeeRow,
  EmployeeStatus,
} from "@/modules/employee/types/employee.type.client";

const firstNames = [
  "An",
  "Bình",
  "Chi",
  "Dũng",
  "Giang",
  "Hải",
  "Hương",
  "Khanh",
  "Linh",
  "Long",
  "Minh",
  "My",
  "Nam",
  "Ngân",
  "Nhung",
  "Phúc",
  "Quân",
  "Trang",
  "Tú",
  "Vy",
];

const lastNames = [
  "Nguyễn",
  "Trần",
  "Lê",
  "Phạm",
  "Hoàng",
  "Huỳnh",
  "Võ",
  "Phan",
  "Đặng",
  "Bùi",
];

const departments = [
  "Finance",
  "HR",
  "Sales",
  "Procurement",
  "Warehouse",
  "IT",
  "Operations",
  "Customer Service",
];

const titles = [
  "Specialist",
  "Senior Specialist",
  "Supervisor",
  "Team Lead",
  "Manager",
  "Executive",
];

const cities = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng"];

const statuses: EmployeeStatus[] = ["active", "inactive", "on_leave"];

function pick<T>(items: T[], index: number) {
  return items[index % items.length];
}

export function makeEmployees(count: number): EmployeeRow[] {
  return Array.from({ length: count }, (_, index) => {
    const firstName = pick(firstNames, index);
    const lastName = pick(lastNames, index * 3);
    const fullName = `${lastName} ${firstName}`;

    return {
      id: `emp-${index + 1}`,
      employeeCode: `EMP${String(index + 1).padStart(5, "0")}`,
      fullName,
      email: `${firstName.toLowerCase()}.${index + 1}@erp.local`,
      department: pick(departments, index * 2),
      title: pick(titles, index * 5),
      city: pick(cities, index * 7),
      salary: 9000000 + ((index * 375000) % 45000000),
      status: pick(statuses, index * 11),
    };
  });
}
