// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import the resources (translations)
import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";

i18n
  .use(initReactI18next) // Pass the i18next instance to React
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    lng: "en", // Default language is English
    fallbackLng: "en", // Fallback language if the translation is missing
    interpolation: {
      escapeValue: false, // React already escapes HTML by default
    },
  });

export default i18n;
