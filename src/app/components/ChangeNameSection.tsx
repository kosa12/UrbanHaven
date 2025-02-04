// src/components/ChangeNameSection.tsx
import React, { useState } from "react";
import i18next from "i18next";

interface ChangeNameSectionProps {
  onSave: (newName: string) => Promise<any>;
  isLoading: boolean;
  error: string | null;
}

const ChangeNameSection: React.FC<ChangeNameSectionProps> = ({
  onSave,
  isLoading,
  error,
}) => {
  const [newName, setNewName] = useState("");

  const handleSave = async () => {
    await onSave(newName);
  };

  return (
    <div>
      <h3 className="text-lg font-bold">{i18next.t("changeName")}</h3>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder={i18next.t("enterNewName")}
        className="w-full px-4 py-2 rounded border border-gray-300 mt-2"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white dark:text-black py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? i18next.t("loading") : i18next.t("save")}
      </button>
    </div>
  );
};

export default ChangeNameSection;
