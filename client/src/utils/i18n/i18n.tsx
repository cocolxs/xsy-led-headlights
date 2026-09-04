import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { LANGUAGES, getTranslation, type Language } from './translations';

const STORAGE_KEY = 'xsy_language';
const DEFAULT_LANG = 'en';

interface LanguageContextValue {
  language: string;
  setLanguage: (code: string) => void;
  languages: Language[];
  currentLanguage: Language;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function detectInitialLanguage(): string {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
  } catch {
    /* ignore */
  }
  const browser = navigator.language?.split('-')[0] ?? DEFAULT_LANG;
  if (LANGUAGES.some((l) => l.code === browser)) return browser;
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(detectInitialLanguage);

  const setLanguage = useCallback((code: string) => {
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const currentLanguage = useMemo<Language>(
    () => LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0],
    [language],
  );

  const isRTL = useMemo(() => currentLanguage.rtl === true, [currentLanguage]);

  // Apply dir attribute for RTL
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [isRTL, language]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let text = getTranslation(language, key);
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      languages: LANGUAGES,
      currentLanguage,
      t,
      isRTL,
    }),
    [language, setLanguage, currentLanguage, t, isRTL],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
