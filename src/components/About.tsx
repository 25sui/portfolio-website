import { motion } from 'framer-motion'
import { skills } from '@/data/skills'

export default function About() {
  return (
    <section id="about" className="py-24 bg-dark-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-4">
            关于我
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">了解更多</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AI工程师与全栈开发者，专注于计算机视觉、数据科学与多目标优化算法。在目标检测、深度学习建模、智能调度优化和全栈Web开发方面有较多实践经验。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="p-6 bg-dark-surface rounded-xl border border-dark-border">
              <h3 className="text-xl font-semibold text-white mb-4">个人简介</h3>
              <p className="text-gray-400 leading-relaxed">
                主要研究方向为计算机视觉与数据科学，熟悉 YOLOv8、OpenCV、PyTorch 等算法与工具。
                代表项目包括：基于NSGA-II的公交智能调度优化系统（LSTM预测+多目标优化+Vue3可视化）、
                AI 智能交通视频分析系统、以及招聘公平性审计平台 FairMirror。
                具备 Python、TypeScript、C++ 等多语言开发能力，能够从算法设计、模型训练到前端交互完整落地一个项目。
                熟练使用 Cursor、Trae、OpenCode、WorkBuddy、Claude Code 等 AI 辅助开发工具，
                善于利用 AI 工具链提升开发效率，同时保持对核心算法和架构设计的深入理解。
              </p>
            </div>

            <div className="p-6 bg-dark-surface rounded-xl border border-dark-border">
              <h3 className="text-xl font-semibold text-white mb-4">求职意向</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-purple-400">🎓</span>
                  <span className="text-gray-300">目前状态：本科在读，即将升入大二（2029届）</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-400">💼</span>
                  <span className="text-gray-300">期望岗位：AI算法实习生 / 全栈开发实习生</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-400">📍</span>
                  <span className="text-gray-300">期望城市：大连 / 沈阳 / 广东 / 重庆 / 远程</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-400">🤝</span>
                  <span className="text-gray-300">同时也欢迎技术交流与合作</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-dark-surface rounded-xl border border-dark-border">
              <h3 className="text-xl font-semibold text-white mb-4">专业技能</h3>
              <div className="space-y-4">
                {skills.slice(0, 5).map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-purple-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-dark-border shadow-2xl bg-dark-surface flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">陈</span>
                  </div>
                  <p className="text-gray-400 text-sm">AI 工程师 / 全栈开发者</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">陈瑞</div>
                  <div className="text-xs text-gray-300">AI 工程师</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
