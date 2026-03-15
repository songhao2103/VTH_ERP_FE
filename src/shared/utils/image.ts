import { ENVIROMENTS } from "@/shared/constants/enviroment.constant";

export const toAbsoluteUrl = (pathname?: string): string => {
  const baseDomain = ENVIROMENTS.domain;
  return pathname
    ? baseDomain + pathname
    : "/images/defaults/avatar-default.png";
};
