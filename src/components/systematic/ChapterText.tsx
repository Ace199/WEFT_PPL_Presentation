"use client";
import { createElement, type HTMLAttributes, type ReactNode } from "react";
import { useLanguage } from "@/components/Language";
import { systematicEnglish } from "@/content/systematic-translations";

export function ChapterText({ text, as, id }: { text: string; as?: "title"; id?: string }) {
  const { language } = useLanguage();
  const translated = language === "en" ? (systematicEnglish[text] ?? text) : text;
  return as ? createElement(as, { id }, translated) : <>{translated}</>;
}

export function ChapterElement({
  as,
  label,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & {
  as: "svg" | "section" | "div";
  label: string;
  viewBox?: string;
  children: ReactNode;
}) {
  const { language } = useLanguage();
  return createElement(
    as,
    {
      ...props,
      "aria-label":
        language === "en" ? (systematicEnglish[label] ?? label) : label,
    },
    children,
  );
}
