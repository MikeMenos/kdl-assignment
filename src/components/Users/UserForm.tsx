import {
  type SyntheticEvent,
  type FC,
  type SetStateAction,
  type Dispatch,
} from "react";
import Form from "../shared/Form";
import Input from "../shared/Input";
import { type Row } from "react-table";

interface PropsInterface {
  record: Row["original"];
  setRecord: Dispatch<SetStateAction<object>>;
  onClose: VoidFunction;
  editUser?: any;
  createUser?: any;
  isLoading?: boolean;
}

const UserForm: FC<PropsInterface> = ({
  record,
  setRecord,
  editUser,
  createUser,
  onClose,
  isLoading,
}) => {
  // @ts-ignore
  const { name, id = "", email, companyName } = record;

  const onInputChange = (e: SyntheticEvent) => {
    const { value, name } = e.target as HTMLInputElement;

    setRecord((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    //create or edit logic
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="drawer-form"
      onClose={onClose}
      isLoading={isLoading}
    >
      <div className="mt-20 w-full">
        <Input
          placeholder="Name"
          // @ts-ignore
          value={record?.name ?? ""}
          type="text"
          onChange={onInputChange}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          name="name"
          required
        />
        <Input
          placeholder="Email"
          // @ts-ignore
          value={record?.email ?? ""}
          type="email"
          onChange={onInputChange}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          name="email"
          required
        />
        <Input
          placeholder="Company Name"
          // @ts-ignore
          value={record?.companyName ?? ""}
          type="text"
          onChange={onInputChange}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          name="companyName"
          required
        />
      </div>
    </Form>
  );
};

export default UserForm;
