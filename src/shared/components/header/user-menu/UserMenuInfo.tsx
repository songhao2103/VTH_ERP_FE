import { toAbsoluteUrl } from "@/shared/utils/image";
import clsx from "clsx";

const UserMenuInfo = () => {
  return (
    <div className="flex justify-center gap-x-4 items-center">
      <div className="p-1 rounded-full border">
        <img src={toAbsoluteUrl("")} className={clsx("w-5 h-5 rounded-full")} />
      </div>

      <p>Phan Song Hào</p>
    </div>
  );
};

export default UserMenuInfo;
