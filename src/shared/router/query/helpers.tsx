/* eslint-disable @typescript-eslint/no-unused-vars */
type SearchRecord = Record<string, unknown>;

export function cleanSearch<T extends SearchRecord>(search: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(search).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      return true;
    }),
  ) as Partial<T>;
}

export function resetPage<T extends SearchRecord>(
  prev: T,
): T & { page: number } {
  return {
    ...prev,
    page: 1,
  };
}

export function openModalSearch<T extends SearchRecord>(
  prev: T,
  modal: string,
  id?: string,
): T & { modal: string; id?: string } {
  return {
    ...prev,
    modal,
    id,
  };
}

export function closeModalSearch<T extends SearchRecord>(
  prev: T,
): Omit<T, "modal" | "id"> {
  const { modal, id, ...rest } = prev as T & {
    modal?: unknown;
    id?: unknown;
  };
  return rest;
}

export function setKeywordSearch<T extends SearchRecord>(
  prev: T,
  keyword: string,
): T & { keyword: string; page: number } {
  return {
    ...prev,
    keyword,
    page: 1,
  };
}

export function setPaginationSearch<T extends SearchRecord>(
  prev: T,
  page: number,
  pageSize?: number,
): T & { page: number; pageSize?: number } {
  return {
    ...prev,
    page,
    ...(pageSize !== undefined ? { pageSize } : {}),
  };
}

export function setSortSearch<T extends SearchRecord>(
  prev: T,
  sortBy: string,
  sortOrder: "asc" | "desc" = "asc",
): T & {
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
} {
  return {
    ...prev,
    sortBy,
    sortOrder,
    page: 1,
  };
}
