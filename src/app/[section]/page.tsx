import { LanguageSwitch, LocalizedText as T } from "@/components/Language";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations } from "@/content/destinations";
import { sitePath } from "@/lib/paths";
import styles from "./page.module.css";
import { SystematicPage } from "@/components/systematic/SystematicPage";
import { DesignPage } from "@/components/design/DesignPage";
import { InProductionPage } from "@/components/design/InProductionPage";
export const dynamicParams = false;
export function generateStaticParams() {
  return destinations.map((item) => ({ section: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const item = destinations.find((destination) => destination.slug === section);
  return {
    title: `WEFT / PPL — ${item?.title ?? "内容尚未开放"}`,
    robots: { index: ["systematic-thinking", "design-innovation", "in-production"].includes(section), follow: true },
  };
}
export default async function Destination({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const item = destinations.find((destination) => destination.slug === section);
  if (!item) notFound();
  if (section === "systematic-thinking") return <SystematicPage />;
  if (section === "design-innovation") return <DesignPage />;
  if (section === "in-production") return <InProductionPage />;
  return (
    <div className={styles.page}>
      <header>
        <a href={sitePath("/")}>WEFT / PPL</a>
        <span>PRODUCTION SYSTEM / 2026</span>
        <LanguageSwitch />
      </header>
      <main>
        <p className={styles.index}>
          {item.index} / {item.english}
        </p>
        <h1>{<T text={item.title} />}</h1>
        <h2><T text="内容尚未开放" /></h2>
        <p className={styles.description}>{<T text={item.description} />}</p>
        <a className={styles.back} href={sitePath("/")}>
          <T text="返回首页" /> <span aria-hidden="true">↗</span>
        </a>
      </main>
      <footer>WEFT / PPL · A Cross-DCC Production System</footer>
    </div>
  );
}
