// 瑞仔宇宙 · 七模块定义（导航 / 行星轨道 / 宇宙通讯站共用）
export interface CosmicModule {
  id: string // 锚点 id
  name: string // 全称，如「奇点·本源星」
  short: string // 简称，如「奇点」
  icon: string // 行星图标（emoji，原型占位）
  color: string // 行星主题色
  desc: string // 一句话简介（hover / 通讯站用）
  enabled: boolean // 是否可进入（镜像星为 P2，暂未启用）
}

export const cosmicModules: CosmicModule[] = [
  {
    id: 'qidian',
    name: '奇点·本源星',
    short: '奇点',
    icon: '✦',
    color: '#FFFFFF',
    desc: '瑞仔的主场与宣言',
    enabled: true,
  },
  {
    id: 'zaowu',
    name: '造物星域',
    short: '造物',
    icon: '🛠',
    color: '#3B82F6',
    desc: '真实项目的实验记录',
    enabled: true,
  },
  {
    id: 'hangxing',
    name: '航行星图',
    short: '航行星图',
    icon: '🧭',
    color: '#22D3EE',
    desc: '正在鼓捣的事儿',
    enabled: true,
  },
  {
    id: 'xinghe',
    name: '星河电台',
    short: '星河电台',
    icon: '📡',
    color: '#FB923C',
    desc: '自媒体内容聚合',
    enabled: true,
  },
  {
    id: 'xinglian',
    name: '星链枢纽',
    short: '星链枢纽',
    icon: '🔗',
    color: '#34D399',
    desc: '合作与服务',
    enabled: true,
  },
  {
    id: 'tongxun',
    name: '宇宙通讯站',
    short: '通讯站',
    icon: '🛰',
    color: '#A855F7',
    desc: '联系与社交',
    enabled: true,
  },
  {
    id: 'jingxiang',
    name: '镜像星',
    short: '镜像星',
    icon: '👤',
    color: '#8B5CF6',
    desc: '你该找我做什么',
    enabled: true,
  },
]

// 星系视觉配色（与方案文档一致）
export const cosmicColors = {
  space: '#0B1020',
  starBlue: '#3B82F6',
  cyan: '#22D3EE',
  orange: '#FB923C',
  green: '#34D399',
  purple: '#A855F7',
}
