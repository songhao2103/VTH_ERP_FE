import type { UserRole } from "../constants/user_role";

export interface User {
  id: string;
  username: string;
  email?: string;
  account: string;
  roles: UserRole[];
  avatar?: string;
}
