export interface Pagination {
  pageIndex: number;
  pageSize: number;
}

export interface Filters {
  searchKey?: string;
}

export interface FiltersApi extends Pagination, Filters {}
