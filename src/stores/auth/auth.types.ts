import type { UserRole } from "@/shared/constants/user_role";
import type { User } from "@/shared/types/user";

export interface AuthStoreState {
  user: User | null;
  permissions?: string[];
  roles: UserRole[];
}
