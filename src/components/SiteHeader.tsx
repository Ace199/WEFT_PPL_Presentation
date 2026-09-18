import { AutoHeader, HeaderStatus } from "./AutoHeader";
import Link from "next/link";
import { LanguageSwitch, LocalizedText as T, LocalizedElement } from "./Language";
import { destinations } from "@/content/destinations";
import { sitePath } from "@/lib/paths";
import styles from "@/app/page.module.css";

export function SiteHeader({ current = "", boundaryId = "summary" }: { current?: string; boundaryId?: string }) {
  return <AutoHeader className={styles.header} boundaryId={boundaryId}>
    <Link prefetch={false} href={sitePath("/")} className={styles.wordmark} aria-label="WEFT / PPL">WEFT / PPL</Link>
    <LocalizedElement as="nav" label="章节导航">
      <Link prefetch={false} href={sitePath("/")} aria-current={current === "" ? "page" : undefined}><T text="00 / 项目概览" /></Link>
      {destinations.slice(0, 3).map(item => <Link prefetch={false} href={sitePath(`/${item.slug}/`)} key={item.slug} aria-current={current === item.slug ? "page" : undefined}>{item.index} / <T text={item.title} /></Link>)}
    </LocalizedElement>
    <div className={styles.headerUtilities}><HeaderStatus /><LanguageSwitch /></div>
  </AutoHeader>;
}
