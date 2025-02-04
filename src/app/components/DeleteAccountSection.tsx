// src/components/DeleteAccountSection.tsx
import React from "react";
import i18next from "i18next";

interface DeleteAccountSectionProps {
  onDelete: () => Promise<any>;
  isLoading: boolean;
  error: string | null;
}

const DeleteAccountSection: React.FC<DeleteAccountSectionProps> = ({
  onDelete,
  isLoading,
  error,
}) => {
  const handleDelete = async () => {
    await onDelete();
  };

  return (
    <div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? i18next.t("loading") : i18next.t("deleteAccount")}
      </button>
    </div>
  );
};

export default DeleteAccountSection;
