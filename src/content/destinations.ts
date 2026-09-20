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
    slug: "contact",
    index: "03",
    title: "联系",
    english: "CONTACT",
    description:
      "关于 WEFT / PPL、复杂生产系统与人和工具的协作。",
  },
] as const;
export const viewRoutes = {
  organize: "/systematic-thinking/",
  transform: "/design-innovation/",
} as const;
