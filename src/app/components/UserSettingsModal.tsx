// src/components/UserSettingsModal.tsx
"use client";
import { useState } from "react";
import i18next from "../../../i18n";
import SectionToggle from "./SectionToggle";
import ChangeNameSection from "./ChangeNameSection";
import DeleteAccountSection from "./DeleteAccountSection";
import { useChangeName } from "./../hooks/useChangeName";
import { useDeleteAccount } from "./../hooks/useDeleteAccount";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSettingsModal = ({ isOpen, onClose }: UserSettingsModalProps) => {
  const [isChangeNameActive, setIsChangeNameActive] = useState(false);
  const [isDeleteAccountActive, setIsDeleteAccountActive] = useState(false);

  const {
    isLoading: isChangeNameLoading,
    error: changeNameError,
    handleChangeName,
  } = useChangeName();
  const {
    isLoading: isDeleteAccountLoading,
    error: deleteAccountError,
    handleDeleteAccount,
  } = useDeleteAccount();

  const handleToggleSection = (section: string) => {
    if (section === "changeName") {
      setIsChangeNameActive(true);
      setIsDeleteAccountActive(false);
    } else if (section === "changePassword") {
      setIsChangeNameActive(false);
      setIsDeleteAccountActive(false);
    } else if (section === "deleteAccount") {
      setIsChangeNameActive(false);
      setIsDeleteAccountActive(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 h-[350px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{i18next.t("settings")}</h2>

        {/* Section Toggle */}
        <SectionToggle
          isChangeNameActive={isChangeNameActive}
          isDeleteAccountActive={isDeleteAccountActive}
          onToggleSection={handleToggleSection}
        />

        {/* Render Sections */}
        {isChangeNameActive && (
          <ChangeNameSection
            onSave={handleChangeName}
            isLoading={isChangeNameLoading}
            error={changeNameError}
          />
        )}
        {isDeleteAccountActive && (
          <DeleteAccountSection
            onDelete={handleDeleteAccount}
            isLoading={isDeleteAccountLoading}
            error={deleteAccountError}
          />
        )}

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded"
        >
          {i18next.t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default UserSettingsModal;
