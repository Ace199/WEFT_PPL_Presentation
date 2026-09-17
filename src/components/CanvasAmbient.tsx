"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";
export default function CanvasAmbient() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || reduced) return;
    let frame = 0,
      visible = false,
      width = 0,
      height = 0,
      tick = 0;
    const draw = () => {
      tick++;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#cad9d0";
      const count = width < 600 ? 30 : 70;
      for (let i = 0; i < count; i++) {
        const x = (i * 137.51) % width,
          y = height * 0.34 + ((i * 63.29) % (height * 0.5));
        context.globalAlpha = 0.13 + Math.sin(tick * 0.007 + i) * 0.07;
        context.fillRect(x, y + Math.sin(tick * 0.003 + i) * 4, 1, 1);
      }
      canvas.dataset.frames = String(tick);
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      canvas.dataset.running = String(visible && !document.hidden);
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(devicePixelRatio, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    resize.observe(canvas);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", sync);
      canvas.dataset.running = "false";
    };
  }, [reduced]);
  return (
    <canvas
      ref={ref}
      data-running="false"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
