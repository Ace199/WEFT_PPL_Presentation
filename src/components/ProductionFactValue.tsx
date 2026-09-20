"use client";
import { Fragment, useEffect, useId, useState, type CSSProperties, type ReactNode } from "react";
import { GlyphText } from "./GlyphText";
import { useLanguage } from "./Language";
import styles from "./ProductionFactValue.module.css";

const systemTerms: Record<string, { description: string; href: string }> = {
  Rez: { description: "版本管理", href: "https://rez.readthedocs.io/en/stable/#" },
  Ftrack: { description: "制片管理", href: "https://www.ftrack.com/cn/" },
  Pyblish: { description: "Pub Base", href: "https://pyblish.com/" },
};

function Term({ description, href, children }: { description: string; href: string; children: ReactNode }) {
  const { t } = useLanguage();
  const explanation = t(description);
  const explanationLanguage = /[\u3400-\u9fff]/.test(explanation) ? "zh-CN" : "en";
  const hintUnits = [...explanation].reduce((total, char) => total + (/[\u3400-\u9fff]/.test(char) ? 1 : .55), 0);
  const id = useId();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);
  return <span className={styles.term} data-open={open}
    onPointerEnter={event => { if (event.pointerType !== "touch") setOpen(true); }}
    onPointerLeave={() => setOpen(false)}>
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.trigger} aria-describedby={id}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      <span className={styles.name}>{children}</span>
    </a>
    <span id={id} role="tooltip" className={styles.tooltip} aria-hidden={!open}>
      <span className={styles.window} lang={explanationLanguage} style={{ '--hint-units': hintUnits } as CSSProperties}><span className={styles.label}>{explanation}</span></span>
    </span>
  </span>;
}

export function ProductionFactValue({ value, category }: { value: string; category: string }) {
  const { t } = useLanguage();
  if (category === "SYSTEM") return <span className={styles.systems}>
    {value.split(" / ").map((name, index) => <Fragment key={name}>
      {index > 0 ? <span className={styles.separator}><GlyphText text=" / " hero={false} /></span> : null}
      {systemTerms[name] ? <Term {...systemTerms[name]}><GlyphText text={name} hero={false} /></Term>
        : <GlyphText text={name} hero={false} />}
    </Fragment>)}
  </span>;
  const translated = t(value);
  if (category === "PROJECT" && /[\u3400-\u9fff]/.test(translated)) {
    return <span className={styles.project}><GlyphText text={translated} hero={false} /></span>;
  }
  return <GlyphText text={translated} hero={false} />;
}
