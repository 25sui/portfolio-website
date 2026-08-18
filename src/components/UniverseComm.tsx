import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'
import wechatQR from '@/assets/wechat-qr.jpg'
import xiaohongshuQR from '@/assets/xiaohongshu-qr.jpg'
import douyinQR from '@/assets/douyin-qr.jpg'

const ACCENT = '#A855F7'

// GitHub / B站有真实 web 直达 → 跳转
// 小红书 / 抖音实测无有效 web URL（小红书 /user/profile/<id> 返回 SPA shell，
// 抖音 /search/<id> 要二次点击）→ 改用 qr 字段，点击弹二维码 modal
type Social = {
  name: string
  handle: string
  href?: string
  qr?: string
  appName?: string
  scanHint?: string
}

const socials: Social[] = [
  { name: 'GitHub', handle: '@25sui', href: 'https://github.com/25sui' },
  { name: 'B 站', handle: '@2012160766', href: 'https://space.bilibili.com/2012160766' },
  { name: '小红书', handle: '@49710202904', qr: xiaohongshuQR, appName: '小红书', scanHint: '保存图片到相册\n打开小红书 → 右上角「扫一扫」\n从相册识别即可关注' },
  { name: '抖音', handle: '@98755198296', qr: douyinQR, appName: '抖音', scanHint: '保存图片到相册\n打开抖音 → 右上角「扫一扫」\n从相册识别即可关注' },
]

const LOG_LINES = [
  '>> 正在扫描频段...',
  '>> 信号强度: 87%',
  '>> 发现目标信号',
  '>> 建立加密通道...',
  '>> 通讯已建立',
]

/* ───────── 信号波纹按钮 ───────── */
function SignalButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold text-lg transition-all hover:from-purple-400 hover:to-violet-500"
      style={{ boxShadow: '0 0 40px rgba(168,85,247,0.35)' }}
    >
      {/* 波纹层 */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-2xl border-2 border-purple-400/30"
          style={{
            animation: `signal-ripple 2.5s ease-out ${i * 0.8}s infinite`,
          }}
        />
      ))}
      <span className="relative z-10">🛰 建立通讯</span>
    </motion.button>
  )
}

