import type { FC } from "react";
import { GrRefresh } from "react-icons/gr";
import Button from "./Button";
import type { ButtonInterface } from "../../../interfaces";

const RefreshIcon: FC<ButtonInterface> = ({
  className,
  onClick,
  show = true,
  children,
}) => {
  if (!show) {
    return null;
  }

  return (
    <Button
      type={"button"}
      icon={<GrRefresh />}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default RefreshIcon;
