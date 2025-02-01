import React, { useState } from "react";
import { Ingatlan } from "../types";
import { useTranslation } from "next-i18next";

interface ModifyIngatlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingatlan: Ingatlan;
  onSave: (updatedIngatlan: Ingatlan) => void;
}

const ModifyIngatlanModal = ({
  isOpen,
  onClose,
  ingatlan,
  onSave,
}: ModifyIngatlanModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    cim: ingatlan.cim,
    leiras: ingatlan.leiras,
    arPenz: ingatlan.arPenz,
    feltoltesiDatum: ingatlan.feltoltesiDatum,
    allapot: ingatlan.allapot,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.cim.trim()) newErrors.cim = t("validation.required");
    if (!formData.leiras.trim()) newErrors.leiras = t("validation.required");
    if (isNaN(Number(formData.arPenz)) || Number(formData.arPenz) <= 0)
      newErrors.arPenz = t("validation.invalidPrice");
    if (!formData.feltoltesiDatum.trim())
      newErrors.feltoltesiDatum = t("validation.required");
    if (!formData.allapot.trim()) newErrors.allapot = t("validation.required");
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({ ...ingatlan, ...formData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{t("modifyIngatlan")}</h2>

        <label className="block mb-2">
          {t("address")}
          <input
            type="text"
            name="cim"
            value={formData.cim}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.cim && <p className="text-red-500 text-sm">{errors.cim}</p>}
        </label>

        <label className="block mb-2">
          {t("description")}
          <textarea
            name="leiras"
            value={formData.leiras}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.leiras && (
            <p className="text-red-500 text-sm">{errors.leiras}</p>
          )}
        </label>

        <label className="block mb-2">
          {t("price")}
          <input
            type="number"
            name="arPenz"
            value={formData.arPenz}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.arPenz && (
            <p className="text-red-500 text-sm">{errors.arPenz}</p>
          )}
        </label>

        <label className="block mb-2">
          {t("uploadDate")}
          <input
            type="text"
            name="feltoltesiDatum"
            value={formData.feltoltesiDatum}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.feltoltesiDatum && (
            <p className="text-red-500 text-sm">{errors.feltoltesiDatum}</p>
          )}
        </label>

        <label className="block mb-2">
          {t("condition")}
          <input
            type="text"
            name="allapot"
            value={formData.allapot}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.allapot && (
            <p className="text-red-500 text-sm">{errors.allapot}</p>
          )}
        </label>

        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            {t("cancel")}
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyIngatlanModal;
