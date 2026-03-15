import { DropdownRoot } from "./DropdownRoot";
import { DropdownTrigger } from "./DropdownTrigger";
import { DropdownContent } from "./DropdownContent";
import { DropdownItem } from "./DropdownItem";
import { DropdownSeparator } from "./DropdownSeparator";
import { DropdownGroup } from "./DropdownGroup";

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Separator: DropdownSeparator,
  Group: DropdownGroup,
});
