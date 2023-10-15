import { type FC, type SyntheticEvent } from "react";
import { type ChildrenType } from "../../interfaces";
import AddButton from "./buttons/AddButton";
import CancelButton from "./buttons/CancelButton";

interface PropsInterface extends ChildrenType {
  className?: string;
  onSubmit?: (e: SyntheticEvent) => void;
  onClose: VoidFunction;
  submitBtnVisible?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const Form: FC<PropsInterface> = ({
  children,
  className,
  onSubmit,
  submitBtnVisible = true,
  disabled,
  onClose,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
      {submitBtnVisible && (
        <div className="flex w-full justify-end">
          <CancelButton className="text-md mr-4 mt-12" onClick={onClose} />
          <AddButton
            disabled={disabled}
            onlyText
            type="submit"
            className="text-md mr-6 mt-12"
            loading={isLoading}
          >
            {isLoading ? "Loading..." : "Confirm"}
          </AddButton>
        </div>
      )}
    </form>
  );
};

export default Form;
