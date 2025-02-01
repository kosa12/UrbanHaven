// components/IngatlanForm.tsx
import { FC } from "react";
import useIngatlan from "../hooks/useCreateIngatlan";

interface IngatlanFormProps {
  router: any;
}

const IngatlanForm: FC<IngatlanFormProps> = ({ router }) => {
  const { ingatlan, handleIngatlanChange, handleImageChange, handleSubmit } =
    useIngatlan();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Upload Ingatlan
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(router);
        }}
        className="space-y-6"
      >
        <div className="flex flex-col">
          <label htmlFor="cim" className="text-lg font-medium text-gray-700">
            Cím
          </label>
          <input
            id="cim"
            type="text"
            name="cim"
            value={ingatlan.cim}
            onChange={handleIngatlanChange}
            className="p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="leiras" className="text-lg font-medium text-gray-700">
            Leírás
          </label>
          <textarea
            id="leiras"
            name="leiras"
            value={ingatlan.leiras}
            onChange={handleIngatlanChange}
            className="p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="arPenz" className="text-lg font-medium text-gray-700">
            Ár Pénz
          </label>
          <input
            id="arPenz"
            type="number"
            name="arPenz"
            value={ingatlan.arPenz}
            onChange={handleIngatlanChange}
            className="p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="feltoltesiDatum"
            className="text-lg font-medium text-gray-700"
          >
            Feltöltési Dátum
          </label>
          <input
            id="feltoltesiDatum"
            type="date"
            name="feltoltesiDatum"
            value={ingatlan.feltoltesiDatum}
            onChange={handleIngatlanChange}
            className="p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="allapot"
            className="text-lg font-medium text-gray-700"
          >
            Állapot
          </label>
          <input
            id="allapot"
            type="text"
            name="allapot"
            value={ingatlan.allapot}
            onChange={handleIngatlanChange}
            className="p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="imageUpload"
            className="text-lg font-medium text-gray-700"
          >
            Image Upload
          </label>
          <input
            id="imageUpload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default IngatlanForm;
