import { useMemo } from "react";
import { useDropdownRootContext } from "../context/DropdownRootContext";

export const useDropdown = () => {
  const context = useDropdownRootContext();

  return useMemo(
    () => ({
      id: context.id,
      parentId: context.parentId,
      open: context.open,
      trigger: context.trigger,
      placement: context.placement,
      animationDuration: context.animationDuration,
      openDelay: context.openDelay,
      closeDelay: context.closeDelay,
      offset: context.offset,
      disabled: context.disabled,
      closeOnOutsideClick: context.closeOnOutsideClick,
      closeOnEscape: context.closeOnEscape,
      triggerRef: context.triggerRef,
      contentRef: context.contentRef,
      openDropdown: context.openDropdown,
      closeDropdown: context.closeDropdown,
      toggleDropdown: context.toggleDropdown,
      scheduleOpen: context.scheduleOpen,
      scheduleClose: context.scheduleClose,
      cancelScheduled: context.cancelScheduled,
      isWithinContent: context.isWithinContent,
    }),
    [context],
  );
};
