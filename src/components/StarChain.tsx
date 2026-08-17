import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'

const ACCENT = '#34D399'

const services = [
  {
    title: 'AI 智能体 / Agent 搭建',
    desc: '基于大模型打造对话助手、自动化工作流、RAG 知识库，让 AI 真正帮你干活。',
    forWho: '创业者 / 运营 / 课程项目',
    color: '#34D399',
    iconType: 'bot' as const,
  },
  {
    title: '小程序 / Web 工具定制',
    desc: '微信小程序、H5 工具、轻量 Web 应用，从想法到能跑一条龙。',
    forWho: '个人 / 小团队 / 在校生',
    color: '#3B82F6',
    iconType: 'gear' as const,
  },
  {
    title: '网站开发 / 前端实现',
    desc: '个人作品集、企业官网、活动页，React / Vue 站点与交互体验。',
    forWho: '求职者 / 创作者 / 企业',
    color: '#FB923C',
    iconType: 'layout' as const,
  },
  {
    title: '数据分析 / 可视化',
    desc: '从数据清洗、建模到可视化看板，把杂乱数据讲成清楚的 Story。',
    forWho: '运营 / 调研 / 竞赛',
    color: '#A855F7',
    iconType: 'chart' as const,
  },
]

/* ───────── 节点网络背景 ───────── */
function NodeNetwork({
  hoveredIndex,
}: {
  hoveredIndex: number | null
}) {
  const nodes = useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 2 + Math.random() * 3,
      })),
    []
  )

  // 节点间连线（近邻连接）
  const connections = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 35) {
          lines.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
          })
        }
      }
    }
    return lines
  }, [nodes])

  const isActive = hoveredIndex !== null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="w-full h-full" preserveAspectRatio="none">
        {/* 连线 */}
        {connections.map((line, i) => (
          <line
            key={i}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke={ACCENT}
            strokeWidth="0.5"
            opacity={isActive ? 0.12 : 0.04}
            style={{ transition: 'opacity 0.4s ease' }}
          />
        ))}
        {/* 节点 */}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={ACCENT}
            opacity={isActive ? 0.25 : 0.08}
            style={{ transition: 'opacity 0.4s ease' }}
          />
        ))}
      </svg>
    </div>
  )
}

/* ───────── 数据流光边框 ───────── */
function FlowBorder({ active, color }: { active: boolean; color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
      {active && (
        <>
          {/* 流光层：用 conic-gradient 实现旋转光 */}
          <div
            className="absolute inset-[-2px] rounded-2xl"
            style={{
              background: `conic-gradient(from 0deg, transparent 0%, ${color}40 20%, transparent 40%, transparent 60%, ${color}30 80%, transparent 100%)`,
              animation: 'knob-tick 3s linear infinite',
            }}
          />
          {/* 遮罩层：只保留边框 */}
          <div
            className="absolute inset-[1px] rounded-[14px]"
            style={{ background: '#0B1020' }}
          />
        </>
      )}
    </div>
  )
}

