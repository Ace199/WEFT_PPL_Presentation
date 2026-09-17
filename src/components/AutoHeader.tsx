"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useEditingActivity } from "./editor/TextPreview";
import { useReducedMotion } from "./useReducedMotion";
import styles from "./AutoHeader.module.css";

export function AutoHeader({ children, className }: { children: ReactNode; className: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);
  const [inHero, setInHero] = useState(true);
  const root = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hovering = useRef(false);
  const editing = useEditingActivity();
  const reduced = useReducedMotion();
  const cancel = () => clearTimeout(timer.current);
  const reveal = () => { cancel(); setCollapsed(false); };
  const retire = (delay = 800) => {
    cancel();
    if (editing || reduced || inHero) return;
    timer.current = setTimeout(() => {
      if (!hovering.current && !root.current?.contains(document.activeElement)) setCollapsed(true);
    }, delay);
  };
  useEffect(() => {
    const hero = document.getElementById("hero-title")?.closest("section");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setInHero(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    setReady(true);
    clearTimeout(timer.current);
    setCollapsed(false);
    if (!editing && !reduced && !inHero) timer.current = setTimeout(() => {
      if (!hovering.current && !root.current?.contains(document.activeElement)) setCollapsed(true);
    }, 800);
    return () => clearTimeout(timer.current);
  }, [editing, reduced, inHero]);
  return (
    <header ref={root} data-site-header data-in-hero={inHero} data-collapsed={collapsed} className={`${className} ${styles.header}`}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") { hovering.current = true; reveal(); } }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") { hovering.current = false; retire(); } }}
      onFocusCapture={(event) => { if (!(event.target as HTMLElement).hasAttribute("data-header-toggle")) reveal(); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) retire(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && ready && !inHero && !editing) {
          event.preventDefault();
          root.current?.querySelector<HTMLButtonElement>("[data-header-toggle]")?.focus({ preventScroll: true });
          cancel();
          setCollapsed(true);
        }
      }}>
      {ready && !editing && !inHero ? <button type="button" data-header-toggle className={styles.handle}
        aria-label={collapsed ? "展开导航" : "收起导航"} aria-expanded={!collapsed}
        onClick={() => { cancel(); setCollapsed((value) => !value); }} /> : null}
      {children}
    </header>
  );
}

export function HeaderStatus() {
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();
  const editing = useEditingActivity();
  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  const lines = [<>PRODUCTION SYSTEM</>, <>STATUS: <b>ACTIVE</b></>, <>2026</>];
  if (reduced || editing) return <div className={styles.staticStatus}>{lines.map((line, i) => <span key={i}>{line}</span>)}</div>;
  return <button type="button" className={styles.status} data-status-paused={paused || hidden}
    aria-label={`${paused ? "继续" : "暂停"}状态轮播：PRODUCTION SYSTEM，STATUS: ACTIVE，2026`}
    onClick={() => setPaused((value) => !value)}>
    <span className={styles.window} aria-hidden="true">{lines.map((line, i) => <span className={styles.slide} key={i}>{line}</span>)}</span>
    <span className={styles.pause} aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
  </button>;
}
