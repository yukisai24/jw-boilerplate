// languages/i18n.ts
import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import en from './en.json';
import ko from './ko.json';

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
  lng: 'ko', // 기본 언어
  fallbackLng: 'en', // 찾을 수 없을 경우 대체 언어
  interpolation: { escapeValue: false },
});

export default i18n;
