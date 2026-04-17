import { createFormValidator } from "@/shared/components/form/form.utils";
import { useAppForm } from "@/shared/components/form/useAppForm";
import { FROM_LOGIN_DEFAULT_VALUES } from "../constant/auth.constant";
import { formLoginDataSchema } from "../types/auth.type.client";
import { useLogin } from "../api/auth.queries";
import type { ResponseLogin } from "../types/auth.type.api";
import type { User } from "@/shared/types/user";
import { STORAGE_KEYS, StorageService } from "@/services/storage";
import { Route as HomeRoute } from "@/routes/_private/_home/route";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = () => {
  const navigate = useNavigate();

  const { mutate: mtLogin } = useLogin({
    onSuccess: (data: ResponseLogin) => {
      const accessToken = data.token;
      const refreshToken = data.refreshToken;
      const user: User = {
        id: data.user.userId,
        username: data.user.name,
        email: data.user.email,
        account: data.user.username,
        roles: ["ADMIN"],
        avatar: data.user.avartar,
      };
      StorageService.setData<string>(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      StorageService.setData<string>(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      StorageService.setData<User>(STORAGE_KEYS.USER, user);
      navigate({ to: HomeRoute.to });
    },
  });

  const form = useAppForm({
    defaultValues: FROM_LOGIN_DEFAULT_VALUES,
    validators: createFormValidator(formLoginDataSchema),
    onSubmit: (values) => {
      mtLogin({
        userName: values.value.account,
        password: values.value.password,
      });
    },
  });

  return (
    <div className="flex justify-center items-center w-full h-[97vh]">
      <div className="w-100 shadow-lg rounded-lg p-4 border border-gray-300">
        <p className="text-center text-3xl font-bold my-4">VTH ERP</p>

        <form.AppForm>
          <form.FormRoot>
            <form.AppField name="account">
              {(field) => (
                <field.InputBase
                  label="Account"
                  placeholder="Enter your account"
                />
              )}
            </form.AppField>

            <form.AppField name="password">
              {(field) => (
                <field.InputBase
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
              )}
            </form.AppField>

            <form.SubmitButton loadingText="Logging in..." className="w-full">
              Login
            </form.SubmitButton>
          </form.FormRoot>
        </form.AppForm>
      </div>
    </div>
  );
};

export default LoginForm;
