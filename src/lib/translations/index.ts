import { en } from './en';
import { es } from './es';
import { de } from './de';
import { Language } from '@/app/context/language-context';

export const translations = {
  en,
  es,
  de
};

// Define a type for nested translation objects
type TranslationValue = string | Record<string, unknown>;
type NestedTranslation = Record<string, TranslationValue>;

export function getTranslation(key: string, language: Language): unknown {
  // Split the key by dots to traverse the nested objects
  const keys = key.split('.');
  let value: TranslationValue | unknown = translations[language];

  // Traverse the nested objects
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as NestedTranslation)[k];
    } else {
      // If key not found, fallback to English
      console.warn(`Translation key "${key}" not found in language "${language}"`);
      value = getValueFromFallbackLanguage(keys, 'en');
      break;
    }
  }

  // Return the value or the key as a fallback
  return value !== undefined ? value : key;
}

// Helper function to get value from fallback language
function getValueFromFallbackLanguage(keys: string[], fallbackLang: Language): unknown {
  let value: TranslationValue | unknown = translations[fallbackLang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as NestedTranslation)[k];
    } else {
      return undefined;
    }
  }

  return value;
}

// Custom hook to handle translations with variable replacement
export function formatMessage(message: string, variables: Record<string, string | number> = {}): string {
  return message.replace(/{([^}]+)}/g, (_, key) => {
    return variables[key] !== undefined ? String(variables[key]) : `{${key}}`;
  });
}

// Helper function to translate date strings
export function translateDate(dateString: string, language: Language): string {
  const monthMap: Record<string, string> = {
    'January': 'january',
    'February': 'february',
    'March': 'march',
    'April': 'april',
    'May': 'may',
    'June': 'june',
    'July': 'july',
    'August': 'august',
    'September': 'september',
    'October': 'october',
    'November': 'november',
    'December': 'december',
    'Present': 'present'
  };

  let translatedDate = dateString;

  // Replace each English month/word with its translation (replace all occurrences)
  Object.entries(monthMap).forEach(([englishMonth, translationKey]) => {
    if (translatedDate.includes(englishMonth)) {
      const translation = getTranslation(`months.${translationKey}`, language) as string;
      // Use global regex to replace all occurrences
      const regex = new RegExp(englishMonth.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      translatedDate = translatedDate.replace(regex, translation);
    }
  });

  return translatedDate;
}