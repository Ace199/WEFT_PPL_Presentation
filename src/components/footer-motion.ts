import { gsap } from "gsap";
import { motion } from "@/lib/motion";

export function createFooterMotion(root: HTMLElement, initial: boolean, onStart: () => void) {
  let visible = false;
  let entered = !initial;
  let started = !initial;
  let finished = !initial;
  let plays = 0;
  const entranceDelay = 1.5;
  let timeline: gsap.core.Timeline;
  const context = gsap.context(() => {
    timeline = gsap.timeline({
      paused: true,
      onComplete: () => { finished = true; root.dataset.footerState = "complete"; },
    });
    timeline
      .call(() => {
        started = true;
        onStart();
        root.dataset.footerState = "playing";
        root.dataset.footerPlays = String(++plays);
      }, [], entranceDelay)
      .from('[data-circle="0"]', { x: -16, duration: motion.normal }, entranceDelay)
      .from('[data-circle="2"]', { x: 16, duration: motion.normal }, entranceDelay);
    if (!initial) timeline.progress(1, true);
  }, root);
  root.dataset.footerState = initial ? "waiting" : "complete";
  root.dataset.footerPlays = "0";
  const sync = () => {
    if (!visible || document.hidden) {
      timeline.pause();
      root.dataset.footerPaused = "true";
      return;
    }
    root.dataset.footerPaused = "false";
    if (!entered) { entered = true; timeline.play(0); }
    else if (!finished) timeline.resume();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
    sync();
  }, { threshold: [0, 0.5] });
  observer.observe(root);
  const replay = () => {
    // Preserve the first 1.5-second hold even if the pointer arrives early.
    if (!visible || document.hidden || !started) return;
    finished = false;
    timeline.pause(0, true).play(entranceDelay, false);
  };
  const pointer = (event: PointerEvent) => { if (event.pointerType === "mouse") replay(); };
  const key = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); replay(); }
  };
  root.addEventListener("pointerenter", pointer);
  root.addEventListener("click", replay);
  root.addEventListener("keydown", key);
  document.addEventListener("visibilitychange", sync);
  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
    root.removeEventListener("pointerenter", pointer);
    root.removeEventListener("click", replay);
    root.removeEventListener("keydown", key);
    context.revert();
    delete root.dataset.footerState;
    delete root.dataset.footerPlays;
    delete root.dataset.footerPaused;
  };
}
