/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActiveFilter } from "./DataFilters";

/**
 * Tính số thứ tự (STT) dựa trên trang hiện tại, số dòng mỗi trang và index của dòng
 * @param page - Trang hiện tại (bắt đầu từ 1)
 * @param rowsPerPage - Số dòng mỗi trang
 * @param index - Index của dòng trong trang hiện tại (bắt đầu từ 0)
 * @returns Số thứ tự (STT)
 * @example
 * // Trang 1, 10 dòng/trang, index 0 -> STT = 1
 * // Trang 1, 10 dòng/trang, index 9 -> STT = 10
 * // Trang 2, 10 dòng/trang, index 0 -> STT = 11
 * calculateRowNumber(2, 10, 0) // returns 11
 */
export const calculateRowNumber = (
  page: number,
  rowsPerPage: number,
  index: number,
): number => {
  return (page - 1) * rowsPerPage + index + 1;
};

/**
 * Chuyển đổi applied filters sang định dạng filter object cho API
 * Sử dụng switch case để xử lý các trường hợp đặc biệt, dễ dàng mở rộng sau này
 * @param appliedFilters - Mảng các filter đã được áp dụng
 * @param filterFieldMap - Map từ fieldId sang tên field trong API
 * @returns Filter object để gửi lên API, hoặc undefined nếu không có filter
 * @example
 * const filterObject = convertFiltersToApiFormat(appliedFilters, {
 *   region: 'saleRegion',
 *   date: 'createdAt'
 * });
 */
export const convertFiltersToApiFormat = (
  appliedFilters: ActiveFilter[],
  filterFieldMap: Record<string, string> = {},
): Record<string, any> | undefined => {
  if (appliedFilters.length === 0) return undefined;

  const filter: Record<string, any> = {};

  appliedFilters.forEach((filterItem) => {
    const { fieldId, value } = filterItem;
    const apiFieldName = filterFieldMap[fieldId] || fieldId;

    // Sử dụng switch case để xử lý các trường hợp đặc biệt
    switch (fieldId) {
      case "date":
        // Date filter: giữ nguyên timestamp (number)
        if (typeof value === "number") {
          filter[apiFieldName] = value;
        }
        break;

      case "region":
        if (Array.isArray(value)) {
          filter[apiFieldName] = value;
        } else {
          filter[apiFieldName] = [value];
        }
        break;

      case "distributor":
        // Distributor filter: gộp mã và tên nhà phân phối
        // Gửi vào distributorCode (API sẽ tìm trong cả code và name)
        if (Array.isArray(value)) {
          filter.distributorCode = value;
        } else {
          filter.distributorCode = [value];
        }
        break;

      default:
        // Tất cả các filter select khác đều gửi dưới dạng mảng
        if (Array.isArray(value)) {
          filter[apiFieldName] = value;
        } else {
          filter[apiFieldName] = value;
        }
        break;
    }
  });

  return Object.keys(filter).length > 0 ? filter : undefined;
};
