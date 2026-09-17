import { AutoHeader, HeaderStatus } from "./AutoHeader";
import { LanguageSwitch, LocalizedText as T, LocalizedElement } from "./Language";
import { destinations } from "@/content/destinations";
import { sitePath } from "@/lib/paths";
import styles from "@/app/page.module.css";

export function SiteHeader({ current = "", boundaryId = "summary" }: { current?: string; boundaryId?: string }) {
  return <AutoHeader className={styles.header} boundaryId={boundaryId}>
    <a href={sitePath("/")} className={styles.wordmark} aria-label="WEFT / PPL">WEFT / PPL</a>
    <LocalizedElement as="nav" label="章节导航">
      <a href={sitePath("/")} aria-current={current === "" ? "page" : undefined}><T text="00 / 项目概览" /></a>
      {destinations.slice(0, 3).map(item => <a href={sitePath(`/${item.slug}/`)} key={item.slug} aria-current={current === item.slug ? "page" : undefined}>{item.index} / <T text={item.title} /></a>)}
    </LocalizedElement>
    <div className={styles.headerUtilities}><HeaderStatus /><LanguageSwitch /></div>
  </AutoHeader>;
}
