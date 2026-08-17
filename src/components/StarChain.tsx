import { motion } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'

const ACCENT = '#34D399' // 星链枢纽 · 星绿

const services = [
  {
    title: 'AI 小程序 / 工具定制',
    desc: '用 AI 辅助开发，把你的想法快速做成能用的小程序或 Web 工具。',
    forWho: '个人 / 小团队 / 课程项目',
    color: '#34D399',
  },
  {
    title: '数据分析 / 可视化',
    desc: '从数据清洗、建模到可视化看板，把杂乱数据讲成清楚的 Story。',
    forWho: '运营 / 调研 / 竞赛',
    color: '#3B82F6',
  },
  {
    title: '源码交付 / 作业辅助',
    desc: 'Python、React、TypeScript 等方向，讲透思路、交付可读的代码。',
    forWho: '在校生 / 自学伙伴',
    color: '#FB923C',
  },
]

export default function StarChain() {
  return (
    <SectionShell id="xinglian" accent={ACCENT}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          icon="🔗"
          label="星链枢纽"
          accent={ACCENT}
          title="合作与服务"
          desc="把瑞仔宇宙的能力，接进你的需求。下面是当前开放的合作方向——先亮定位，随时可聊。"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 ${glassCard} hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all flex flex-col`}
              style={{ borderColor: 'rgba(255,255,255,0.10)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${ACCENT}66`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-4"
                style={{ color: s.color, background: `${s.color}1a`, border: `1px solid ${s.color}55` }}
              >
                🔗
              </span>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{s.desc}</p>
              <div className="text-xs text-white/40 mb-4">适合：{s.forWho}</div>
              <a
                href="#tongxun"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{ color: s.color, background: `${s.color}14`, border: `1px solid ${s.color}55` }}
              >
                聊聊需求 →
              </a>
            </motion.div>
          ))}
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
