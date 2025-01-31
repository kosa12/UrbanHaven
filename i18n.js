import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        home: "Home",
        about: "About",
        contact: "Contact",
        properties: "Properties",
        welcome: "Welcome to Urban Haven",
        quickLinks: "Quick Links",
        contactUs: "Contact Us",
        allRightsReserved: "All rights reserved",
        uploadedOn: "Uploaded on",
        contactOwner: "Contact Owner",
        ownerName: "Owner",
        ownerPhone: "Phone Number",
        modify: "Modify",
        delete: "Delete",
        loading: "Loading...",
        close: "Close",
        tos: "Terms of Service",
        termsOfService: {
          lastUpdated: "Last updated on: {{date}}",
          acceptance: "1. Acceptance of Terms",
          acceptanceDescription:
            "By accessing or using our services, you agree to be bound by these terms. If you do not agree, please do not use our services.",
          userResponsibilities: "2. User Responsibilities",
          userResponsibilitiesDescription:
            "You agree to use our services responsibly and not engage in prohibited activities, such as unauthorized access, fraud, or any actions that violate applicable laws.",
          limitationOfLiability: "3. Limitation of Liability",
          limitationOfLiabilityDescription:
            "We are not responsible for any damages arising from your use of our services. The services are provided 'as is' without any warranties.",
          contactUs: "4. Contact Us",
          contactUsDescription:
            "If you have any questions about these terms, please contact us at <span className='font-semibold'>matyas.kosa@stud.ubbcluj.ro</span>.",
        },
      },
    },
    hu: {
      translation: {
        home: "Kezdőlap",
        about: "Rólunk",
        contact: "Kapcsolat",
        properties: "Ingatlanok",
        welcome: "Üdvözlet az Urban Havenben",
        quickLinks: "Gyors linkek",
        contactUs: "Lépjen kapcsolatba velünk",
        allRightsReserved: "Minden jog fenntartva",
        uploadedOn: "Feltöltve",
        contactOwner: "Kapcsolat a tulajdonossal",
        ownerName: "Tulajdonos",
        ownerPhone: "Telefonszám",
        modify: "Módosítás",
        delete: "Törlés",
        loading: "Betöltés...",
        close: "Bezárás",
        tos: "Felhasználási feltételek",
        termsOfService: {
          lastUpdated: "Utoljára frissítve: {{date}}",
          acceptance: "1. A feltételek elfogadása",
          acceptanceDescription:
            "A szolgáltatásaink elérésével vagy használatával elfogadja ezeket a feltételeket. Ha nem ért egyet, kérjük, ne használja szolgáltatásainkat.",
          userResponsibilities: "2. Felhasználói kötelezettségek",
          userResponsibilitiesDescription:
            "Ön vállalja, hogy felelősségteljesen használja szolgáltatásainkat, és nem vesz részt tilos tevékenységekben, mint például jogosulatlan hozzáférés, csalás vagy bármilyen tevékenység, amely megsérti az alkalmazandó törvényeket.",
          limitationOfLiability: "3. Felelősség korlátozása",
          limitationOfLiabilityDescription:
            "Nem vállalunk felelősséget semmilyen kárért, amely a szolgáltatásaink használatából ered. A szolgáltatások 'mint vannak' módon kerülnek biztosításra, bármilyen jótállás nélkül.",
          contactUs: "4. Kapcsolatfelvétel",
          contactUsDescription:
            "Ha kérdése van ezekkel a feltételekkel kapcsolatban, kérjük, vegye fel velünk a kapcsolatot a következő címen: <span className='font-semibold'>matyas.kosa@stud.ubbcluj.ro</span>.",
        },
      },
    },
    ro: {
      translation: {
        home: "Acasă",
        about: "Despre",
        contact: "Contact",
        properties: "Proprietăți",
        welcome: "Bun venit la Urban Haven",
        quickLinks: "Linkuri rapide",
        contactUs: "Contactează-ne",
        allRightsReserved: "Toate drepturile rezervate",
        uploadedOn: "Încărcat la",
        contactOwner: "Contactează proprietarul",
        ownerName: "Proprietar",
        ownerPhone: "Număr de telefon",
        modify: "Modifică",
        delete: "Șterge",
        loading: "Se încarcă...",
        close: "Închide",
        tos: "Termenii de utilizare",
        termsOfService: {
          lastUpdated: "Ultima actualizare la: {{date}}",
          acceptance: "1. Acceptarea termenilor",
          acceptanceDescription:
            "Accesând sau utilizând serviciile noastre, sunteți de acord să respectați acești termeni. Dacă nu sunteți de acord, vă rugăm să nu utilizați serviciile noastre.",
          userResponsibilities: "2. Responsabilitățile utilizatorului",
          userResponsibilitiesDescription:
            "Sunteți de acord să utilizați serviciile noastre într-un mod responsabil și să nu vă angajați în activități interzise, cum ar fi accesul neautorizat, frauda sau orice acțiuni care încalcă legile aplicabile.",
          limitationOfLiability: "3. Limitarea răspunderii",
          limitationOfLiabilityDescription:
            "Nu suntem responsabili pentru niciun fel de daune care apar din utilizarea serviciilor noastre. Serviciile sunt oferite 'ca atare', fără nicio garanție.",
          contactUs: "4. Contactați-ne",
          contactUsDescription:
            "Dacă aveți întrebări despre acești termeni, vă rugăm să ne contactați la <span className='font-semibold'>matyas.kosa@stud.ubbcluj.ro</span>.",
        },
      },
    },
  },
});

export default i18next;
