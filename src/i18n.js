import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import translationSK from "./locales/sk/sk.json"

const resources = {
    sk: translationSK,
}

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    lng: "sk",
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false, 
    },
});

export default i18n;