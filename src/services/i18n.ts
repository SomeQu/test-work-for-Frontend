import { createI18n } from 'vue-i18n';
import type { App } from 'vue';
import { ru } from '@/locales/ru'
import { en } from '@/locales/en'

const defaultLocale = localStorage.getItem('locale') || 'ru';

export const i18n = createI18n({
  legacy: false,              
  globalInjection: true,      
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    en: en,
    ru: ru,
  },
});

export function setupI18n(app: App) {
  app.use(i18n);
}