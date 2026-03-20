export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  IT: "IT",
} as const;

export type UserRole = keyof typeof USER_ROLES;
