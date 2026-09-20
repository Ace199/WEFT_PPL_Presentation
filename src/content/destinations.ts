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
    title: "设计&创新",
    english: "DESIGN & INNOVATION",
    description:
      "兼容历史、可组合模块、完整状态、任务协作与可执行规则：五项生产模型设计决策。",
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
    title: "真实生产中的实践",
    english: "IN PRODUCTION",
    description:
      "这里将介绍这些设计在真实生产系统中如何工作。详细内容正在整理，当前可在首页查看实际工具界面。",
  },
  {
    slug: "in-production",
    index: "02",
    title: "设计如何进入真实生产",
    english: "IN PRODUCTION",
    description: "五项设计决策对应的生产结构、记录语义、任务汇总与实际工具界面。",
  },
] as const;
export const viewRoutes = {
  organize: "/systematic-thinking/",
  transform: "/design-innovation/",
  extend: "/next/",
} as const;
