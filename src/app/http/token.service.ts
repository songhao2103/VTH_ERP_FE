import { STORAGE_KEYS } from "@/services/storage";
import {
  getLocalStorageData,
  removeLocalStorageData,
  setLocalStorageData,
} from "@/shared/storage/localStorage";

export const tokenService = {
  getAccessToken() {
    return getLocalStorageData<string>(STORAGE_KEYS.ACCESS_TOKEN) || null;
  },

  getRefreshToken() {
    return getLocalStorageData<string>(STORAGE_KEYS.REFRESH_TOKEN) || null;
  },

  setTokens(accessToken: string, refreshToken?: string) {
    setLocalStorageData(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

    if (refreshToken) {
      setLocalStorageData(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  },

  clearTokens() {
    removeLocalStorageData(STORAGE_KEYS.ACCESS_TOKEN);
    removeLocalStorageData(STORAGE_KEYS.REFRESH_TOKEN);
  },
};
