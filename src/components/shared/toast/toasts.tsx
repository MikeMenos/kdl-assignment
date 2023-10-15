import toast, { type Toast } from "react-hot-toast";
import Button from "../buttons/Button";

export const successToast = (message: string) => {
  return toast.success(message);
};

export const errorToast = (message: string) => {
  return toast.error(message);
};

export const modalToast = () => {
  const onClick = (t: Toast) => {
    toast.dismiss(t.id);
  };
  return toast(
    (t) => {
      return (
        <>
          <p className="mr-10">Are you sure you want to delete this user?</p>
          <Button
            className="rounded-xl bg-red-500 px-4 font-semibold text-white"
            onClick={() => onClick(t)}
          >
            Delete
          </Button>
        </>
      );
    },
    {
      duration: 9999999,
    }
  );
};
