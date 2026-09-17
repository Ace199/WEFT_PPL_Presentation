"use client";
import { createContext, useContext, useEffect, useState, createElement, type ReactNode, type ComponentProps } from "react";
import { english } from "@/content/translations";
import styles from "./Language.module.css";
type Language = "zh" | "en";
const languagePreferenceKey = "weft-ppl.language";
const Context = createContext({ language: "zh" as Language, setLanguage: (_: Language) => {} });
export function LanguageProvider({children}: {children: ReactNode}) {
  const [language, updateLanguage] = useState<Language>("zh");
  useEffect(() => {
    const restore = () => {
      try {
        const saved = localStorage.getItem(languagePreferenceKey);
        if (saved === "zh" || saved === "en") updateLanguage(saved);
      } catch { /* Storage restrictions must not prevent in-page switching. */ }
    };
    restore();
    const synchronize = (event: StorageEvent) => {
      if (event.key === languagePreferenceKey) restore();
    };
    window.addEventListener("storage", synchronize);
    return () => window.removeEventListener("storage", synchronize);
  }, []);
  const setLanguage = (next: Language) => {
    updateLanguage(next);
    try { localStorage.setItem(languagePreferenceKey, next); }
    catch { /* The current page still works when storage is unavailable. */ }
  };
  useEffect(() => { document.documentElement.lang = language === "zh" ? "zh-CN" : "en"; }, [language]);
  return <Context.Provider value={{language, setLanguage}}>{children}</Context.Provider>;
}
export function useLanguage() {
  const context = useContext(Context);
  return {...context, t: (text: string) => context.language === "en" ? english[text] ?? text : text};
}
export function LocalizedText({text}: {text: string}) {
  const {t} = useLanguage();
  return <>{t(text)}</>;
}
export function LocalizedElement({as = "div", label, children, ...props}: Omit<ComponentProps<"div">, "ref"> & {as?: "div" | "a" | "nav" | "svg"; label: string; href?: string; viewBox?: string}) {
  const {t} = useLanguage();
  return createElement(as, {...props, "aria-label": t(label)}, children);
}
export function LanguageSwitch() {
  const {language, setLanguage} = useLanguage();
  return <div className={styles.switch} role="group" aria-label="Language / 语言">
    <button type="button" lang="zh-CN" aria-label="切换为中文" aria-pressed={language === "zh"} onClick={() => setLanguage("zh")}>中</button>
    <span aria-hidden="true">/</span>
    <button type="button" lang="en" aria-label="Switch to English" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>En</button>
  </div>;
}
