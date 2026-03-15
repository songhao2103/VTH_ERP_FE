import UserMenuDropdown from "@/shared/components/header/user-menu/UserMenuDropdown";
import UserMenuInfo from "@/shared/components/header/user-menu/UserMenuInfo";
import { Popper } from "@/shared/components/popper";

const UserMenu = () => {
  return (
    <div>
      <Popper trigger="click" placement="bottom-end">
        <Popper.Trigger className="group">
          <UserMenuInfo />
        </Popper.Trigger>

        <Popper.Content className="w-64">
          <UserMenuDropdown />
        </Popper.Content>
      </Popper>
    </div>
  );
};

export default UserMenu;
