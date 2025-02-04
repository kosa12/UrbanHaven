import React from "react";
import i18next from "i18next";

interface SectionToggleProps {
  isChangeNameActive: boolean;
  isDeleteAccountActive: boolean;
  onToggleSection: (section: string) => void;
}

const SectionToggle = ({
  isChangeNameActive,
  isDeleteAccountActive,
  onToggleSection,
}: SectionToggleProps) => {
  return (
    <div className="mb-4">
      <button
        onClick={() => onToggleSection("changeName")}
        className={`mr-2 p-2 rounded ${
          isChangeNameActive
            ? "bg-blue-600 text-white dark:text-black"
            : "bg-gray-200 dark:bg-gray-500"
        }`}
      >
        {i18next.t("changeName")}
      </button>
      <button
        onClick={() => onToggleSection("deleteAccount")}
        className={`p-2 rounded ${
          isDeleteAccountActive
            ? "bg-blue-600 text-white dark:text-black"
            : "bg-gray-200 dark:bg-gray-500"
        }`}
      >
        {i18next.t("deleteAccount")}
      </button>
    </div>
  );
};

export default SectionToggle;
