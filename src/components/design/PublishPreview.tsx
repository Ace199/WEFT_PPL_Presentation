"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "@/lib/paths";
import { DesignText as T } from "./DesignText";
import styles from "./PublishPreview.module.css";

function Screenshot() {
  return <svg viewBox="0 32 563 881" role="img" aria-label="Publish / QC — actual interface">
    <image href={sitePath("/images/proof/publish.png")} width="563" height="913" />
  </svg>;
}

export function PublishPreview() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  function close() { dialog.current?.close(); }
  return <>
    <button ref={trigger} type="button" className={styles.preview} aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
      <Screenshot />
      <span><T zh="放大查看" en="View larger" /> ↗</span>
    </button>
    <dialog ref={dialog} className={styles.dialog} aria-label="Publish / QC" onCancel={event => { event.preventDefault(); close(); }} onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <Screenshot />
      <button autoFocus className={styles.close} type="button" aria-label="关闭 / Close" onClick={close}>×</button>
    </dialog>
  </>;
}
