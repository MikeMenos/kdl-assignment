import {
  type SyntheticEvent,
  type FC,
  type SetStateAction,
  type Dispatch,
  useState,
} from "react";
import Form from "../shared/Form";
import Input from "../shared/Input";
import { type Row } from "react-table";
import { updateObjectValues } from "@/utils/updateObjectValues";
import { RecordI } from "@/interfaces";

interface PropsInterface {
  record: Row["original"];
  setRecord: Dispatch<SetStateAction<RecordI>>;
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
  const { name, id, email, company } = record;

  const handleInputChange = (path: string, value: string) => {
    setRecord((state) => updateObjectValues(state, path, value));
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    if (id) {
      editUser(record);
    } else {
      createUser(record);
    }
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
          value={name ?? ""}
          type="text"
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          name="name"
          required
        />
        <Input
          placeholder="Email"
          value={email ?? ""}
          type="email"
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          name="email"
          required
        />
        <Input
          placeholder="Company Name"
          value={company?.name ?? ""}
          type="text"
          onChange={(e) => handleInputChange("company.name", e.target.value)}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          name="company"
          required
        />
      </div>
    </Form>
  );
};

export default UserForm;
