import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cosmicModules } from '@/data/cosmicModules'
import ruizaiStar from '@/assets/03-ruizai-hood-up.png'

// 轨道参数：行星更分散、椭圆更扁以横向填满屏幕
// width% 为轨道水平直径，height% 为垂直直径（0.75 让星系横向展开）
const ORBITS = [
  { width: 36, height: 28, duration: 22 },
  { width: 52, height: 40, duration: 26 },
  { width: 68, height: 52, duration: 30 },
  { width: 82, height: 62, duration: 34 },
  { width: 94, height: 70, duration: 38 },
  { width: 106, height: 78, duration: 42 },
  { width: 118, height: 86, duration: 46 },
]

function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  // 兼容内嵌 webview：smooth 可能不支持，用 try/catch + window.scrollTo 兜底
  try {
    const header = document.querySelector('header')
    const offset = header ? header.offsetHeight + 16 : 64
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' })
  } catch {
    el.scrollIntoView()
  }
}

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let stars: { x: number; y: number; r: number; phase: number; speed: number }[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.floor((w * h) / 7000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.2,
      }))
    }

    const render = (t: number) => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const a = 0.15 + (Math.sin(t / 1000 * s.speed + s.phase) + 1) / 2 * 0.75
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 220, 255, ${a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(render)
    }

    resize()
    raf = requestAnimationFrame(render)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
}

function OrbitSystem() {
  return (
    <div className="relative w-[min(96vw,920px)] sm:w-[min(92vw,720px)] lg:w-[min(55vw,920px)] aspect-square mx-auto">
      {/* 柔和星云底，让右侧不空洞（不接收点击） */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.10),transparent_70%)] animate-pulse pointer-events-none" />

      {/* 中心恒星：瑞仔 */}
      <button
        onPointerDown={() => goTo('qidian')}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group pointer-events-auto"
        aria-label="返回奇点"
      >
        <div className="star-core relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/80 shadow-[0_0_60px_20px_rgba(59,130,246,0.45)] group-hover:scale-105 transition-transform duration-300">
          <img
            src={ruizaiStar}
            alt="瑞仔"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-white/80 whitespace-nowrap font-medium tracking-wider">
          ✦ 奇点
        </span>
      </button>

      {/* 轨道与行星：跳过 qidian，中心已单独展示 */}
      {cosmicModules.slice(1).map((m, i) => {
        const orbit = ORBITS[i]
        const delay = `-${(orbit.duration * ((i + 1) / cosmicModules.length)).toFixed(2)}s`
        return (
          <div
            key={m.id}
            className="orbit-ring"
            style={{
              width: `${orbit.width}%`,
              height: `${orbit.height}%`,
              animationDuration: `${orbit.duration}s`,
              animationDelay: delay,
            }}
          >
            {/* 轨道发光环（不接收点击） */}
            <div
              className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 0 1px ${m.color}`,
              }}
            />

            {/* 行星本体：用原生 a 标签 + pointerdown 兜底，确保旋转也能点 */}
            <a
              href={`#${m.id}`}
              data-planet={m.id}
              onPointerDown={(e) => {
                e.preventDefault()
                if (m.enabled) goTo(m.id)
              }}
              onClick={(e) => {
                e.preventDefault()
                if (m.enabled) goTo(m.id)
              }}
              aria-disabled={!m.enabled}
              className={`orbit-planet group z-30 flex flex-col items-center justify-center ${
                m.enabled ? 'cursor-pointer pointer-events-auto' : 'cursor-not-allowed opacity-40 pointer-events-none'
              }`}
              style={{
                animationDuration: `${orbit.duration}s`,
                animationDelay: delay,
                pointerEvents: m.enabled ? 'auto' : 'none',
              }}
              title={m.enabled ? m.desc : '即将点亮'}
            >
              {/* 加大透明点击热区 */}
              <span className="relative flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px]">
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors" />
                <span
                  className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full text-xl bg-dark-surface/80 border-2 backdrop-blur-md transition-transform duration-300 group-hover:scale-125 group-active:scale-110"
                  style={{ borderColor: m.color, boxShadow: `0 0 18px ${m.color}55` }}
                >
                  {m.icon}
                </span>
              </span>
              <span
                className="mt-1 px-2 py-0.5 rounded text-[11px] whitespace-nowrap bg-dark-background/80 font-medium tracking-wide pointer-events-none"
                style={{ color: m.color }}
              >
                {m.short}
              </span>
            </a>

            {/* 小卫星/小行星，增加满满当当感 */}
            {m.enabled && i % 2 === 1 && (
              <div
                className="absolute w-1.5 h-1.5 rounded-full bg-white/40 pointer-events-none"
                style={{
                  top: '8%',
                  left: '18%',
                  boxShadow: '0 0 6px rgba(255,255,255,0.6)',
                }}
              />
            )}
          </div>
        )
      })}

      {/* 额外小行星带：让画面更满（纯装饰，不接收点击，避免挡住行星） */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[126%] h-[92%] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[132%] h-[96%] rounded-full border border-white/[0.03] pointer-events-none" />
    </div>
  )
}

export default function GalaxyHero() {
  return (
    <section
      id="qidian"
      className="relative min-h-screen overflow-hidden bg-[#0B1020] flex flex-col lg:flex-row items-center"
    >
      <Starfield />
      {/* 深空径向光晕（不接收点击） */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_65%_45%,rgba(59,130,246,0.16),transparent_55%)] pointer-events-none" />

      {/* 前景玻璃内容卡（奇点·本源星） */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 w-full lg:w-[420px] xl:w-[460px] px-6 sm:px-10 lg:px-12 py-12 lg:py-0"
      >
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-7 sm:p-8 shadow-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs border border-white/15 text-white/70 mb-5">
            瑞仔宇宙 · 奇点
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Hi，我是 <span className="text-sky-400">瑞仔</span>
          </h1>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-6">
            用 AI 把脑子里的想法，<br />
            变成真的能跑的东西。
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {['AI 大模型应用', '全栈开发', '数据分析'].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-medium text-white border border-sky-400/40 bg-sky-400/10"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => goTo('zaowu')}
              className="px-6 py-3 rounded-xl bg-white text-[#0B1020] font-semibold hover:bg-sky-100 transition-colors"
            >
              看作品
            </button>
            <button
              onClick={() => goTo('xinghe')}
              className="px-6 py-3 rounded-xl border border-white/25 text-white hover:bg-white/10 transition-colors"
            >
              关注我
            </button>
            <button
              onClick={() => goTo('tongxun')}
              className="px-6 py-3 rounded-xl border border-sky-400/40 text-sky-300 hover:bg-sky-400/10 transition-colors"
            >
              找我合作
            </button>
          </div>

          {/* 关于瑞仔：IP 叙事，不暴露真实学校/专业/年级 */}
          <div className="mt-7 pt-5 border-t border-white/10 text-xs text-white/55 leading-relaxed">
            瑞仔 · AI 开发探索者
            <br />
            把想法变成能跑的项目，把踩坑过程变成可复用的经验。
          </div>
        </div>
        <p className="mt-4 text-center lg:text-left text-xs text-white/40">
          点击行星，进入对应星域 ↓
        </p>
      </motion.div>

      {/* 星系轨道系统 */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center py-10 lg:py-0 lg:-mr-8">
        <OrbitSystem />
      </div>
    </section>
  )
}
