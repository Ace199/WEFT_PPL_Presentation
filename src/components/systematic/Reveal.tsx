"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Progressive enhancement: server-rendered content is always complete. */
export function Reveal({
  children,
  className,
  slow = false,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let visible = false;
    let finished = false;
    let timeline: gsap.core.Timeline | undefined;
    let context: gsap.Context | undefined;
    const sync = () => {
      element.style.setProperty("--character-motion-state", visible && !document.hidden && !media.matches ? "running" : "paused");
      if (media.matches) {
        timeline?.progress(1);
        finished = true;
        element.dataset.motion = "complete";
      } else if (!finished && visible && !document.hidden) timeline?.play();
      else timeline?.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    if (!media.matches)
      void import("gsap").then(({ gsap }) => {
        if (disposed || media.matches) return;
        const groups = Array.from(
          element.querySelectorAll<SVGElement | HTMLElement>("[data-step]"),
        );
        const sequential = !!element.querySelector('[data-flow="sequential"]');
        context = gsap.context(() => {
          timeline = gsap.timeline({
            paused: true,
            onComplete: () => {
              finished = true;
              element.dataset.motion = "complete";
            },
          });
          for (const group of groups) {
            // Keep the first half-second empty; pausing offscreen also pauses this wait.
            const at = 0.5 + Number(group.dataset.step) * (sequential ? 0.3 : slow ? 0.38 : 0.3);
            // Start local loops when this node enters, independently of later steps.
            timeline.set(group, { attr: { "data-entered": "true" } }, at);
            timeline.from(
              group,
              { opacity: 0, duration: sequential ? 0.22 : 0.45, ease: "power2.out" },
              at,
            );
            group
              .querySelectorAll<SVGPathElement>("path[data-draw]")
              .forEach((path) => {
                const length = path.getTotalLength();
                timeline!.fromTo(
                  path,
                  { strokeDasharray: length, strokeDashoffset: length, ...(sequential ? { markerEnd: "none" } : {}) },
                  {
                    strokeDashoffset: 0,
                    duration: sequential ? 0.28 : 0.65,
                    clearProps: "strokeDasharray,strokeDashoffset",
                  },
                  at,
                );
                if (sequential) timeline!.set(path, { clearProps: "markerEnd" }, at + 0.28);
              });
          }
        }, element);
        element.dataset.motion = "ready";
        sync();
      });
    else element.dataset.motion = "complete";
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      context?.revert();
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [slow]);
  return (
    <div ref={root} className={className} data-reveal>
      {children}
    </div>
  );
}
