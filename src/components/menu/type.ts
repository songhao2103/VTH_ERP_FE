/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { TIconName } from "@/icons/constant";
import type { ReactNode } from "react";

export interface IMenuProps {}

export interface IMenuContext {
  props: IMenuProps;
  setOpenAccordion: (path: string) => void;
  isOpenAccordion: (path: string) => boolean;
}

export interface IMenuItemConfig {
  /**
   * Tiêu đề hiển thị của menu.
   */
  title?: string;

  /**
   * Nếu true thì menu sẽ bị disable (không click được).
   */
  disabled?: boolean;

  /**
   * Tiêu đề của nhóm menu (dùng để phân chia các section).
   */
  heading?: string;

  /**
   * Icon hiển thị cùng menu (tên icon hoặc class icon).
   */
  icon?: TIconName;

  /**
   * Badge hiển thị bên phải menu (ví dụ: NEW, HOT, số thông báo).
   */
  badge?: string;

  /**
   * Hiển thị đường kẻ phân cách giữa các menu item.
   */
  separator?: boolean;

  /**
   * Đường dẫn route khi click vào menu.
   */
  path?: string;

  /**
   * Root path dùng để xác định trạng thái active
   * cho các route con.
   */
  rootPath?: string;

  /**
   * Hiển thị dấu chấm (bullet) thay vì icon.
   */
  bullet?: boolean;

  /**
   * Xác định menu có thể đóng/mở (collapse) khi có submenu.
   */
  collapse?: boolean;

  /**
   * Tiêu đề hiển thị khi menu đang ở trạng thái thu gọn.
   */
  collapseTitle?: string;

  /**
   * Tiêu đề hiển thị khi menu đang ở trạng thái mở rộng.
   */
  expandTitle?: string;

  /**
   * Cấu hình hành vi toggle của menu (ví dụ: click hoặc hover).
   */
  //   toggle?: TMenuItemToggle;

  /**
   * Cấu hình dropdown của menu item.
   */
  //   dropdownProps?: TMenuDropdown;

  /**
   * Cách kích hoạt menu (click / hover).
   */
  //   trigger?: TMenuItemTrigger;

  /**
   * Danh sách menu con (submenu).
   */
  children?: IMenuItemConfig[];

  /**
   * Vị trí index của item trong danh sách children.
   */
  childrenIndex?: number;

  /**
   * Nếu true thì menu chỉ hiển thị cho admin.
   */
  isOnlyForAdmin?: boolean;

  /**
   * Mở trang ở 1 tab khác
   */
  blank?: boolean;
}

export interface IMenuProviderProps {
  children: ReactNode;
}

export interface IMenuItemProps {
  item: IMenuItemConfig;
  level: number;
  hasChildren: boolean;
  isOpen: boolean;
}

export interface IMenuNodeProps {
  item: IMenuItemConfig;
  level: number;
}

export interface IMenuArrowProps {
  isOpen: boolean;
}

export interface IMenuLabelProps {
  title: string;
  className: string;
  isBlank?: boolean;
  path?: string;
  handleClick?: () => void;
}

export interface IMenuIconProps {
  icon?: TIconName;
}
