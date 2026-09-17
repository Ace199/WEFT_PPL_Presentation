"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./Language";
import { useReducedMotion } from "./useReducedMotion";
import { useEditingActivity } from "./editor/TextPreview";
import { sitePath } from "@/lib/paths";
import styles from "./ProofImage.module.css";

export function ProofImage({ title, image, prototype, width, height, alt, className }: {
  title: string; image: string; prototype: string; width: number; height: number; alt: string; className: string;
}) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const editing = useEditingActivity();
  // Remove window chrome from the top, preserving the complete tool content.
  const landscape = width > height;
  const finalTop = landscape ? 33 : 32;
  const frameHeight = height - finalTop;
  const prototypeSize = landscape ? { width: 1166, height: 779, top: 14 } : { width: 451, height: 676, top: 41 };
  const prototypeScale = Math.min(width / prototypeSize.width, frameHeight / (prototypeSize.height - prototypeSize.top));
  const prototypeStyle = {
    left: `${(width - prototypeSize.width * prototypeScale) / 2 / width * 100}%`,
    top: `${((frameHeight - (prototypeSize.height - prototypeSize.top) * prototypeScale) / 2 - prototypeSize.top * prototypeScale) / frameHeight * 100}%`,
    width: `${prototypeSize.width * prototypeScale / width * 100}%`,
    height: `${prototypeSize.height * prototypeScale / frameHeight * 100}%`,
    clipPath: `inset(${prototypeSize.top / prototypeSize.height * 100}% 0 0)`,
  };
  const dialog = useRef<HTMLDialogElement>(null);
  const source = useRef<HTMLImageElement>(null);
  const result = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);
  const run = useRef(0);
  const busyRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [final, setFinal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  function stop() {
    run.current++;
    cancelAnimationFrame(frame.current);
    busyRef.current = false;
    setBusy(false);
  }
  function close() { stop(); dialog.current?.close(); setOpen(false); }
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; cancelAnimationFrame(frame.current); run.current++; };
  }, [open]);
  useEffect(() => {
    if ((reduced || editing) && busyRef.current) { stop(); setFinal(true); }
  }, [reduced, editing]);

  async function reveal() {
    if (busyRef.current || final) return;
    busyRef.current = true;
    setBusy(true);
    setFailed(false);
    const token = ++run.current;
    try { await Promise.all([source.current?.decode(), result.current?.decode()]); }
    catch { if (token === run.current) { stop(); setFailed(true); } return; }
    if (token !== run.current) return;
    if (reduced || editing) { setFinal(true); stop(); return; }
    const surface = canvas.current;
    const before = source.current;
    const after = result.current;
    const context = surface?.getContext("2d");
    if (!surface || !before || !after || !context) { setFinal(true); stop(); return; }
    const bounds = surface.getBoundingClientRect();
    const w = bounds.width, h = bounds.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    surface.width = Math.round(w * dpr); surface.height = Math.round(h * dpr);
    context.scale(dpr, dpr);
    const cellW = 8, cellH = 12;
    const columns = Math.ceil(w / cellW), rows = Math.ceil(h / cellH);
    const glyphs = "*#+";
    // Pre-render each fitted image once; each frame only copies small source tiles.
    function fitted(img: HTMLImageElement, isPrototype: boolean) {
      const buffer = document.createElement("canvas");
      buffer.width = surface!.width; buffer.height = surface!.height;
      const ctx = buffer.getContext("2d")!;
      ctx.scale(dpr, dpr);
      const top = isPrototype ? prototypeSize.top : finalTop;
      const visibleHeight = img.naturalHeight - top;
      const scale = Math.min(w / img.naturalWidth, h / visibleHeight);
      ctx.fillStyle = isPrototype ? "#fff" : "#303030";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, top, img.naturalWidth, visibleHeight,
        (w - img.naturalWidth * scale) / 2, (h - visibleHeight * scale) / 2,
        img.naturalWidth * scale, visibleHeight * scale);
      return buffer;
    }
    const oldImage = fitted(before, true), newImage = fitted(after, false);
    const noise = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    // Smooth low-frequency noise makes a few broad islands, not isolated pixels.
    const field = (x: number, y: number, offset: number) => {
      const gx = x / 14, gy = y / 9;
      const ix = Math.floor(gx), iy = Math.floor(gy);
      const sx = (gx - ix) ** 2 * (3 - 2 * (gx - ix));
      const sy = (gy - iy) ** 2 * (3 - 2 * (gy - iy));
      const a = noise(ix + offset, iy), b = noise(ix + 1 + offset, iy);
      const c = noise(ix + offset, iy + 1), d = noise(ix + 1 + offset, iy + 1);
      return (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy;
    };
    const cells = Array.from({ length: columns * rows }, (_, i) => {
      const x = i % columns, y = Math.floor(i / columns);
      return { encode: field(x, y, 0), decode: field(x, y, 71), seed: noise(x + 29, y + 17) };
    });
    const start = performance.now();
    function tick(now: number) {
      if (token !== run.current) return;
      const elapsed = now - start;
      const progress = elapsed / 1900;
      // Build a full code field, hold briefly, then dissolve it into the result.
      const fill = Math.min(1, elapsed / 650);
      const dissolve = Math.max(0, Math.min(1, (elapsed - 950) / 950));
      surface!.dataset.phase = elapsed < 650 ? "encode" : elapsed < 950 ? "code" : "decode";
      context!.clearRect(0, 0, w, h);
      context!.font = "11px monospace";
      context!.textAlign = "center"; context!.textBaseline = "middle";
      for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
        const cell = cells[y * columns + x];
        const isCode = fill >= cell.encode && (dissolve === 0 || dissolve < cell.decode);
        const px = x * cellW, py = y * cellH;
        const tw = Math.min(cellW, w - px), th = Math.min(cellH, h - py);
        if (!isCode) {
          context!.drawImage(dissolve > 0 ? newImage : oldImage, px * dpr, py * dpr, tw * dpr, th * dpr, px, py, tw, th);
        } else {
          context!.fillStyle = "#151a17"; context!.fillRect(px, py, tw, th);
          const step = Math.floor((elapsed + cell.seed * 300) / (110 + cell.seed * 100));
          const random = noise(x + step * 53, y + step * 97);
          context!.fillStyle = cell.seed > .65 ? "#b9c9c0" : "#75867b";
          context!.fillText(glyphs[Math.floor(random * glyphs.length)], px + cellW / 2, py + cellH / 2);
        }
      }
      if (progress < 1) frame.current = requestAnimationFrame(tick);
      else { setFinal(true); stop(); }
    }
    frame.current = requestAnimationFrame(tick);
  }
  return <>
    <button type="button" className={`${className} ${styles.trigger}`} aria-label={`${t("放大查看")} ${title}`} aria-haspopup="dialog" onClick={() => {
      stop(); setFinal(false); setFailed(false); setOpen(true); dialog.current?.showModal();
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sitePath(image)} width={width} height={height} alt={t(alt)} loading="lazy" decoding="async" />
      <span className={styles.hint}>{t("放大查看")} ↗</span>
    </button>
    <dialog ref={dialog} className={styles.dialog} data-format={width > height ? "landscape" : "portrait"} aria-label={`${title} / ${t(final ? "最终实现" : "设计原型")}`} onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => { stop(); setOpen(false); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      {open && <div className={styles.panel}>
        <button type="button" className={styles.stage} style={{ aspectRatio: `${width} / ${frameHeight}` }} data-stage={final ? "final" : "prototype"} aria-label={t(final ? "重新查看原型" : "点击查看最终实现")} aria-disabled={busy} onClick={() => { if (final) { stop(); setFinal(false); } else void reveal(); }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={source} src={sitePath(prototype)} alt={t("设计原型")} style={{ ...prototypeStyle, visibility: final ? "hidden" : "visible" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={result} src={sitePath(image)} alt={t(alt)} style={{ top: `${-finalTop / frameHeight * 100}%`, height: `${height / frameHeight * 100}%`, visibility: final ? "visible" : "hidden" }} />
          <canvas ref={canvas} aria-hidden="true" style={{ visibility: busy ? "visible" : "hidden" }} />
        </button>
        <p className={failed ? styles.error : styles.srOnly} role="status">{t(failed ? "图片加载失败，请点击重试" : busy ? "从原型到实现…" : final ? "最终实现" : "点击图片，从原型到最终实现")}</p>
      </div>}
    </dialog>
  </>;
}
