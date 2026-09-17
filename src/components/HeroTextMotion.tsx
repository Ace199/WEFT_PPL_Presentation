"use client";
import { useEffect, useRef } from "react";
import { useEditingActivity } from "./editor/TextPreview";
import { useReducedMotion } from "./useReducedMotion";

export function HeroTextMotion() {
  const marker = useRef<HTMLSpanElement>(null);
  const editing = useEditingActivity();
  const reduced = useReducedMotion();
  useEffect(() => {
    const section = marker.current?.closest("section");
    if (!section || editing || reduced) return;
    let disposed = false,
      frame = 0,
      previous = 0;
    let glyphs: {
      element: HTMLElement;
      x: number;
      y: number;
      scale: number;
      target: number;
    }[] = [];
    const measure = () => {
      glyphs.forEach(({ element }) =>
        element.style.removeProperty("transform"),
      );
      const origin = section.getBoundingClientRect();
      glyphs = [
        ...section.querySelectorAll<HTMLElement>("[data-hero-glyph]"),
      ].map((element) => {
        const box = element.getBoundingClientRect();
        return {
          element,
          x: box.x - origin.x + box.width / 2,
          y: box.y - origin.y + box.height / 2,
          scale: 1,
          target: 1,
        };
      });
    };
    const tick = (now: number) => {
      const delta = previous ? Math.min(50, now - previous) : 16.7;
      previous = now;
      let moving = false;
      glyphs.forEach((glyph) => {
        glyph.scale +=
          (glyph.target - glyph.scale) * (1 - Math.exp(-delta / 75));
        if (Math.abs(glyph.target - glyph.scale) < 0.001)
          glyph.scale = glyph.target;
        else moving = true;
        if (glyph.scale === 1) glyph.element.style.removeProperty("transform");
        else glyph.element.style.transform = `scale(${glyph.scale.toFixed(4)})`;
      });
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const schedule = () => {
      if (!frame) {
        previous = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const origin = section.getBoundingClientRect();
      glyphs.forEach((glyph) => {
        const distance = Math.hypot(
          event.clientX - origin.x - glyph.x,
          event.clientY - origin.y - glyph.y,
        );
        glyph.target = 1 + 0.22 * Math.pow(Math.max(0, 1 - distance / 84), 2);
      });
      schedule();
    };
    const leave = () => {
      glyphs.forEach((glyph) => (glyph.target = 1));
      schedule();
    };
    const hide = () => {
      if (!document.hidden) return;
      cancelAnimationFrame(frame);
      frame = 0;
      glyphs.forEach((glyph) => {
        glyph.target = glyph.scale = 1;
        glyph.element.style.removeProperty("transform");
      });
    };
    const resize = new ResizeObserver(measure);
    resize.observe(section);
    const changes = new MutationObserver(measure);
    changes.observe(section, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", hide);
    void document.fonts.ready.then(() => {
      if (!disposed) measure();
    });
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      changes.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", hide);
      glyphs.forEach(({ element }) =>
        element.style.removeProperty("transform"),
      );
    };
  }, [editing, reduced]);
  return <span ref={marker} hidden aria-hidden="true" />;
}
