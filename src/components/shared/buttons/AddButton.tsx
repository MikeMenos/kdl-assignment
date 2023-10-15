import type { FC } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import type { ButtonInterface } from "../../../interfaces";
import Button from "./Button";

const AddButton: FC<ButtonInterface> = ({
  onlyIcon = false,
  type = "button",
  onlyText = false,
  children = "Add",
  onClick,
  className,
  size = "1.5rem",
  disabled = false,
  loading,
}) => {
  return (
    <Button
      loading={loading}
      disabled={disabled || loading}
      onlyIcon={onlyIcon}
      type={type}
      icon={!onlyText ? <IoMdAddCircleOutline size={size} /> : undefined}
      onClick={onClick}
      className={`${className} rounded-xl ${
        loading ? "bg-greenHover" : "bg-green"
      } ${
        onlyIcon ? "px-2" : "px-4"
      } py-1 font-bold transition-colors duration-300 hover:bg-greenHover`}
    >
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default AddButton;
