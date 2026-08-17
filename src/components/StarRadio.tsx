import { motion } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'

const ACCENT = '#FB923C' // 星河电台 · 星橙

const channels = [
  {
    name: '小红书',
    handle: '@瑞仔（待填）',
    desc: 'AI 辅助开发实战 · 大二真实成长日记',
    color: '#FB923C',
    href: '#',
  },
  {
    name: 'B 站',
    handle: '@瑞仔（待填）',
    desc: '项目拆解视频 · 从 0 到能跑的全过程',
    color: '#3B82F6',
    href: '#',
  },
  {
    name: '掘金',
    handle: '@瑞仔（待填）',
    desc: '技术长文 · 算法 / 全栈踩坑记录',
    color: '#34D399',
    href: '#',
  },
]

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
            <motion.a
              key={c.name}
              href={c.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`block p-6 ${glassCard} hover:shadow-[0_0_30px_rgba(251,146,60,0.15)] transition-all`}
              style={{ borderColor: 'rgba(255,255,255,0.10)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${ACCENT}66`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ color: c.color, background: `${c.color}1a`, border: `1px solid ${c.color}55` }}
                >
                  {c.name[0]}
                </span>
                <div>
                  <h3 className="text-white font-semibold">{c.name}</h3>
                  <p className="text-xs text-white/45">{c.handle}</p>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">{c.desc}</p>
              <span className="text-sm font-medium" style={{ color: c.color }}>
                前往关注 →
              </span>
            </motion.a>
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
