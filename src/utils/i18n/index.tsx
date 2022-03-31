import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const ns = ['translation'];
const supportedLngs = ['en', 'es', 'mx'];

export const setupI18n = () => {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: '/translations/{{lng}}/{{ns}}.json',
      },
      react: {
        useSuspense: false,
      },
      debug: true,
      saveMissing: true,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      defaultNS: 'translation',
      ns,
      supportedLngs,
    });

  return i18n;
};
