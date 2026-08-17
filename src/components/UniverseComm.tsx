import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'

const ACCENT = '#A855F7' // 宇宙通讯站 · 星紫

const socials = [
  { name: 'GitHub', handle: '@25sui', href: 'https://github.com/25sui' },
  { name: '小红书', handle: '@瑞仔（待填）', href: '#' },
  { name: 'B 站', handle: '@瑞仔（待填）', href: '#' },
  { name: '掘金', handle: '@瑞仔（待填）', href: '#' },
]

function FakeQR() {
  // 占位二维码（替换为你的真实微信二维码图片即可）
  const cells = Array.from({ length: 49 }, (_, i) => (i * 7 + 3) % 5 < 2)
  return (
    <div className="w-28 h-28 grid grid-cols-7 grid-rows-7 gap-px bg-white/10 p-1.5 rounded-lg">
      {cells.map((on, i) => (
        <span key={i} className={on ? 'bg-white rounded-[1px]' : 'bg-transparent'} />
      ))}
    </div>
  )
}

export default function UniverseComm() {
  const [connected, setConnected] = useState(false)

  return (
    <SectionShell id="tongxun" accent={ACCENT}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          icon="🛰"
          label="宇宙通讯站"
          accent={ACCENT}
          title="向瑞仔发送信号"
          desc="想聊 AI、想合作，或者只是认识一下——先建立通讯，频道信息才会显现。"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {!connected ? (
            <motion.button
              onClick={() => setConnected(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold text-lg shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:from-purple-400 hover:to-violet-500 transition-all"
            >
              🛰 建立通讯
            </motion.button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-col items-center"
              >
                <span className="mb-8 text-emerald-300 text-sm">📡 通讯已建立</span>

                <div className="grid sm:grid-cols-2 gap-6 w-full text-left">
                  {/* 邮箱：始终直接可见 */}
                  <div className={`p-6 ${glassCard}`}>
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      📧 邮箱
                    </h3>
                    <a
                      href="mailto:chenrui202508@163.com"
                      className="text-sky-300 hover:text-sky-200 break-all"
                    >
                      chenrui202508@163.com
                    </a>
                    <p className="text-xs text-white/40 mt-2">合作 / 实习 / 交流，随时可发。</p>
                  </div>

                  {/* 微信：二维码，不暴露微信号文本 */}
                  <div className={`p-6 ${glassCard} flex flex-col items-center text-center`}>
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      💬 微信
                    </h3>
                    <FakeQR />
                    <p className="text-xs text-white/40 mt-3">扫码添加，备注「瑞仔宇宙」</p>
                  </div>
                </div>

                {/* 社交平台 */}
                <div className="mt-6 w-full">
                  <h3 className="text-white/60 text-sm mb-3 text-center">其他频道</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-purple-400/50 transition-colors text-sm"
                      >
                        {s.name} <span className="text-white/40">{s.handle}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setConnected(false)}
                  className="mt-8 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  关闭通讯
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </SectionShell>
  )
}
