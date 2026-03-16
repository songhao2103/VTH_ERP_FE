import { ENVIRONMENTS } from "@/shared/constants/enviroment.constant";

export const toAbsoluteUrl = (pathname?: string): string => {
  const baseDomain = ENVIRONMENTS.domain;
  return pathname
    ? baseDomain + pathname
    : "/images/defaults/avatar-default.png";
};
