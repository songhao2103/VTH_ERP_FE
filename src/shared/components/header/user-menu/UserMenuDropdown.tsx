import { StorageService } from "@/services/storage";
import { Route as LoginRoute } from "@/routes/_public/auth/login";
import { useNavigate } from "@tanstack/react-router";

const UserMenuDropdown = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => {
          StorageService.clearAll();
          navigate({ to: LoginRoute.to, replace: true });
        }}
      >
        Đăng xuất
      </div>
    </div>
  );
};

export default UserMenuDropdown;
