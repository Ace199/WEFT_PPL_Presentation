"use client";
import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { gsap } from "gsap";
import { decisions } from "@/content/decisions";
import { useLanguage } from "@/components/Language";
import { useReducedMotion } from "@/components/useReducedMotion";
import styles from "./DesignPage.module.css";

export function DecisionDeck({
  cards,
  children,
}: {
  cards: ReactNode[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const previous = useRef(0);
  const directionRef = useRef(1);
  const touch = useRef<{ x: number; y: number; id: number } | null>(null);
  const wrap = (index: number) => (index + decisions.length) % decisions.length;
  const select = (index: number) => {
    directionRef.current = index >= active ? 1 : -1;
    setActive(wrap(index));
  };
  const previousCard = decisions[wrap(active - 1)];
  const nextCard = decisions[wrap(active + 1)];

  useLayoutEffect(() => {
    const panels = Array.from(
      root.current?.querySelectorAll<HTMLElement>("[data-panel]") ?? [],
    );
    const incoming = panels[active];
    const oldIndex = previous.current;
    previous.current = active;
    if (!incoming) return;
    if (oldIndex !== active)
      incoming
        .querySelector<HTMLElement>("[data-card-scroll]")
        ?.scrollTo({ top: 0 });
    const context = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, xPercent: 0 });
      gsap.set(incoming, { autoAlpha: 1 });
      if (reduced || oldIndex === active) return;
      const outgoing = panels[oldIndex];
      const direction = directionRef.current;
      const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      gsap.set(outgoing, { autoAlpha: 1 });
      gsap.set(incoming, { autoAlpha: 0, xPercent: 6 * direction });
      timeline
        .to(
          outgoing.querySelectorAll("[data-relation]"),
          { opacity: 0.15, duration: 0.13 },
          0,
        )
        .to(
          outgoing.querySelectorAll("[data-diagram]"),
          { scaleX: 0.97, transformOrigin: "50% 50%", duration: 0.22 },
          0,
        )
        .to(
          outgoing,
          { autoAlpha: 0, xPercent: -6 * direction, duration: 0.25 },
          0.04,
        )
        .to(incoming, { autoAlpha: 1, xPercent: 0, duration: 0.39 }, 0.23)
        .fromTo(
          incoming.querySelectorAll("[data-line]"),
          { strokeDasharray: "900", strokeDashoffset: 900 },
          {
            strokeDashoffset: 0,
            duration: 0.38,
            clearProps: "strokeDasharray,strokeDashoffset",
          },
          0.25,
        )
        .fromTo(
          incoming.querySelectorAll("[data-node]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.2, stagger: 0.018, clearProps: "opacity" },
          0.3,
        )
        .fromTo(
          incoming.querySelectorAll("[data-relation]"),
          { opacity: 0.1 },
          { opacity: 1, duration: 0.18 },
          0.48,
        );
    }, root);
    // Revert every owned property before an interrupted transition or unmount.
    return () => context.revert();
  }, [active, reduced]);

  function keyboard(event: KeyboardEvent<HTMLElement>) {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      (event.target as HTMLElement).closest("[data-artifact-control], pre") ||
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    )
      return;
    const next =
      event.key === "ArrowRight"
        ? active + 1
        : event.key === "ArrowLeft"
          ? active - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? decisions.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      "[data-index]",
    );
    if (button)
      button.parentElement
        ?.querySelectorAll<HTMLButtonElement>("button")
        [wrap(next)]?.focus({ preventScroll: true });
  }
  function pointerStart(event: PointerEvent) {
    if (
      event.pointerType === "mouse" ||
      (event.target as HTMLElement).closest(
        "a,button,pre,[data-artifact-control]",
      )
    )
      return;
    touch.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }
  function pointerEnd(event: PointerEvent) {
    const start = touch.current;
    touch.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x,
      dy = event.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4)
      select(active + (dx < 0 ? 1 : -1));
  }
  return (
    <>
      <div
        ref={root}
        className={styles.viewer}
        id="design-viewer"
        data-active-decision={decisions[active].id}
      >
        <div
          className={styles.indexes}
          role="group"
          aria-label={
            language === "zh" ? "设计决策索引" : "Design decision index"
          }
          onKeyDown={keyboard}
        >
          {decisions.map((decision, i) => (
            <button
              key={decision.id}
              type="button"
              data-index=""
              aria-pressed={active === i}
              aria-controls={`decision-${decision.id}`}
              onClick={() => select(i)}
            >
              <span>
                {decision.index} / {decision.category}
              </span>
              <span>{decision.label}</span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
        <section
          className={styles.deck}
          aria-labelledby="deck-title"
          onKeyDown={keyboard}
        >
          <h2 className={styles.label} id="deck-title">
            DESIGN DECISION VIEWER / {String(decisions.length).padStart(2, "0")}
          </h2>
          <div className={styles.deckFrame}>
            <button
              type="button"
              className={`${styles.cardEdge} ${styles.previousEdge}`}
              aria-label={
                language === "zh" ? "上一张决策卡" : "Previous decision card"
              }
              onClick={() => select(active - 1)}
            >
              {`${previousCard.index} / ${previousCard.category}`}
            </button>
            <div
              className={styles.poster}
              tabIndex={0}
              role="region"
              aria-label={
                language === "zh"
                  ? "设计决策卡片，左右方向键切换"
                  : "Design decision card; use left and right arrow keys"
              }
              onPointerDown={pointerStart}
              onPointerUp={pointerEnd}
              onPointerCancel={() => {
                touch.current = null;
              }}
            >
              <div className={styles.panels}>
                {cards.map((card, i) => (
                  <div
                    key={decisions[i].id}
                    className={styles.panel}
                    data-panel=""
                    data-active={i === active}
                    id={`decision-${decisions[i].id}`}
                    aria-hidden={i !== active}
                    inert={i !== active}
                  >
                    {card}
                  </div>
                ))}
              </div>
              <nav
                className={styles.deckNav}
                aria-label={
                  language === "zh" ? "卡片切换" : "Decision navigation"
                }
              >
                <button
                  type="button"
                  onClick={() => select(active - 1)}
                >
                  ← PREV
                </button>
                <div>
                  {decisions.map((d, i) => (
                    <button
                      key={d.id}
                      type="button"
                      aria-label={`${d.index} / ${d.category}`}
                      aria-pressed={active === i}
                      onClick={() => select(i)}
                    >
                      <i aria-hidden="true" />
                      {d.index}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                >
                  NEXT →
                </button>
              </nav>
            </div>
            <button
              type="button"
              className={styles.cardEdge}
              aria-label={
                language === "zh" ? "下一张决策卡" : "Next decision card"
              }
              onClick={() => select(active + 1)}
            >
              {`${nextCard.index} / ${nextCard.category}`}
            </button>
          </div>
          <p
            className={styles.srOnly}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {decisions[active].index} / {decisions[active].category} ·{" "}
            {decisions[active].title[language]}
          </p>
        </section>
      </div>
      {children}
    </>
  );
}
