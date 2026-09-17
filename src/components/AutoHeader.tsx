"use client";
import { useLanguage } from "./Language";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useEditingActivity } from "./editor/TextPreview";
import { useReducedMotion } from "./useReducedMotion";
import styles from "./AutoHeader.module.css";

export function AutoHeader({ children, className, boundaryId = "summary" }: { children: ReactNode; className: string; boundaryId?: string }) {
  const {t} = useLanguage();
  const [revealed, setRevealed] = useState(false);
  const [ready, setReady] = useState(false);
  const [inHero, setInHero] = useState(true);
  const root = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hovering = useRef(false);
  const editing = useEditingActivity();
  const reduced = useReducedMotion();
  const collapsed = !inHero && !revealed && !editing && !reduced;
  const manual = (open: boolean) => {
    if (root.current) root.current.dataset.scrollTracking = "false";
    setRevealed(open);
  };
  const cancel = () => clearTimeout(timer.current);
  const reveal = () => { cancel(); manual(true); };
  const retire = (delay = 800) => {
    cancel();
    // Hero visibility already keeps the header open. Do not carry a stale
    // hover override into the first boundary crossing after the pointer left.
    if (inHero) { manual(false); return; }
    if (editing || reduced) return;
    timer.current = setTimeout(() => {
      if (!hovering.current && !root.current?.contains(document.activeElement)) manual(false);
    }, delay);
  };
  useEffect(() => {
    const header = root.current;
    const site = header?.parentElement;
    const boundary = document.getElementById(boundaryId);
    if (!header || !site || !boundary) return;
    let frame = 0;
    let beforeBoundary = true;
    const track = () => {
      frame = 0;
      const height = header.getBoundingClientRect().height;
      const strip = innerWidth <= 800 ? 10 : 8;
      const distance = Math.max(0, height - boundary.getBoundingClientRect().top);
      header.style.setProperty("--header-scroll-offset", `${Math.min(distance, height - strip)}px`);
      header.dataset.scrollTracking = "true";
      const next = distance === 0;
      if (next !== beforeBoundary) { beforeBoundary = next; setInHero(next); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(track); };
    // The mobile navigation wraps and its status can change height. Reserve
    // its actual size so the Hero ends exactly at the first viewport edge.
    const measure = () => {
      site.style.setProperty("--nav-height", `${header.getBoundingClientRect().height}px`);
      schedule();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    observer.observe(boundary);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      site.style.removeProperty("--nav-height");
      header.style.removeProperty("--header-scroll-offset");
    };
  }, [boundaryId]);
  useEffect(() => {
    setReady(true);
    clearTimeout(timer.current);
    if (inHero || editing || reduced) setRevealed(false);
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
          manual(false);
        }
      }}>
      {ready && !editing && !inHero ? <button type="button" data-header-toggle className={styles.handle}
        aria-label={collapsed ? t("展开导航") : t("收起导航")} aria-expanded={!collapsed}
        onClick={() => { cancel(); manual(collapsed); }} /> : null}
      {children}
    </header>
  );
}

export function HeaderStatus() {
  const {t} = useLanguage();
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
  return <div className={styles.status} data-status-ticker data-document-hidden={hidden}
    role="group" aria-label={t("生产状态：PRODUCTION SYSTEM，STATUS: ACTIVE，2026")}>
    <span className={styles.window} aria-hidden="true">{lines.map((line, i) => <span className={styles.slide} key={i}>{line}</span>)}</span>
  </div>;
}