/* ───────── 服务图标动效 ───────── */
function ServiceIcon({ type, color }: { type: 'gear' | 'chart' | 'code' | 'bot' | 'layout'; color: string }) {
  if (type === 'bot') {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: 'ship-float 3s ease-in-out infinite' }}
      >
        <rect x="4" y="9" width="16" height="10" rx="2" />
        <path d="M12 9V5m0 0h-2.5M12 5h2.5" />
        <circle cx="9" cy="14" r="1" fill={color} stroke="none" />
        <circle cx="15" cy="14" r="1" fill={color} stroke="none" />
        <path d="M9.5 16.5h5" />
      </svg>
    )
  }

  if (type === 'layout') {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: 'ship-float 3s ease-in-out infinite' }}
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <circle cx="6" cy="6.5" r="0.5" fill={color} stroke="none" />
        <circle cx="8.5" cy="6.5" r="0.5" fill={color} stroke="none" />
        <path d="M7 13l3 2 4-4" />
      </svg>
    )
  }

  if (type === 'gear') {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: 'gear-spin 8s linear infinite' }}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24M6.34 17.66l-4.24 4.24M23 12h-6m-6 0H1m20.07 4.93l-4.24-4.24M6.34 6.34L2.1 2.1" />
      </svg>
    )
  }

  if (type === 'chart') {
    return (
      <div className="flex items-end gap-[3px] h-5">
        {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
          <div
            key={i}
            className="w-[3px] rounded-sm"
            style={{
              height: `${h * 100}%`,
              background: color,
              opacity: 0.8,
              animation: `chart-grow 0.6s ease-out ${i * 0.1}s both`,
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>
    )
  }

  // code
  return (
    <div className="font-mono text-sm" style={{ color }}>
      <span style={{ animation: 'code-blink 1.5s ease-in-out infinite' }}>{'{'}</span>
      <span style={{ animation: 'code-blink 1.5s ease-in-out 0.3s infinite' }}>{'}'}</span>
    </div>
  )
}

/* ───────── 卡片间连线高亮 ───────── */
function CardConnections({
  activeIndex,
}: {
  activeIndex: number | null
}) {
  if (activeIndex === null) return null

  const positions = [
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 25, y: 75 },
    { x: 75, y: 75 },
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      preserveAspectRatio="none"
      style={{ opacity: 0.15 }}
    >
      {positions.map((pos, i) => {
        if (i === activeIndex) return null
        return (
          <line
            key={i}
            x1={`${positions[activeIndex].x}%`}
            y1={`${positions[activeIndex].y}%`}
            x2={`${pos.x}%`}
            y2={`${pos.y}%`}
            stroke={services[activeIndex].color}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        )
      })}
    </svg>
  )
}

/* ───────── 服务卡片 ───────── */
function ServiceCard({
  service,
  index,
  hoveredIndex,
  onHover,
}: {
  service: (typeof services)[0]
  index: number
  hoveredIndex: number | null
  onHover: (i: number | null) => void
}) {
  const isHovered = hoveredIndex === index

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      className="relative"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`relative p-6 ${glassCard} transition-all duration-300 flex flex-col overflow-hidden`}
        style={{
          borderColor: isHovered ? `${service.color}55` : 'rgba(255,255,255,0.10)',
          boxShadow: isHovered
            ? `0 0 40px ${service.color}12, inset 0 1px 0 rgba(255,255,255,0.05)`
            : 'none',
        }}
      >
        <FlowBorder active={isHovered} color={service.color} />

        {/* 图标 */}
        <span
          className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-4"
          style={{
            background: `${service.color}1a`,
            border: `1px solid ${service.color}55`,
          }}
        >
          <ServiceIcon type={service.iconType} color={service.color} />
        </span>

        <h3 className="relative z-10 text-lg font-semibold text-white mb-2">
          {service.title}
        </h3>
        <p className="relative z-10 text-sm text-white/50 leading-relaxed mb-4 flex-1">
          {service.desc}
        </p>
        <div className="relative z-10 text-xs text-white/40 mb-4">
          适合：{service.forWho}
        </div>
        <a
          href="#tongxun"
          className="relative z-10 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:brightness-110"
          style={{
            color: service.color,
            background: `${service.color}14`,
            border: `1px solid ${service.color}55`,
          }}
        >
          聊聊需求 →
        </a>
      </div>
    </motion.div>
  )
}

/* ───────── 主组件 ───────── */
export default function StarChain() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <SectionShell id="xinglian" accent={ACCENT}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <NodeNetwork hoveredIndex={hoveredIndex} />

        <div className="relative z-10">
          <SectionTitle
            icon="🔗"
            label="星链枢纽"
            accent={ACCENT}
            title="合作与服务"
            desc="把瑞仔宇宙的能力，接进你的需求。下面是当前开放的合作方向——先亮定位，随时可聊。"
          />

          <div className="relative">
            <CardConnections activeIndex={hoveredIndex} />

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              {services.map((s, i) => (
                <ServiceCard
                  key={s.title}
                  service={s}
                  index={i}
                  hoveredIndex={hoveredIndex}
                  onHover={setHoveredIndex}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-white/40"
        >
          ✦ 学生价友好，欢迎先来「宇宙通讯站」发个信号。
        </motion.p>
      </div>
    </SectionShell>
  )
}