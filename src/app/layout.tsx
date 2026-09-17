import type { Metadata } from "next";
import "@fontsource/barlow-condensed/latin-500.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "WEFT / PPL — 跨软件协作的动画生产系统",
  description:
    "WEFT / PPL 将任务、制作成果、版本与依赖组织进共享的生产模型，连接 Maya 与 Houdini 的工作流程。",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
