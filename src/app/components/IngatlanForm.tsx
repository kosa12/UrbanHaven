import { FC } from "react";
import useIngatlan from "../hooks/useCreateIngatlan";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";

interface IngatlanFormProps {
  router: any;
}

const IngatlanForm: FC<IngatlanFormProps> = () => {
  const { ingatlan, handleIngatlanChange, handleImageChange, handleSubmit } =
    useIngatlan();
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar added here */}
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-100">
          {t("uploadIngatlan")}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(router);
          }}
          className="space-y-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="cim"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              {t("address")}
            </label>
            <input
              id="cim"
              type="text"
              name="cim"
              value={ingatlan.cim}
              onChange={handleIngatlanChange}
              className="p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="leiras"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              {t("description")}
            </label>
            <textarea
              id="leiras"
              name="leiras"
              value={ingatlan.leiras}
              onChange={handleIngatlanChange}
              className="p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              rows={4}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="arPenz"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              {t("price")}
            </label>
            <input
              id="arPenz"
              type="number"
              name="arPenz"
              value={ingatlan.arPenz}
              onChange={handleIngatlanChange}
              className="p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="feltoltesiDatum"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              {t("uploadDate")}
            </label>
            <input
              id="feltoltesiDatum"
              type="date"
              name="feltoltesiDatum"
              value={ingatlan.feltoltesiDatum}
              onChange={handleIngatlanChange}
              className="p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="allapot"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              {t("condition")}
            </label>
            <input
              id="allapot"
              type="text"
              name="allapot"
              value={ingatlan.allapot}
              onChange={handleIngatlanChange}
              className="p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="imageUpload"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              {t("imageUpload")}
            </label>
            <input
              id="imageUpload"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(router); // Pass the router here
              }}
              className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition"
            >
              Upload
            </button>
          </div>
        </form>
      </div>

      {/* Footer added here */}
      <Footer />
    </div>
  );
};

export default IngatlanForm;
