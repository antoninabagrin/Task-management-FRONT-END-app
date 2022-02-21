import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enFile from './enFile.json';
import roFile from './roFile.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: enFile },
    ro: { translation: roFile },
  },
});

export default i18n;
