import type { FC } from "react";
import type { ButtonInterface } from "../../../interfaces";
import Button from "./Button";

const Cancel: FC<ButtonInterface> = ({
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <Button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`${className} rounded-xl bg-red-700 px-4 py-1 font-bold transition-colors duration-300 hover:bg-red-800`}
    >
      Cancel
    </Button>
  );
};

export default Cancel;
