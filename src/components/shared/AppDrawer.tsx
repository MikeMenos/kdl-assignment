import { type FC } from "react";
import Drawer from "react-modern-drawer";
import type { DrawerInterface } from "../../interfaces";
import Button from "./buttons/Button";
import { AiOutlineClose } from "react-icons/ai";

const AppDrawer: FC<DrawerInterface> = (props) => {
  const { children, show, onClose, className, style, width = "25%" } = props;

  return (
    <Drawer
      direction="right"
      onClose={onClose}
      open={show}
      className={className}
      style={{ ...style, width }}
    >
      <Button
        icon={
          <AiOutlineClose
            color="white"
            size="1.6rem"
            className="font-bold"
            onClick={onClose}
          />
        }
        className="absolute top-3 left-3"
      />
      {children}
    </Drawer>
  );
};

export default AppDrawer;
