"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { useEditingActivity } from "./editor/TextPreview";
import styles from "./HeroFactsMotion.module.css";
import { useLanguage } from "./Language";

// Keep the complete server-rendered labels and their layout throughout typing.
export function HeroFactsMotion({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <FactsMotion variant="hero" className={className}>
      {children}
    </FactsMotion>
  );
}

export function ProductionFactsMotion({ children }: { children: ReactNode }) {
  return <FactsMotion variant="production">{children}</FactsMotion>;
}

function FactsMotion({
  children,
  className = "",
  variant,
}: {
  children: ReactNode;
  className?: string;
  variant: "hero" | "production";
}) {
  const root = useRef<HTMLElement | null>(null);
  const { language } = useLanguage();
  const played = useRef(false);
  const reduced = useReducedMotion();
  const editing = useEditingActivity();
  useEffect(() => {
    const list = root.current;
    if (!list || reduced || editing || played.current) return;
    const rowSelector = variant === "hero" ? "li" : "[data-typing-row]";
    const groups = [...list.querySelectorAll<HTMLElement>(rowSelector)];
    const glyphs = groups.flatMap((group) => [
      ...group.querySelectorAll<HTMLElement>("[data-typing-glyph]"),
    ]);
    if (!glyphs.length) return;
    let index = 0,
      timer = 0,
      visible = false,
      finished = false;
    const fast = variant === "production";
    const playbackRate = fast ? 2 : 1;
    let remaining = (fast ? 320 : 550) / playbackRate,
      due = 0;
    list.dataset.typing = "active";
    glyphs.forEach((glyph) => (glyph.dataset.untyped = "true"));
    groups.forEach((group, i) => {
      if (i) group.dataset.untypedLabel = "true";
    });
    glyphs[0].dataset.caret = "start";
    const clearCaret = () =>
      glyphs.forEach((glyph) => delete glyph.dataset.caret);
    const schedule = () => {
      if (timer || finished || !visible || document.hidden) return;
      due = performance.now() + remaining;
      timer = window.setTimeout(step, remaining);
      list.dataset.paused = "false";
    };
    const pause = () => {
      if (timer) remaining = Math.max(0, due - performance.now());
      clearTimeout(timer);
      timer = 0;
      list.dataset.paused = "true";
    };
    const step = () => {
      timer = 0;
      clearCaret();
      if (index === glyphs.length) {
        finished = true;
        played.current = true;
        list.dataset.typing = "complete";
        return;
      }
      const glyph = glyphs[index];
      delete glyph.dataset.untyped;
      delete glyph.closest<HTMLElement>(rowSelector)!.dataset.untypedLabel;
      glyph.dataset.caret = "end";
      index++;
      const next = glyphs[index];
      // Fixed irregular keystrokes: predictable rhythm without hydration randomness.
      if (!next) remaining = fast ? 650 : 900;
      else if (next.closest(rowSelector) !== glyph.closest(rowSelector))
        remaining = fast ? 600 : 1150;
      else if (fast && next.closest("dt, dd") !== glyph.closest("dt, dd"))
        remaining = 180;
      else
        remaining = (
          fast ? [32, 52, 28, 42, 75, 35, 48] : [75, 115, 65, 95, 170, 80, 105]
        )[index % 7];
      remaining /= playbackRate;
      schedule();
    };
    const visibility = () => (document.hidden ? pause() : schedule());
    // Production starts when the facts are readable, not at the first pixel
    // crossing the bottom edge. Hero keeps its existing first-entry trigger.
    const visibleRatio = fast ? 0.5 : 0;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= visibleRatio;
      if (visible) schedule();
      else pause();
    }, { threshold: visibleRatio });
    observer.observe(list);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      pause();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      clearCaret();
      glyphs.forEach((glyph) => delete glyph.dataset.untyped);
      groups.forEach((group) => delete group.dataset.untypedLabel);
      list.dataset.typing = "complete";
      delete list.dataset.paused;
      // An interruption reveals the full facts and does not restart the sequence.
      played.current = true;
    };
  // Reveal translated facts instead of restarting typing with stale glyph refs.
  }, [reduced, editing, variant, language]);
  const Tag = variant === "hero" ? "ul" : "dl";
  return (
    <Tag
      ref={(element) => {
        root.current = element;
      }}
      data-fact-typing={variant}
      data-typing-static={editing || undefined}
      className={`${className} ${styles.facts}`}
    >
      {children}
    </Tag>
  );
}
