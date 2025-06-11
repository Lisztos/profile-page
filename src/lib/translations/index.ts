import { en } from './en';
import { es } from './es';
import { de } from './de';
import { Language } from '@/app/context/language-context';

export const translations = {
  en,
  es,
  de
};

export function getTranslation(key: string, language: Language) {
  // Split the key by dots to traverse the nested objects
  const keys = key.split('.');
  let value: any = translations[language];

  // Traverse the nested objects
  for (const k of keys) {
    if (value && k in value) {
      value = value[k];
    } else {
      // If key not found, fallback to English
      console.warn(`Translation key "${key}" not found in language "${language}"`);
      value = getValueFromFallbackLanguage(keys, 'en');
      break;
    }
  }

  return value || key;
}

// Helper function to get value from fallback language
function getValueFromFallbackLanguage(keys: string[], fallbackLang: Language) {
  let value: any = translations[fallbackLang];

  for (const k of keys) {
    if (value && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }

  return value;
}

// Custom hook to handle translations with variable replacement
export function formatMessage(message: string, variables: Record<string, string | number> = {}) {
  return message.replace(/{([^}]+)}/g, (_, key) => {
    return variables[key] !== undefined ? String(variables[key]) : `{${key}}`;
  });
}