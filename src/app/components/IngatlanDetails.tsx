import React, { useState } from "react";
import { Ingatlan } from "../types";
import useImageUrls from "../hooks/useImageUrls";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "next-i18next";
import useModifyIngatlan from "../hooks/useModifyIngatlan";
import ModifyIngatlanModal from "./ModifyIngatlanModal";
import ContactOwnerModal from "./ContactOwnerModal";
import Image from "next/image";
import useDeleteIngatlan from "../hooks/useDeleteIngatlan";

interface IngatlanDetailsProps {
  ingatlan: Ingatlan;
  isOwner: boolean;
}

const IngatlanDetails = ({
  ingatlan: initialIngatlan,
  isOwner,
}: IngatlanDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [ingatlan, setIngatlan] = useState(initialIngatlan);
  const imageUrls = useImageUrls();
  const { t } = useTranslation();
  const matchingImage = imageUrls.find(
    (image) => image.ingatlanId === ingatlan.id
  );

  const { modifyIngatlan, error } = useModifyIngatlan();
  const {
    isDeleting,
    error: deleteError,
    deleteIngatlan,
  } = useDeleteIngatlan();

  const handleContactOwnerClick = () => {
    console.log("Contacting owner...");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModify = async (updatedIngatlan: Ingatlan) => {
    await modifyIngatlan(ingatlan.id, {
      ...updatedIngatlan,
      tulajdonosId: ingatlan.tulajdonos.id,
    });
    setIngatlan({ ...updatedIngatlan, tulajdonosId: ingatlan.tulajdonos.id });
  };

  const handleDelete = async () => {
    const success = await deleteIngatlan(ingatlan.id);
    if (success) {
      alert("Ingatlan deleted successfully.");
      window.location.href = "/home";
    }
  };

  return (
    <div
      className={`bg-white min-h-screen flex flex-col ${
        isModalOpen ? "overflow-hidden" : ""
      }`}
    >
      <Navbar />

      <main className="flex-grow container mx-auto p-6 md:p-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Image */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              {matchingImage ? (
                <Image
                  src={matchingImage.kepUrl}
                  alt={ingatlan.cim}
                  priority
                  className="rounded-lg w-full object-cover h-80 md:h-auto"
                  width={600} // Specify width and height
                  height={400}
                />
              ) : (
                <p className="text-center text-gray-500">Image not found.</p>
              )}
            </div>

            {/* Right Column: Details */}
            <div className="md:w-1/2 md:pl-6">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                {ingatlan.cim}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-200 mb-4">
                {ingatlan.leiras}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-200 mb-4">
                Allapot: {ingatlan.allapot}
              </p>
              <p className="text-xl text-blue-600 dark:text-blue-200 font-semibold mb-4">
                {ingatlan.arPenz} RON
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                <strong>{t("uploadedOn")}:</strong> {ingatlan.feltoltesiDatum}
              </p>
              <div className="flex space-x-4">
                <button
                  className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={handleContactOwnerClick}
                >
                  {t("contactOwner")}
                </button>

                {/* Show Modify and Delete buttons only if the current user is the owner */}
                {isOwner && (
                  <>
                    <div>
                      <button
                        className="mt-4 px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                        onClick={() => setIsModifyModalOpen(true)}
                      >
                        Modify
                      </button>

                      <ModifyIngatlanModal
                        isOpen={isModifyModalOpen}
                        onClose={() => setIsModifyModalOpen(false)}
                        ingatlan={ingatlan}
                        onSave={handleModify}
                      />
                    </div>

                    <button
                      className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : t("delete")}
                    </button>
                  </>
                )}
              </div>
              {(error || deleteError) && (
                <p className="text-red-600 mt-2">{error || deleteError}</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      <ContactOwnerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ingatlan={ingatlan}
      />
    </div>
  );
};

export default IngatlanDetails;
