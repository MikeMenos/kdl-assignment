import { type FC, useMemo, useState } from "react";
import Table from "../shared/Table/Table";
import AppDrawer from "../shared/AppDrawer";
import type { Column, Row } from "react-table";
import EditButton from "../shared/buttons/EditButton";
import DeleteButton from "../shared/buttons/DeleteButton";
import Loader from "../shared/Loader";
import UserForm from "../../components/Users/UserForm";
import { errorToast, successToast } from "../../components/shared/toast/toasts";
import { useMutation, useQueryClient } from "react-query";
import useGetUsers from "../../hooks/useGetUsers";
import axios from "axios";
import { BASE_URL } from "../../misc/constants";

const Users: FC = () => {
  const queryClient = useQueryClient();
  const [showDrawer, setShowDrawer] = useState(false);
  const [record, setRecord] = useState<Row["original"]>({
    id: null,
    name: "",
    email: "",
    companyName: "",
  });

  const { users, isLoading, isError } = useGetUsers();

  const { isLoading: isCreateUserLoading, mutate: createUser } = useMutation(
    async () => {
      return await axios.post(`${BASE_URL}/users`, {
        //@ts-ignore
        name: record.name,
        //@ts-ignore

        company: record.companyName,
      });
    },
    {
      onSuccess: () => {
        successToast(`User was added successfully!`);
        onClose();
        queryClient.invalidateQueries();
      },
      onError: ({ message }: { message: string }) => {
        errorToast(
          JSON.parse(message)
            .map(({ message }: { message: string }) => message)
            .toString()
        );
      },
    }
  );

  const { isLoading: isEditUserLoading, mutate: editUser } = useMutation(
    async () => {
      //@ts-ignore
      return await axios.put(`${BASE_URL}/users/${record.id}`, {
        //@ts-ignore
        name: record.name,
        //@ts-ignore
        company: record.companyName,
        //@ts-ignore
        id: record.id,
      });
    },
    {
      onSuccess: () => {
        successToast(`User was updated successfully!`);
        onClose();
        queryClient.invalidateQueries();
      },
      onError: ({ message }: { message: string }) => {
        errorToast(
          JSON.parse(message)
            .map(({ message }: { message: string }) => message)
            .toString()
        );
      },
    }
  );

  const { mutate: remove, isLoading: isRemoveUserLoading } = useMutation(
    async () => {
      //@ts-ignore
      return await axios.delete(`${BASE_URL}/users/${record.id}`);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries().then(() => {
          successToast(`Record was deleted successfully!`);
        });
        onClose();
        queryClient.invalidateQueries();
      },
      onError: () => {
        errorToast("Oops, something went wrong!");
      },
    }
  );

  const onAdd = () => {
    setShowDrawer(true);
  };

  const onEdit = (row: Row) => {
    setRecord(row.original);
    setShowDrawer(true);
  };

  const onDelete = (row: Row) => {
    // @ts-ignore
    void remove({ id: row.original.id });
  };

  const onClose = () => {
    setShowDrawer(false);
    setRecord({});
  };

  const userColumns: Column[] = [
    { Header: "Id", accessor: "id" },
    {
      accessor: "name",
      Header: "Receiver",
    },
    {
      accessor: "email",
      Header: "Category",
    },
    {
      accessor: "company.name",
      Header: "Company Name",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <>
          <EditButton
            onClick={() => onEdit(row)}
            onlyIcon
            className="mr-3"
            loading={isEditUserLoading}
          />
          <DeleteButton
            onClick={() => onDelete(row)}
            onlyIcon
            className="ml-3"
            loading={isRemoveUserLoading}
          />
        </>
      ),
    },
  ];

  const columns = useMemo(() => userColumns, []);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col">
      <h1 className="mb-4">Users</h1>
      <Table
        columns={columns}
        data={users}
        onAdd={onAdd}
        name="transactions-table"
      />
      <AppDrawer show={showDrawer} onClose={onClose}>
        <UserForm
          record={record}
          setRecord={setRecord}
          editUser={editUser}
          createUser={createUser}
          onClose={onClose}
          isLoading={
            isRemoveUserLoading || isEditUserLoading || isCreateUserLoading
          }
        />
      </AppDrawer>
    </div>
  );
};

export default Users;
