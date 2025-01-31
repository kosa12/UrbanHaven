// src/app/components/TermsOfService.tsx
import { useTranslation } from "react-i18next";

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">{t("tos")}</h1>
      <p className="mb-4">
        {t("termsOfService.lastUpdated", { date: "January 31, 2025" })}
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("termsOfService.acceptance")}
        </h2>
        <p>{t("termsOfService.acceptanceDescription")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("termsOfService.userResponsibilities")}
        </h2>
        <p>{t("termsOfService.userResponsibilitiesDescription")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("termsOfService.limitationOfLiability")}
        </h2>
        <p>{t("termsOfService.limitationOfLiabilityDescription")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("termsOfService.contactUs")}
        </h2>
        <p
          dangerouslySetInnerHTML={{
            __html: t("termsOfService.contactUsDescription"),
          }}
        />
      </section>
    </main>
  );
};

export default TermsOfService;
