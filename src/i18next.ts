import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tajik from "./locales/tg.json";
import russian from "./locales/ru.json";
import english from "./locales/en.json";
i18n.use(initReactI18next).init({
  resources: {
    tg: { translation: tajik },
    ru: { translation: russian },
    en: { translation: english },
  },
  lng: localStorage.getItem("language") || "tg",
  fallbackLng: "tg",
  interpolation: { escapeValue: false },
});
i18n.on("languageChanged", (language) =>
  localStorage.setItem("language", language),
);
export default i18n;
