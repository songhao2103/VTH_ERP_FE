export type EmployeeStatus = "active" | "inactive" | "on_leave";

export interface EmployeeRow {
  id: string;
  employeeCode: string;
  fullName: string;
  email: string;
  department: string;
  title: string;
  city: string;
  salary: number;
  status: EmployeeStatus;
}
