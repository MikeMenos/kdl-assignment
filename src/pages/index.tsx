import { useMemo, useState, useEffect } from "react";
import Table from "../components/shared/Table/Table";
import AppDrawer from "../components/shared/AppDrawer";
import type { Column, Row } from "react-table";
import EditButton from "../components/shared/buttons/EditButton";
import DeleteButton from "../components/shared/buttons/DeleteButton";
import UserForm from "../components/Users/UserForm";
import { errorToast, successToast } from "../components/shared/toast/toasts";
import { useMutation, useQueryClient } from "react-query";
import useGetUsers from "../hooks/useGetUsers";
import axios from "axios";
import { BASE_URL } from "../misc/constants";
import { isMobileOnly, isTablet } from "react-device-detect";
import DeleteConfirmationModal from "@/components/shared/modals/DeleteModal";

export interface RecordI {
  id: number | null;
  name: string;
  email: string;
  company: { name: string };
}

export const initialRecordState = {
  id: null,
  name: "",
  email: "",
  company: { name: "" },
};

export default function Home() {
  const queryClient = useQueryClient();
  const [showDrawer, setShowDrawer] = useState(false);
  const [record, setRecord] = useState<RecordI>(initialRecordState);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [mockMoreUsers, setMockMoreUsers] = useState<RecordI[]>([]);

  const { users, isLoading, isError } = useGetUsers();

  useEffect(() => {
    if (users) {
      setMockMoreUsers(
        mockMoreUsers.concat(users, users.slice(-10).reverse(), users)
      );
    }
  }, [users]);

  //Create User
  const { isLoading: isCreateUserLoading, mutate: createUser } = useMutation(
    async () => {
      return await axios.post(`${BASE_URL}/users`, {
        name: record.name,
        company: record.company.name,
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

  //Edit User
  const { isLoading: isEditUserLoading, mutate: editUser } = useMutation(
    async () => {
      return await axios.put(`${BASE_URL}/users/${record.id}`, {
        name: record.name,
        company: { ...record.company, name: record.company.name },
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

  //Delete User
  const { mutate: remove, isLoading: isRemoveUserLoading } = useMutation(
    async (id) => {
      return await axios.delete(`${BASE_URL}/users/${id}`);
    },
    {
      onMutate: () => {
        // Show the delete confirmation modal
        setDeleteModalOpen(true);
      },
      onSuccess: () => {
        void queryClient.invalidateQueries().then(() => {
          successToast(`User was deleted successfully!`);
        });
        setDeleteModalOpen(false);
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
    setRecord((state) => ({
      ...state,
      //@ts-ignore
      name: row.original.name,
      //@ts-ignore
      id: row.original.id,
      //@ts-ignore
      email: row.original.email,
      //@ts-ignore
      company: { ...state.company, name: row.original.name },
    }));
    setShowDrawer(true);
  };

  const onConfirmDelete = () => {
    //@ts-ignore
    void remove(record.id);
    setDeleteModalOpen(false);
  };

  const onClose = () => {
    setShowDrawer(false);
    setRecord(initialRecordState);
  };

  const onCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const onOpenDeleteModal = (row: RecordI) => {
    setDeleteModalOpen(true);
    setRecord({ ...record, id: row.id });
  };

  const userColumns: Column[] = [
    { Header: "Id", accessor: "id" },
    {
      accessor: "name",
      Header: "Name",
    },
    {
      accessor: "email",
      Header: "Email",
    },
    {
      accessor: "company.name",
      Header: "Company Name",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex justify-center">
          <EditButton
            onClick={() => onEdit(row)}
            onlyIcon
            className="md:mr-3 mr-2"
            loading={isEditUserLoading}
          />
          <DeleteButton
            onClick={() => onOpenDeleteModal(row)}
            onlyIcon
            className="md:ml-3 ml-2"
          />
        </div>
      ),
    },
  ];

  const columns = useMemo(() => userColumns, []);

  return (
    <div className="flex flex-col w-full">
      <h1 className="mb-4 text-center">Users List</h1>
      <div className="min-h-[750px]">
        <Table
          columns={columns}
          data={mockMoreUsers}
          onAdd={onAdd}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
      <AppDrawer
        show={showDrawer}
        onClose={onClose}
        //if you switch to responsive mode in Dev Tools, please refresh the page first for this to apply
        width={isMobileOnly ? "100%" : isTablet ? "40%" : "25%"}
      >
        <UserForm
          record={record}
          setRecord={setRecord}
          editUser={editUser}
          createUser={createUser}
          onClose={onClose}
          isLoading={isEditUserLoading || isCreateUserLoading}
        />
      </AppDrawer>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCloseDeleteModal={onCloseDeleteModal}
        onConfirmDelete={onConfirmDelete}
        loading={isRemoveUserLoading}
      />
    </div>
  );
}