/* ───────── 打字机日志 ───────── */
function TerminalLog({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (visibleCount >= LOG_LINES.length) {
      const timer = setTimeout(onComplete, 400)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, 350)
    return () => clearTimeout(timer)
  }, [visibleCount, onComplete])

  return (
    <div className="font-mono text-sm text-left w-full max-w-md mb-6">
      {LOG_LINES.slice(0, visibleCount).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="text-purple-300/70"
        >
          {line}
          {i === visibleCount - 1 && visibleCount < LOG_LINES.length && (
            <span
              className="inline-block w-2 h-4 bg-purple-400 ml-1 align-middle"
              style={{ animation: 'cursor-blink 1s step-end infinite' }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ───────── 终端卡片 ───────── */
function TerminalCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative ${glassCard} overflow-hidden ${className}`}
      style={{
        transform: 'perspective(1200px) rotateX(2deg)',
        transformOrigin: 'center top',
      }}
    >
      {/* 扫描线横纹 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.3) 2px, rgba(168,85,247,0.3) 4px)',
        }}
      />
      {/* 顶部状态条 */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
        <span className="ml-2 text-[10px] text-white/30 font-mono">universe-comm.terminal</span>
      </div>
      <div className="relative z-10 p-6">{children}</div>
    </div>
  )
}

/* ───────── 社交平台二维码 modal（嵌套在通讯弹层里）───────── */
function SocialQRModal({
  qr,
  name,
  handle,
  appName,
  scanHint,
  onClose,
}: {
  qr: string
  name: string
  handle: string
  appName: string
  scanHint: string
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0a0a14] border border-purple-400/20 rounded-2xl p-7 max-w-xs w-full shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="关闭"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition"
        >
          ✕
        </button>

        <div className="text-center mb-4">
          <div className="text-[10px] tracking-widest text-purple-300/40 mb-1 font-mono">SIGNAL · {appName.toUpperCase()}</div>
          <h3 className="text-lg font-semibold text-white mb-0.5">{name}</h3>
          <p className="text-xs text-white/45 font-mono">{handle}</p>
        </div>

        <div className="bg-white p-2.5 rounded-xl mb-3 mx-auto" style={{ width: 'fit-content' }}>
          <img src={qr} alt={`${name} 二维码`} className="block w-48 h-48" />
        </div>

        <p className="text-center text-[11px] text-white/40 leading-relaxed whitespace-pre-line">
          {scanHint}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ───────── 主组件 ───────── */
export default function UniverseComm() {
  const [connected, setConnected] = useState(false)
  const [logDone, setLogDone] = useState(false)
  const [activeQR, setActiveQR] = useState<Social | null>(null)

  const handleConnect = () => {
    setConnected(true)
    setLogDone(false)
  }

  const handleClose = () => {
    setConnected(false)
    setLogDone(false)
    setActiveQR(null)
  }

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
            <SignalButton onClick={handleConnect} />
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-col items-center w-full"
              >
                {/* 终端日志 */}
                {!logDone && <TerminalLog onComplete={() => setLogDone(true)} />}

                {/* 通讯内容 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: logDone ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <span className="mb-6 inline-flex items-center gap-2 text-emerald-300/80 text-sm font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 8px rgba(52,211,153,0.6)' }} />
                    通讯已建立
                  </span>

                  <div className="grid sm:grid-cols-2 gap-6 w-full text-left">
                    {/* 邮箱 */}
                    <TerminalCard>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-purple-400 font-mono text-sm">{'>'}</span>
                        <h3 className="text-white font-semibold">邮箱</h3>
                      </div>
                      <a
                        href="mailto:chenrui202508@163.com"
                        className="text-sky-300 hover:text-sky-200 break-all font-mono text-sm"
                      >
                        chenrui202508@163.com
                      </a>
                      <p className="text-xs text-white/40 mt-2 font-mono">合作 / 实习 / 交流，随时可发。</p>
                    </TerminalCard>

                    {/* 微信 */}
                    <TerminalCard className="flex flex-col items-center text-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-purple-400 font-mono text-sm">{'>'}</span>
                        <h3 className="text-white font-semibold">微信</h3>
                      </div>
                      <img
                        src={wechatQR}
                        alt="瑞仔微信二维码"
                        className="w-32 h-32 rounded-lg bg-white p-1.5"
                      />
                      <p className="text-xs text-white/40 mt-3 font-mono">扫码添加，备注「瑞仔宇宙」</p>
                    </TerminalCard>
                  </div>

                  {/* 社交平台 */}
                  <div className="mt-6 w-full">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-purple-400 font-mono text-sm">{'>'}</span>
                      <h3 className="text-white/60 text-sm">其他频道</h3>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {socials.map((s) => {
                        if (s.qr) {
                          return (
                            <button
                              key={s.name}
                              type="button"
                              onClick={() => setActiveQR(s)}
                              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-purple-400/50 transition-colors text-sm font-mono cursor-pointer"
                            >
                              {s.name} <span className="text-white/40">{s.handle}</span>
                            </button>
                          )
                        }
                        return (
                          <a
                            key={s.name}
                            href={s.href}
                            target={s.href?.startsWith('http') ? '_blank' : undefined}
                            rel={s.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-purple-400/50 transition-colors text-sm font-mono"
                          >
                            {s.name} <span className="text-white/40">{s.handle}</span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>

                <button
                  onClick={handleClose}
                  className="mt-8 text-xs text-white/40 hover:text-white/70 transition-colors font-mono"
                >
                  {'[ 关闭通讯 ]'}
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        {/* 嵌套 modal：社交平台二维码（在通讯弹层之上，关闭后回到通讯弹层） */}
        <AnimatePresence>
          {activeQR && activeQR.qr && (
            <SocialQRModal
              qr={activeQR.qr}
              name={activeQR.name}
              handle={activeQR.handle}
              appName={activeQR.appName ?? activeQR.name}
              scanHint={activeQR.scanHint ?? ''}
              onClose={() => setActiveQR(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  )
}