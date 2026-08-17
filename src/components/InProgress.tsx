import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'

const ACCENT = '#22D3EE'

const inProgress = [
  {
    title: 'RAG / Agent 应用开发',
    tag: '正在学',
    desc: '从检索增强生成到可自主调用的 Agent，搭建能真正干活的小助手。',
    progress: 60,
    color: '#22D3EE',
    waypoints: 4,
  },
  {
    title: '数据科学与智能算法',
    tag: '正在学',
    desc: '从数据清洗、可视化到机器学习与深度学习，补全算法基本功与应用闭环。',
    progress: 40,
    color: '#3B82F6',
    waypoints: 5,
  },
  {
    title: '微信小程序 / 自媒体工具',
    tag: '规划中',
    desc: '把重复劳动交给工具：选题、配图、发布一条龙的小助手正在构思。',
    progress: 15,
    color: '#FB923C',
    waypoints: 6,
  },
]

/* ───────── 雷达网格背景 ───────── */
function RadarGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* 同心圆 */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: `${i * 33}%`,
            height: `${i * 33}%`,
            borderColor: `rgba(34,211,238,${0.03 + i * 0.01})`,
          }}
        />
      ))}
      {/* 十字线 */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-400/[0.03]" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-400/[0.03]" />
      {/* 对角线 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent 49.8%, rgba(34,211,238,0.02) 49.8%, rgba(34,211,238,0.02) 50.2%, transparent 50.2%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(-45deg, transparent 49.8%, rgba(34,211,238,0.02) 49.8%, rgba(34,211,238,0.02) 50.2%, transparent 50.2%)',
        }}
      />
    </div>
  )
}

/* ───────── 脉冲信标 ───────── */
function Beacon({ color }: { color: string }) {
  return (
    <div className="relative w-2.5 h-2.5">
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: color, opacity: 0.8 }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: color,
          animation: 'beacon-pulse 2s ease-out infinite',
        }}
      />
    </div>
  )
}

/* ───────── 航线图进度条 ───────── */
function FlightPath({
  progress,
  color,
  waypoints,
}: {
  progress: number
  color: string
  waypoints: number
}) {
  const [hovered, setHovered] = useState(false)

  // 飞船位置直接由 progress 百分比决定

  return (
    <div
      className="relative h-10 mt-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 航线底轨 */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/[0.08] rounded-full" />

      {/* 已航行路段 */}
      <motion.div
        className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* 航点 */}
      {Array.from({ length: waypoints }).map((_, i) => {
        const pos = (i / (waypoints - 1)) * 100
        const reached = (i / (waypoints - 1)) * 100 <= progress
        return (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${pos}%` }}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: reached ? 8 : 5,
                height: reached ? 8 : 5,
                background: reached ? color : 'rgba(255,255,255,0.15)',
                boxShadow: reached ? `0 0 8px ${color}66` : 'none',
              }}
            />
          </div>
        )
      })}

      {/* 飞船 */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
        style={{
          left: `${progress}%`,
          animation: 'ship-float 2s ease-in-out infinite',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15 9H22L16 14L18 22L12 17L6 22L8 14L2 9H9L12 2Z"
            fill={color}
            opacity="0.9"
          />
        </svg>
        {/* 飞船尾焰 */}
        <div
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-[2px] rounded-full"
          style={{
            background: `linear-gradient(to left, ${color}, transparent)`,
            opacity: 0.6,
          }}
        />
      </motion.div>

      {/* hover 显示百分比 */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-cyan-300/80 whitespace-nowrap"
        >
          航行进度 {progress}%
        </motion.div>
      )}
    </div>
  )
}

/* ───────── 扫描线效果 ───────── */
function ScanLine({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {active && (
        <div
          className="absolute left-0 right-0 h-px bg-cyan-400/30"
          style={{ animation: 'sweep-line 1.5s ease-in-out forwards' }}
        />
      )}
    </div>
  )
}

/* ───────── 进度卡片 ───────── */
function ProgressCard({
  item,
  index,
}: {
  item: (typeof inProgress)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative p-6 ${glassCard} transition-all duration-300 overflow-hidden`}
        style={{
          borderColor: hovered ? `${item.color}55` : 'rgba(255,255,255,0.10)',
          boxShadow: hovered
            ? `0 0 40px ${item.color}15, inset 0 1px 0 rgba(255,255,255,0.05)`
            : 'none',
        }}
      >
        <ScanLine active={hovered} />

        {/* 顶部：信标 + 标签 + 百分比 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Beacon color={item.color} />
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                color: item.color,
                background: `${item.color}1a`,
                border: `1px solid ${item.color}55`,
              }}
            >
              {item.tag}
            </span>
          </div>
          <span className="text-sm text-white/40 font-mono">{item.progress}%</span>
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>

        {/* 描述 */}
        <p className="text-sm text-white/50 mb-2 leading-relaxed">{item.desc}</p>

        {/* 航线图 */}
        <FlightPath
          progress={item.progress}
          color={item.color}
          waypoints={item.waypoints}
        />
      </div>
    </motion.div>
  )
}

/* ───────── 主组件 ───────── */
export default function InProgress() {
  return (
    <SectionShell id="hangxing" accent={ACCENT}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <RadarGrid />

        <div className="relative z-10">
          <SectionTitle
            icon="🧭"
            label="航行星图"
            accent={ACCENT}
            title="正在鼓捣的事儿"
            desc="星图不停更新——这里记录瑞仔当前在学、在改、在规划的真实进度，不靠「已完成成就」撑场面。"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {inProgress.map((item, i) => (
              <ProgressCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}