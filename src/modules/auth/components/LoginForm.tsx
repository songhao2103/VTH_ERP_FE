import { createFormValidator } from "@/shared/components/form/form.utils";
import { useAppForm } from "@/shared/components/form/useAppForm";
import { FROM_LOGIN_DEFAULT_VALUES } from "../constant/auth.constant";
import { formLoginDataSchema } from "../type/auth.client";
import { useLogin } from "../api/auth.queries";

const LoginForm = () => {
  const { mutate: mtLogin } = useLogin({});
  const form = useAppForm({
    defaultValues: FROM_LOGIN_DEFAULT_VALUES,
    validators: createFormValidator(formLoginDataSchema),
    onSubmit: (values) => {
      mtLogin({
        account: values.value.account,
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
