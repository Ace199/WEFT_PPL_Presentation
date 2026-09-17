"use client";
import { useLanguage } from "./Language";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { useEditingActivity } from "./editor/TextPreview";
export function MotionFigure({
  kind,
  children,
  className,
}: {
  kind: "hero" | "summary" | "footer";
  children: ReactNode;
  className?: string;
}) {
  const {t} = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const reduced = useReducedMotion();
  const editing = useEditingActivity();
  useEffect(() => {
    const root = ref.current;
    if (root && kind === "footer") {
      if (reduced || editing) return;
      let cancelled = false;
      let dispose: (() => void) | undefined;
      void import("./footer-motion").then(({ createFooterMotion }) => {
        if (cancelled) return;
        dispose = createFooterMotion(root, !played.current, () => { played.current = true; });
      });
      return () => { cancelled = true; dispose?.(); };
    }
    if (!root || reduced || editing || (played.current && kind !== "hero"))
      return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (
          !entry.isIntersecting ||
          (kind === "summary" && entry.intersectionRatio < 0.5) ||
          (played.current && kind !== "hero")
        )
          return;
        const intro = !played.current;
        played.current = true;
        observer.disconnect();
        const [{ gsap }, { ScrollTrigger }, heroBoot] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          kind === "hero" ? import("./hero-boot") : Promise.resolve(null),
        ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        let cleanupHero: (() => void) | undefined;
        const context = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: kind === "summary" ? "top 65%" : "top 95%",
              once: true,
            },
          });
          if (kind === "hero") {
            cleanupHero = heroBoot?.createHeroBoot(root, timeline, intro);
          } else if (kind === "summary") {
            timeline
              .from('[data-phase="0"]', { opacity: 0.2, duration: 0.5 }, 1)
              .from(
                '[data-phase="1"]',
                { opacity: 0, x: -15, duration: 0.65 },
                ">+=1",
              )
              .from(
                '[data-phase="2"]',
                { opacity: 0, x: -12, duration: 0.85 },
                ">+=1",
              );
          }
        }, root);
        cleanup = () => {
          context.revert();
          cleanupHero?.();
        };
      },
      { threshold: kind === "summary" ? 0.5 : 0.2 },
    );
    observer.observe(root);
    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup?.();
    };
  }, [kind, reduced, editing]);
  return (
    <div ref={ref} className={className} data-motion={kind}
      role={kind === "footer" && !reduced && !editing ? "button" : undefined}
      tabIndex={kind === "footer" && !reduced && !editing ? 0 : undefined}
      aria-label={kind === "footer" && !reduced && !editing ? t("人、数据与软件在同一生产系统中连接；重播动画") : undefined}>
      {children}
    </div>
  );
}
