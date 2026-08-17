import { motion } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'

const ACCENT = '#22D3EE' // 航行星图 · 星青

const inProgress = [
  {
    title: 'RAG / Agent 应用开发',
    tag: '正在学',
    desc: '从检索增强生成到可自主调用的 Agent，搭建能真正干活的小助手。',
    progress: 60,
    color: '#22D3EE',
  },
  {
    title: 'Circuit AI Studio 迭代',
    tag: '正在改',
    desc: '给电路仿真工具加多模型支持与更稳的降级策略，提升 AI 助攻体验。',
    progress: 40,
    color: '#3B82F6',
  },
  {
    title: '校园小程序 / 自媒体工具',
    tag: '规划中',
    desc: '把重复劳动交给工具：选题、配图、发布一条龙的小助手正在构思。',
    progress: 15,
    color: '#FB923C',
  },
]

export default function InProgress() {
  return (
    <SectionShell id="hangxing" accent={ACCENT}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          icon="🧭"
          label="航行星图"
          accent={ACCENT}
          title="正在鼓捣的事儿"
          desc="星图不停更新——这里记录瑞仔当前在学、在改、在规划的真实进度，不靠「已完成成就」撑场面。"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {inProgress.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 ${glassCard} hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] transition-all`}
              style={{ borderColor: 'rgba(255,255,255,0.10)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${ACCENT}66`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ color: item.color, background: `${item.color}1a`, border: `1px solid ${item.color}55` }}
                >
                  {item.tag}
                </span>
                <span className="text-sm text-white/40">{item.progress}%</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">{item.desc}</p>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 10px ${item.color}88` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
