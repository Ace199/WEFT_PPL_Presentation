"use client";
import { useLanguage } from "@/components/Language";
import type { Copy } from "@/content/decisions";
export function DesignText({ zh, en }: Copy) {
  const { language } = useLanguage();
  return <>{language === "en" ? en : zh}</>;
}
