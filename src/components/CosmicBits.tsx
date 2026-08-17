import { useMemo, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/** 纯 CSS 星点层（固定随机位置，闪烁动画，不拦截点击） */
export function StarField({ count = 36 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    [count],
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: 0.2,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/** 深空星域外壳：统一 #0B1020 背景 + 主题色星云光晕 + 星点 */
export function SectionShell({
  id,
  accent,
  children,
}: {
  id: string
  accent: string
  children: ReactNode
}) {
  return (
    <section id={id} className="relative py-24 bg-[#0B1020] overflow-hidden scroll-mt-16">
      {/* 顶部星云光晕 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accent}1f, transparent 55%)`,
        }}
      />
      <StarField count={36} />
      <div className="relative z-10">{children}</div>
    </section>
  )
}

/** 星域标题区：玻璃 pill 标签 + 主标题 + 描述 */
export function SectionTitle({
  icon,
  label,
  accent,
  title,
  desc,
}: {
  icon: string
  label: string
  accent: string
  title: string
  desc: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <span
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-5 border backdrop-blur-sm"
        style={{ color: accent, borderColor: `${accent}44`, background: `${accent}14` }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        />
        {icon} {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
      <p className="text-white/55 max-w-2xl mx-auto leading-relaxed">{desc}</p>
    </motion.div>
  )
}

/** 玻璃卡片通用类：深空下的毛玻璃质感 */
export const glassCard =
  'bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl'
