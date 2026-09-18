"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Progressive enhancement: server-rendered content is always complete. */
export function Reveal({
  children,
  className,
  slow = false,
  sequence,
  speed = 1,
  maxScrollRate = 5,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
  sequence?: number;
  speed?: number;
  maxScrollRate?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let visible = false;
    let finished = false;
    let scrollRate = 1.5;
    let previousScrollTop = window.scrollY;
    let previousScrollAt = performance.now();
    let rateTimer = 0;
    let unlocked = sequence === undefined || sequence === 1 ||
      document.querySelector(`[data-reveal-sequence="${(sequence ?? 1) - 1}"][data-motion="complete"]`) !== null;
    let timeline: gsap.core.Timeline | undefined;
    let context: gsap.Context | undefined;
    const sync = () => {
      element.style.setProperty("--character-motion-state", visible && !document.hidden && !media.matches ? "running" : "paused");
      if (media.matches) {
        timeline?.progress(1);
        finished = true;
        element.dataset.motion = "complete";
      } else if (!finished && visible && unlocked && !document.hidden) timeline?.play();
      else timeline?.pause();
    };
    const setScrollRate = (next: number) => {
      scrollRate = Math.min(maxScrollRate, Math.max(1.5, next));
      element.style.setProperty("--scroll-motion-rate", scrollRate.toFixed(2));
      element.dataset.scrollRate = scrollRate.toFixed(2);
      timeline?.timeScale(scrollRate);
    };
    const settleScrollRate = () => {
      clearTimeout(rateTimer);
      rateTimer = window.setTimeout(() => setScrollRate(1.5), 160);
    };
    const trackScrollRate = () => {
      const now = performance.now();
      const top = window.scrollY;
      const distance = top - previousScrollTop;
      const elapsed = Math.max(16, now - previousScrollAt);
      previousScrollTop = top;
      previousScrollAt = now;
      if (distance <= 0 || media.matches) return;
      const velocity = distance / elapsed * 1000;
      // Up to 1,200px/s is normal reading: retain the 1.5× baseline. Above
      // that threshold, a 4,800px/s flick reaches the per-figure ceiling.
      const acceleration = Math.min(1, Math.max(0, (velocity - 1200) / 3600));
      setScrollRate(1.5 + acceleration * (maxScrollRate - 1.5));
      settleScrollRate();
    };
    const unlock = (event: Event) => {
      if (!(event instanceof CustomEvent) || event.detail !== (sequence ?? 1) - 1) return;
      unlocked = true;
      sync();
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
              if (sequence !== undefined)
                window.dispatchEvent(new CustomEvent("systematic-reveal-complete", { detail: sequence }));
            },
          });
          timeline.timeScale(scrollRate);
          for (const group of groups) {
            // Keep the first half-second empty; pausing offscreen also pauses this wait.
            const at = (0.5 + Number(group.dataset.step) * (sequential ? 0.3 : slow ? 0.38 : 0.3)) / speed;
            // Start local loops when this node enters, independently of later steps.
            timeline.set(group, { attr: { "data-entered": "true" } }, at);
            timeline.from(
              group,
              { opacity: 0, duration: (sequential ? 0.22 : 0.45) / speed, ease: "power2.out" },
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
                    duration: (sequential ? 0.28 : 0.65) / speed,
                    clearProps: "strokeDasharray,strokeDashoffset",
                  },
                  at,
                );
                if (sequential) timeline!.set(path, { clearProps: "markerEnd" }, at + 0.28 / speed);
              });
          }
        }, element);
        element.dataset.motion = "ready";
        sync();
      });
    else element.dataset.motion = "complete";
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("scroll", trackScrollRate, { passive: true });
    window.addEventListener("systematic-reveal-complete", unlock);
    return () => {
      disposed = true;
      observer.disconnect();
      context?.revert();
      clearTimeout(rateTimer);
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", trackScrollRate);
      window.removeEventListener("systematic-reveal-complete", unlock);
    };
  }, [slow, sequence, speed, maxScrollRate]);
  return (
    <div ref={root} className={className} data-reveal data-motion="pending" data-reveal-sequence={sequence}>
      {children}
    </div>
  );
}
