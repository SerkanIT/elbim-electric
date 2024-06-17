import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ruTranslation from "./ru.json";
import uzTranslation from "./uz.json";

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uzTranslation },
    ru: { translation: ruTranslation },
  },
  lng: localStorage.getItem("value"),
  fallbackLng: localStorage.getItem("value"),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
