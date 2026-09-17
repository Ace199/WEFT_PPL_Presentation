export const destinations = [
  {
    slug: "systematic-thinking",
    index: "01",
    title: "系统思考",
    english: "SYSTEMATIC THINKING",
    description:
      "从动画生产的依赖网络、历史兼容、局部变化与执行规则，理解 WEFT / PPL 的共享生产语义。",
  },
  {
    slug: "design-innovation",
    index: "02",
    title: "设计与创新",
    english: "DESIGN & INNOVATION",
    description:
      "该章节的完整设计案例尚未开放。当前可在首页查看 Transform 简短预览。",
  },
  {
    slug: "next",
    index: "03",
    title: "下一步",
    english: "WHAT COMES NEXT",
    description:
      "该章节的详细内容尚未开放。当前可在首页通过 Extend 查看现有结构与未来方向。",
  },
  {
    slug: "evidence",
    index: "04",
    title: "生产证据",
    english: "PRODUCTION EVIDENCE",
    description:
      "完整证据内容尚未开放，真实生产截图仍待脱敏补充。此页不代表生产证据验收已经完成。",
  },
] as const;
export const viewRoutes = {
  organize: "/systematic-thinking/",
  transform: "/design-innovation/",
  extend: "/next/",
} as const;
