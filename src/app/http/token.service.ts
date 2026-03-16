import { STORAGE_KEY } from "@/shared/constants/storageKey";
import {
  getLocalStorageData,
  removeLocalStorageData,
  setLocalStorageData,
} from "@/shared/storage/localStorage";

export const tokenService = {
  getAccessToken() {
    return getLocalStorageData<string>(STORAGE_KEY.ACCESS_TOKEN) || null;
  },

  getRefreshToken() {
    return getLocalStorageData<string>(STORAGE_KEY.REFRESH_TOKEN) || null;
  },

  setTokens(accessToken: string, refreshToken?: string) {
    setLocalStorageData(STORAGE_KEY.ACCESS_TOKEN, accessToken);

    if (refreshToken) {
      setLocalStorageData(STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    }
  },

  clearTokens() {
    removeLocalStorageData(STORAGE_KEY.ACCESS_TOKEN);
    removeLocalStorageData(STORAGE_KEY.REFRESH_TOKEN);
  },
};
