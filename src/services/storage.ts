export const STORAGE_KEYS = {
  USER: "USER",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;

export const StorageService = {
  getData<TData>(key: StorageKey): TData | null {
    const item = localStorage.getItem(STORAGE_KEYS[key]);
    if (!item) return null;
    try {
      return JSON.parse(item) as TData;
    } catch (error) {
      console.error(`Error parsing data for key ${STORAGE_KEYS[key]}:`, error);
      return null;
    }
  },
  setData<TData>(key: StorageKey, data: TData): void {
    try {
      const item = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEYS[key], item);
    } catch (error) {
      console.error(
        `Error stringifying data for key ${STORAGE_KEYS[key]}:`,
        error,
      );
    }
  },
  removeData(key: StorageKey): void {
    localStorage.removeItem(STORAGE_KEYS[key]);
  },

  clearAll: () => {
    localStorage.clear();
  },
};
