import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'

const ACCENT = '#8B5CF6'

const personas = [
  {
    tag: '想搞点东西的人',
    sub: '脑子里有个产品，但缺人把它做出来',
    mirror: '你出想法，我出代码——AI 智能体、小程序、Web 工具，帮你从 0 跑到能上线。',
    services: ['AI 智能体 / Agent 搭建', '小程序 / Web 工具定制'],
  },
  {
    tag: '在校生 / 自学伙伴',
    sub: '作业、课程项目、作品集，想做得更专业',
    mirror: '项目、竞赛、作品集，我们一起把它做到能拿得出手。',
    services: ['网站开发 / 前端实现', '数据分析 / 可视化'],
  },
  {
    tag: '创作者 / 运营',
    sub: '要内容、要数据、也要效率',
    mirror: '把重复的活交给工具，你只管创作和表达。',
    services: ['AI 智能体 / Agent 搭建', '数据分析 / 可视化'],
  },
  {
    tag: '企业 / 小团队',
    sub: '官网、内部工具、数据看板，想补齐',
    mirror: '从官网到内部工具，一条龙帮你补齐数字化的短板。',
    services: ['网站开发 / 前端实现', '数据分析 / 可视化', 'AI 智能体 / Agent 搭建'],
  },
]

const serviceColor: Record<string, string> = {
  'AI 智能体 / Agent 搭建': '#34D399',
  '小程序 / Web 工具定制': '#3B82F6',
  '网站开发 / 前端实现': '#FB923C',
  '数据分析 / 可视化': '#A855F7',
}

export default function MirrorStar() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <SectionShell id="jingxiang" accent={ACCENT}>
      <SectionTitle
        icon="👤"
        label="镜像星"
        accent={ACCENT}
        title="镜像星 · 照见你想要的合作"
        desc="这面镜子不照我，照你。选一个最像你的身份，看看我能帮你把什么跑起来。"
      />

      {/* 中央镜面：全息倾斜 + 选中时信号波纹 */}
      <div className="relative mx-auto w-full max-w-lg mb-12">
        <div
          className="relative w-full aspect-[4/3] rounded-3xl border bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500"
          style={{
            borderColor: selected !== null ? `${ACCENT}88` : `${ACCENT}33`,
            boxShadow: selected !== null ? `0 0 70px ${ACCENT}55` : `0 0 30px ${ACCENT}22`,
            transform: 'perspective(1200px) rotateX(3deg)',
          }}
        >
          {/* 镜面反光 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.14), transparent 45%)',
            }}
          />
          {/* 选中的信号波纹（复用 signal-ripple 关键帧） */}
          {selected !== null && (
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: '70%', height: '70%' }}
            >
              <div
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor: `${ACCENT}55`,
                  animation: 'signal-ripple 2.5s ease-out infinite',
                }}
              />
            </div>
          )}
          {/* 镜面内容 */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
            {selected === null ? (
              <p className="text-white/40 text-sm leading-relaxed">
                选一个身份，<br />镜子会告诉你答案
              </p>
            ) : (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <p className="text-white text-base sm:text-lg leading-relaxed max-w-sm">
                  「{personas[selected].mirror}」
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-5">
                  {personas[selected].services.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full text-xs border"
                      style={{
                        color: serviceColor[s] ?? ACCENT,
                        borderColor: `${serviceColor[s] ?? ACCENT}55`,
                        background: `${serviceColor[s] ?? ACCENT}14`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href="#xinglian"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-full border transition hover:scale-105"
                  style={{ color: ACCENT, borderColor: `${ACCENT}66`, background: `${ACCENT}14` }}
                >
                  前往星链枢纽 →
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 身份卡网格 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {personas.map((p, i) => {
          const active = selected === i
          return (
            <motion.button
              key={p.tag}
              type="button"
              onClick={() => setSelected(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className={`${glassCard} p-5 text-left transition-all duration-300`}
              style={active ? { borderColor: ACCENT, boxShadow: `0 0 30px ${ACCENT}44` } : undefined}
            >
              <div className="text-white font-medium leading-snug">{p.tag}</div>
              <div className="text-white/50 text-xs mt-2 leading-relaxed">{p.sub}</div>
            </motion.button>
          )
        })}
      </div>
    </SectionShell>
  )
}
