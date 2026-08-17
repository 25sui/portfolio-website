import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, type Project } from '@/data/projects'
import { SectionShell, SectionTitle, glassCard } from '@/components/CosmicBits'

const ACCENT = '#3B82F6'

/* ───────── 3D 倾斜卡片（鼠标跟随） ───────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)')

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  // 0~1
    const y = (e.clientY - rect.top) / rect.height   // 0~1
    const rotateX = (0.5 - y) * 8   // -4° ~ +4°
    const rotateY = (x - 0.5) * 8   // -4° ~ +4°
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`)
  }, [])

  const onLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className={className}
    >
      {children}
    </div>
  )
}

/* ───────── 小行星带技术栈 ───────── */
function AsteroidBelt({ techs }: { techs: string[] }) {
  const [expanded, setExpanded] = useState(false)

  // 给每个技术分配一个"轨道位置"和大小
  const orbits = techs.map((_, i) => ({
    angle: (i / techs.length) * 360,
    distance: 28 + (i % 3) * 14,
    size: 6 + (i % 4) * 2.5,
    delay: i * 0.12,
  }))

  return (
    <div
      className="relative h-16 cursor-pointer"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* 中心点 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400/40" />

      {/* 轨道圆 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-full border border-white/[0.06]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full border border-white/[0.04]" />

      {/* 小行星 */}
      {orbits.map((o, i) => {
        const rad = (o.angle * Math.PI) / 180
        const x = Math.cos(rad) * o.distance
        const y = Math.sin(rad) * o.distance
        return (
          <motion.div
            key={techs[i]}
            className="absolute left-1/2 top-1/2"
            initial={{ x: 0, y: 0, scale: 0 }}
            animate={{
              x,
              y,
              scale: 1,
            }}
            transition={{ delay: o.delay, duration: 0.4, type: 'spring', stiffness: 200 }}
          >
            {/* 小行星本体 */}
            <motion.div
              className="rounded-full bg-blue-400/30 border border-blue-400/20 flex items-center justify-center"
              style={{ width: o.size, height: o.size }}
              animate={{
                boxShadow: expanded
                  ? `0 0 12px ${ACCENT}40`
                  : `0 0 4px ${ACCENT}20`,
              }}
            />
            {/* 展开后的标签 */}
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap text-[10px] text-blue-300/80 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded"
                >
                  {techs[i]}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ───────── 旋转星环（hover 时显示） ───────── */
function StarRing({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
        >
          {/* 外环 */}
          <div
            className="absolute left-1/2 top-1/2 w-[140%] h-[140%] rounded-full border border-dashed border-blue-400/20"
            style={{ animation: 'ring-rotate 8s linear infinite' }}
          />
          {/* 内环 */}
          <div
            className="absolute left-1/2 top-1/2 w-[110%] h-[110%] rounded-full border border-blue-400/10"
            style={{ animation: 'ring-rotate 12s linear infinite reverse' }}
          />
          {/* 四个角的光点 */}
          {[
            { top: '10%', left: '10%' },
            { top: '10%', right: '10%' },
            { bottom: '10%', left: '10%' },
            { bottom: '10%', right: '10%' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/60"
              style={pos}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ───────── 项目弹窗 ───────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-lg sm:max-w-lg max-h-[85vh] overflow-y-auto bg-[#0B1020]/95 border border-white/10 rounded-2xl p-4 sm:p-6 mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-400/50 transition-all duration-200 text-lg"
          aria-label="关闭"
        >
          ×
        </button>

        <img
          src={project.image}
          alt={project.name}
          className="w-full h-40 sm:h-48 object-cover rounded-xl mb-4 sm:mb-5"
        />
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{project.name}</h3>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-5">{project.description}</p>

        {/* 弹窗里用普通标签展示技术栈 */}
        <div className="mb-4 sm:mb-5">
          <h4 className="text-sm font-semibold text-white/50 mb-2">技术栈</h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 border border-white/10 text-white rounded-xl hover:bg-white/20 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all duration-300 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ───────── 项目卡片 ───────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [showModal, setShowModal] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      >
        <TiltCard>
          <div
            className={`group relative ${glassCard} overflow-hidden hover:border-blue-400/40 transition-all duration-300 cursor-pointer`}
            style={{
              boxShadow: hovered
                ? '0 0 40px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.05)'
                : 'none',
            }}
            onClick={() => setShowModal(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* 星环叠加层 */}
            <StarRing show={hovered} />

            {/* 图片区 */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:from-sky-400 hover:to-blue-500 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Demo
                  </a>
                )}
              </div>
            </div>

            {/* 内容区 */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {project.name}
              </h3>
              <p className="text-white/50 mb-4 line-clamp-2 text-sm leading-relaxed">{project.description}</p>

              {/* 小行星带技术栈 */}
              <AsteroidBelt techs={project.techStack} />
            </div>
          </div>
        </TiltCard>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <ProjectModal project={project} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

/* ───────── 星座连线背景（SVG） ───────── */
function ConstellationLines() {
  // 4 个卡片的中心点坐标（相对于容器，百分比）
  const points = [
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 25, y: 75 },
    { x: 75, y: 75 },
  ]
  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 3], [0, 3], [1, 2],
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.06 }}
      preserveAspectRatio="none"
    >
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={`${points[a].x}%`}
          y1={`${points[a].y}%`}
          x2={`${points[b].x}%`}
          y2={`${points[b].y}%`}
          stroke={ACCENT}
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      ))}
      {points.map((p, i) => (
        <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="2" fill={ACCENT} opacity="0.3" />
      ))}
    </svg>
  )
}

/* ───────── 主组件 ───────── */
export default function Projects() {
  return (
    <SectionShell id="zaowu" accent={ACCENT}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          icon="🛠"
          label="造物星域"
          accent={ACCENT}
          title="真实项目的实验记录"
          desc="涵盖计算机视觉、数据科学、智能优化算法与全栈开发等多个方向。每一个都是「问题 → 做法 → 结果 → 踩坑」写成的实验记录，点击卡片查看详情。"
        />

        {/* 星座连线背景 */}
        <div className="relative">
          <ConstellationLines />

          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}