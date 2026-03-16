import { ProfileForm } from "@/shared/components/form/demo";

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center w-full h-[97vh]">
      <div className="w-100 shadow-lg rounded-lg p-4 border border-gray-300">
        <p className="text-center text-3xl font-bold my-4">VTH ERP</p>

        <ProfileForm />
      </div>
    </div>
  );
};

export default LoginForm;
