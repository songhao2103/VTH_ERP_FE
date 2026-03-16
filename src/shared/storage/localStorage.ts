export const getLocalStorageData = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (!data) return null;

  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error parsing localStorage data for key "${key}":`, error);
    return null;
  }
};

export const setLocalStorageData = <T>(key: string, value: T): void => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (error) {
    console.error(`Error setting localStorage data for key "${key}":`, error);
  }
};

export const removeLocalStorageData = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage data for key "${key}":`, error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
