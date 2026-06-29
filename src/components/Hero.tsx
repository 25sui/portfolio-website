import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-dark-background to-indigo-900/20" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm">
            AI 工程师 / 全栈开发者
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-white">你好，我是</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
            陈瑞
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
        >
          专注于人工智能与数据科学，研究方向涵盖计算机视觉、深度学习与多目标优化算法。
          具备从算法设计、模型训练到全栈开发的完整落地能力。
          目前正在寻找实习机会，同时也欢迎有趣的技术合作。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
          >
            查看项目
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-all duration-300"
          >
            联系我
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <a href="#about" className="inline-block animate-bounce">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
