import React from "react";
import { Ingatlan } from "../types";
import { useTranslation } from "next-i18next";

interface ContactOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingatlan: Ingatlan;
}

const ContactOwnerModal = ({
  isOpen,
  onClose,
  ingatlan,
}: ContactOwnerModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("contactOwner")}
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          <strong>{t("ownerName")}:</strong> {ingatlan.tulajdonos.nev}
        </p>
        <p className="text-lg text-gray-600 mb-4">
          <strong>{t("ownerPhone")}:</strong> {ingatlan.tulajdonos.telefonszam}
        </p>
        <button
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200"
          onClick={onClose}
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
};

export default ContactOwnerModal;
