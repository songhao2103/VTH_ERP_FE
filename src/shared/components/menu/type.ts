/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { TIconName } from "@/icons/constant";
import type { ReactNode } from "react";

export type TMenuTheme = "dark" | "light";

export interface IMenuProps {
  collapsed?: boolean;
  isAdmin?: boolean;
  className?: string;
  menus: IMenuItemConfig[];
}

export interface IMenuContext {
  props: IMenuProps;
  items: IMenuItemConfig[];
  pathname: string;
  isCollapsed: boolean;
  isAdmin: boolean;
  toggleAccordion: (path: string) => void;
  openAccordion: (path: string) => void;
  closeAllAccordions: () => void;
  isOpenAccordion: (path: string) => boolean;
}

export interface IMenuItemConfig {
  title?: string;
  disabled?: boolean;
  heading?: string;
  icon?: TIconName;
  badge?: string;
  separator?: boolean;
  path?: string;
  rootPath?: string;
  bullet?: boolean;
  collapse?: boolean;
  collapseTitle?: string;
  expandTitle?: string;
  children?: IMenuItemConfig[];
  childrenIndex?: number;
  isOnlyForAdmin?: boolean;
  blank?: boolean;
}

export interface IMenuProviderProps {
  children: ReactNode;
  items: IMenuItemConfig[];
  isCollapsed?: boolean;
  isAdmin?: boolean;
}

export interface IMenuInnerProps {
  items?: IMenuItemConfig[];
  theme?: TMenuTheme;
}

export interface IMenuItemProps {
  item: IMenuItemConfig;
  level: number;
  hasChildren: boolean;
  isOpen: boolean;
  theme: TMenuTheme;
}

export interface IMenuNodeProps {
  item: IMenuItemConfig;
  level: number;
  theme: TMenuTheme;
}

export interface IMenuArrowProps {
  isOpen: boolean;
  className?: string;
}

export interface IMenuLabelProps {
  title: string;
  className?: string;
}

export interface IMenuIconProps {
  icon?: TIconName;
  fallback?: string;
  active?: boolean;
  className?: string;
}

export interface ICollapsedMenuProps {
  items: IMenuItemConfig[];
}

export interface IFlyoutMenuProps {
  items: IMenuItemConfig[];
  level?: number;
}

export interface IMobileMenuProps {
  items: IMenuItemConfig[];
}
