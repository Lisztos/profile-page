import { useLanguage } from "@/app/context/language-context";
import { getTranslation, formatMessage } from "../translations";

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string, variables?: Record<string, string | number>) => {
    const translation = getTranslation(key, language);
    return variables ? formatMessage(translation, variables) : translation;
  };

  return { t };
}