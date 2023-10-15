import type { FC } from "react";
import { AiFillDelete } from "react-icons/ai";
import type { ButtonInterface } from "../../../interfaces";
import Button from "./Button";

const DeleteButton: FC<ButtonInterface> = ({
  onlyIcon,
  children = "Delete",
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
      type={"button"}
      icon={<AiFillDelete size={size} />}
      onClick={onClick}
      className={`${className} transition-scale duration-200 hover:scale-125`}
    >
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default DeleteButton;
