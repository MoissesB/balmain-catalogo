"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { localeLabels, translateDocumentText, type Locale } from "../lib/i18n";

const STORAGE_KEY = "ak-locale";
const LanguageContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({
  locale: "es",
  setLocale: () => undefined,
});

function translateTextNode(node: Text, locale: Locale) {
  const parent = node.parentElement;
  if (!parent || ["SCRIPT", "STYLE", "CODE", "PRE"].includes(parent.tagName)) return;
  const currentValue = node.nodeValue ?? "";
  const translatedValue = translateDocumentText(currentValue, locale);
  if (translatedValue !== currentValue) node.nodeValue = translatedValue;
}

function translateElement(root: HTMLElement | Document, locale: Locale) {
  const walker = document.createTreeWalker(root as unknown as Node, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) translateTextNode(node, locale);
  root.querySelectorAll<HTMLElement>("[placeholder], [aria-label], [title], [alt]").forEach((element) => {
    for (const attribute of ["placeholder", "aria-label", "title", "alt"]) {
      const value = element.getAttribute(attribute);
      if (value) element.setAttribute(attribute, translateDocumentText(value, locale));
    }
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const nextLocale: Locale = saved === "en" || saved === "fr" ? saved : "es";
    queueMicrotask(() => setLocaleState(nextLocale));
    document.documentElement.lang = nextLocale;
    if (nextLocale !== "es") {
      queueMicrotask(() => translateElement(document, nextLocale));
      const observer = new MutationObserver((records) => {
        for (const record of records) {
          if (record.type === "characterData" && record.target instanceof Text) {
            translateTextNode(record.target, nextLocale);
          }
          record.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) translateElement(node, nextLocale);
            else if (node instanceof Text) translateTextNode(node, nextLocale);
          });
        }
      });
      observer.observe(document.documentElement, { childList: true, characterData: true, subtree: true });
      return () => observer.disconnect();
    }
  }, []);

  function setLocale(nextLocale: Locale) {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.cookie = `ak-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    if (nextLocale === locale) return;
    window.location.reload();
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const languageNames: Record<Locale, string> = {
    es: "Español",
    en: "English",
    fr: "Français",
  };

  function selectLocale(item: Locale) {
    if (dropdownRef.current) dropdownRef.current.open = false;
    setLocale(item);
  }

  return (
    <details
      ref={dropdownRef}
      className={compact ? "language-switcher language-switcher--compact" : "language-switcher"}
    >
      <summary aria-label="Seleccionar idioma">
        <span className={`language-flag language-flag--${locale}`} aria-hidden="true" />
        <strong>{localeLabels[locale]}</strong>
        <span className="language-chevron" aria-hidden="true" />
      </summary>
      <div className="language-menu" aria-label="Idiomas">
        {(Object.keys(localeLabels) as Locale[]).map((item) => (
          <button
            key={item}
            type="button"
            className={locale === item ? "is-active" : ""}
            aria-current={locale === item ? "true" : undefined}
            onClick={() => selectLocale(item)}
          >
            <span className={`language-flag language-flag--${item}`} aria-hidden="true" />
            <span>{languageNames[item]}</span>
            <strong>{localeLabels[item]}</strong>
          </button>
        ))}
      </div>
    </details>
  );
}
