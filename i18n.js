import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
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
      },
    },
  },
});

export default i18next;
