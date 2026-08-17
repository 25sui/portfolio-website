import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'

const ACCENT = '#FB923C'

const channels = [
  {
    name: '小红书',
    handle: '@瑞仔（待填）',
    desc: 'AI 辅助开发实战 · 大二真实成长日记',
    color: '#FB923C',
    freq: '104.5',
    href: '#',
  },
  {
    name: '抖音',
    handle: '@瑞仔（待填）',
    desc: '项目拆解短视频 · 从 0 到能跑的全过程',
    color: '#FE2C55',
    freq: '98.7',
    href: '#',
  },
  {
    name: '公众号',
    handle: '@瑞仔（待填）',
    desc: '技术长文 · 算法 / 全栈踩坑记录',
    color: '#07C160',
    freq: '112.3',
    href: '#',
  },
]

/* ───────── 音频波形条 ───────── */
function WaveBars({ active, color }: { active: boolean; color: string }) {
  const bars = useMemo(
    () =>
      Array.from({ length: 7 }, () => ({
        height: 20 + Math.random() * 60,
        delay: Math.random() * 0.8,
        duration: 0.4 + Math.random() * 0.5,
      })),
    []
  )

  return (
    <div className="flex items-end justify-center gap-[3px] h-8 mb-4">
      {bars.map((b, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all duration-200"
          style={{
            height: active ? `${b.height}%` : '20%',
            background: color,
            opacity: active ? 0.7 : 0.25,
            animation: active
              ? `wave-bar ${b.duration}s ease-in-out ${b.delay}s infinite`
              : 'none',
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  )
}

/* ───────── 声波扩散 ───────── */
function SignalRings({ active, color }: { active: boolean; color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {active &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-[28px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              borderColor: color,
              width: 40,
              height: 40,
            }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{
              duration: 1.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
    </div>
  )
}

/* ───────── 调谐器旋钮 ───────── */
function TunerKnob({
  color,
  onClick,
}: {
  color: string
  onClick?: () => void
}) {
  const [rotation, setRotation] = useState(0)

  const handleClick = () => {
    setRotation((r) => r + 60)
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      className="relative w-10 h-10 rounded-full border border-white/15 bg-white/[0.05] flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors"
      style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.4s ease-out' }}
    >
      {/* 刻度线 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px h-1.5"
          style={{
            background: i === 0 ? color : 'rgba(255,255,255,0.2)',
            top: '4px',
            left: '50%',
            marginLeft: '-0.5px',
            transform: `rotate(${i * 45}deg)`,
            transformOrigin: '50% 16px',
          }}
        />
      ))}
      {/* 中心点 */}
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color, opacity: 0.8 }}
      />
    </button>
  )
}

/* ───────── 频道卡片 ───────── */
function ChannelCard({
  channel,
  index,
}: {
  channel: (typeof channels)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const [tuned, setTuned] = useState(false)

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
      <a
        href={channel.href}
        className={`block relative p-6 ${glassCard} transition-all duration-300 overflow-hidden`}
        style={{
          borderColor: hovered ? `${channel.color}55` : 'rgba(255,255,255,0.10)',
          boxShadow: hovered
            ? `0 0 40px ${channel.color}12, inset 0 1px 0 rgba(255,255,255,0.05)`
            : 'none',
        }}
      >
        <SignalRings active={hovered} color={channel.color} />

        {/* 音频波形 */}
        <WaveBars active={hovered || tuned} color={channel.color} />

        {/* 频率显示（数码管风格） */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] tracking-wider text-white/30">
            FREQ: {channel.freq} MHz
          </span>
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: hovered || tuned ? channel.color : 'rgba(255,255,255,0.15)',
                boxShadow: hovered || tuned ? `0 0 6px ${channel.color}` : 'none',
              }}
            />
            <span className="text-[10px] text-white/30">
              {hovered || tuned ? 'SIGNAL' : 'NOISE'}
            </span>
          </div>
        </div>

        {/* 平台信息 */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
            style={{
              color: channel.color,
              background: `${channel.color}1a`,
              border: `1px solid ${channel.color}55`,
            }}
          >
            {channel.name[0]}
          </span>
          <div>
            <h3 className="text-white font-semibold">{channel.name}</h3>
            <p className="text-xs text-white/45">{channel.handle}</p>
          </div>
        </div>

        <p className="text-sm text-white/50 leading-relaxed mb-4">{channel.desc}</p>

        {/* 底部：调谐器 + 前往 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TunerKnob
              color={channel.color}
              onClick={() => setTuned((t) => !t)}
            />
            <span className="text-[10px] text-white/30">
              {tuned ? 'TUNED' : 'TUNE'}
            </span>
          </div>
          <span className="text-sm font-medium" style={{ color: channel.color }}>
            前往关注 →
          </span>
        </div>
      </a>
    </motion.div>
  )
}

/* ───────── 主组件 ───────── */
export default function StarRadio() {
  return (
    <SectionShell id="xinghe" accent={ACCENT}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          icon="📡"
          label="星河电台"
          accent={ACCENT}
          title="自媒体内容聚合"
          desc="网站是飞轮的中心，不是终点。三处平台的最新内容在这里收口，也互相导流——网站 ↔ 平台 ↔ 粉丝，循环越转越快。"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {channels.map((c, i) => (
            <ChannelCard key={c.name} channel={c} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-white/40"
        >
          ✦ 一处更新，全域共振。关注任意一个，都能追上瑞仔的星图轨迹。
        </motion.p>
      </div>
    </SectionShell>
  )
}