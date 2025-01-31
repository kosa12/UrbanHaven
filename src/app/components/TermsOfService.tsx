// src/app/components/TermsOfService.tsx
import i18next from "../../../i18n";

const TermsOfService = () => {
  return (
    <main className="flex-grow max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">{i18next.t("tos")}</h1>
      <p className="mb-4">
        {i18next.t("termsOfService.lastUpdated", { date: "January 31, 2025" })}
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {i18next.t("termsOfService.acceptance")}
        </h2>
        <p>{i18next.t("termsOfService.acceptanceDescription")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {i18next.t("termsOfService.userResponsibilities")}
        </h2>
        <p>{i18next.t("termsOfService.userResponsibilitiesDescription")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {i18next.t("termsOfService.limitationOfLiability")}
        </h2>
        <p>{i18next.t("termsOfService.limitationOfLiabilityDescription")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {i18next.t("termsOfService.contactUs")}
        </h2>
        <p
          dangerouslySetInnerHTML={{
            __html: i18next.t("termsOfService.contactUsDescription"),
          }}
        />
      </section>
    </main>
  );
};

export default TermsOfService;
