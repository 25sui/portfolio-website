import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'
import xiaohongshuQR from '@/assets/xiaohongshu-qr.jpg'
import douyinQR from '@/assets/douyin-qr.jpg'
import wechatMPQR from '@/assets/wechat-mp-qr.jpg'

const ACCENT = '#FB923C'

// 三个频道全部走站内扫码 modal：
// - 小红书 /user/profile/<id> 实测返回 SPA shell（无效）
// - 抖音 /search/<id> 要二次点击进主页（体验断）
// - 公众号 无 web 直达主页（兜底也是断）
// 全部都改成 qr 字段，扫码即关注，最稳
const channels = [
  {
    name: '小红书',
    handle: '@49710202904',
    desc: 'AI 开发实战 · 大二真实成长日记',
    color: '#FB923C',
    freq: '104.5',
    qr: xiaohongshuQR,
    appName: '小红书',
    scanHint: '保存图片到手机相册\n打开小红书 → 右上角「扫一扫」\n从相册识别二维码即可关注',
  },
  {
    name: '抖音',
    handle: '@98755198296',
    desc: '项目拆解短视频 · 从 0 到能跑的全过程',
    color: '#FE2C55',
    freq: '98.7',
    qr: douyinQR,
    appName: '抖音',
    scanHint: '保存图片到手机相册\n打开抖音 → 右上角「扫一扫」\n从相册识别二维码即可关注',
  },
  {
    name: '公众号',
    handle: '@gh_f8cac5252465',
    desc: '技术长文 · 算法 / 全栈踩坑记录',
    color: '#07C160',
    freq: '112.3',
    qr: wechatMPQR,
    appName: '微信',
    scanHint: '打开微信「扫一扫」\n或长按图片识别二维码\n即可关注公众号',
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

/* ───────── 站内扫码 modal（多平台共用）───────── */
function QRModal({
  qr,
  name,
  handle,
  color,
  appName,
  scanHint,
  onClose,
}: {
  qr: string
  name: string
  handle: string
  color: string
  appName: string // 平台名（微信 / 小红书 / 抖音）
  scanHint: string // 操作提示
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0a0a14] border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl"
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          aria-label="关闭"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition"
        >
          ✕
        </button>

        {/* 头部 */}
        <div className="text-center mb-5">
          <div className="text-[10px] tracking-widest text-white/30 mb-2 font-mono">SCAN TO FOLLOW</div>
          <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
          <p className="text-xs text-white/45 font-mono">{handle}</p>
        </div>

        {/* 二维码 */}
        <div className="bg-white p-3 rounded-xl mb-4 mx-auto" style={{ width: 'fit-content' }}>
          <img
            src={qr}
            alt={`${name} 二维码`}
            className="block w-56 h-56"
          />
        </div>

        {/* 操作提示（按平台定制） */}
        <p className="text-center text-xs text-white/40 leading-relaxed whitespace-pre-line">
          {scanHint}
        </p>

        {/* 底部状态 */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          />
          <span className="text-[10px] tracking-wider text-white/30 font-mono">SIGNAL LOCKED · {appName.toUpperCase()}</span>
        </div>
      </motion.div>
    </motion.div>
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
  const [showModal, setShowModal] = useState(false)
  const actionLabel = '扫码关注'

  const cardStyle = {
    borderColor: hovered ? `${channel.color}55` : 'rgba(255,255,255,0.10)',
    boxShadow: hovered
      ? `0 0 40px ${channel.color}12, inset 0 1px 0 rgba(255,255,255,0.05)`
      : 'none',
  } as const

  const CardBody = (
    <>
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
          {actionLabel} →
        </span>
      </div>
    </>
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className={`block w-full text-left relative p-6 ${glassCard} transition-all duration-300 overflow-hidden cursor-pointer`}
          style={cardStyle}
        >
          {CardBody}
        </button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <QRModal
            qr={channel.qr!}
            name={channel.name}
            handle={channel.handle}
            color={channel.color}
            appName={channel.appName}
            scanHint={channel.scanHint}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
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
