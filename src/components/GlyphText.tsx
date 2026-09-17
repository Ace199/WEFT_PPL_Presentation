import styles from "./GlyphText.module.css";

// Retain real text and normal word wrapping; only the glyph paint is scaled.
export function GlyphText({
  text,
  hero = true,
}: {
  text: string;
  hero?: boolean;
}) {
  const segmenter = new Intl.Segmenter("zh", { granularity: "grapheme" });
  return (
    <>
      <span className={styles.accessible} data-glyph-text>
        {text}
      </span>
      <span aria-hidden="true">
        {text.split(/([A-Za-z0-9]+|\s+)/).map((part, index) => {
          if (/^\s*$/.test(part)) return part;
          const glyphs = [...segmenter.segment(part)].map(({ segment }, i) => (
            <span
              className={styles.glyph}
              data-hero-glyph={hero ? "" : undefined}
              data-typing-glyph
              key={i}
            >
              {segment}
            </span>
          ));
          return /^[A-Za-z0-9]+$/.test(part) ? (
            <span className={styles.word} key={index}>
              {glyphs}
            </span>
          ) : (
            <span key={index}>{glyphs}</span>
          );
        })}
      </span>
    </>
  );
}
