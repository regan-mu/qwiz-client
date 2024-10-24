
const DeleteConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null; // Only show if the modal is open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-medium mb-4 font-manrope">
          Confirm Delete
        </h2>
        <p className="mb-6">
          Are you sure you want to delete this record? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
