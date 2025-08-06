import { useLanguage } from "@/app/context/language-context";
import { getTranslation, formatMessage } from "../translations";

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const translation = getTranslation(key, language);
    const translationStr = typeof translation === 'string' ? translation : String(translation);
    return variables ? formatMessage(translationStr, variables) : translationStr;
  };

  return { t };
}