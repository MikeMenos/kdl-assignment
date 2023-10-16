import Modal from "react-modal";
import CancelButton from "../buttons/CancelButton";
import AddButton from "../buttons/AddButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5%",
    backgroundColor: "#13192A",
  },
};

const DeleteConfirmationModal = ({
  isOpen,
  onCloseDeleteModal,
  onConfirmDelete,
  loading,
}: {
  isOpen: boolean;
  onCloseDeleteModal: VoidFunction;
  onConfirmDelete: VoidFunction;
  loading: boolean;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseDeleteModal}
      contentLabel="Delete Confirmation"
      style={customStyles}
      closeTimeoutMS={200}
    >
      <h2 className="text-center mb-2">Confirm Deletion</h2>
      <p className="text-center mb-6">
        Are you sure you want to delete this record?
      </p>
      <div className="flex items-center gap-4 justify-center">
        <CancelButton onClick={onCloseDeleteModal}>Cancel</CancelButton>
        <AddButton onlyText onClick={onConfirmDelete} disabled={loading}>
          {loading ? "Loading..." : "Confirm"}
        </AddButton>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
