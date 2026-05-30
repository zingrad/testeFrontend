import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

const LANG_KEY = "encontact-lang";

const savedLang = localStorage.getItem(LANG_KEY) || "pt";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(LANG_KEY, lng);
});

export default i18n;
