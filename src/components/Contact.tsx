import { motion } from 'framer-motion'

const contactLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/25sui',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'chenrui202508@163.com',
    href: 'mailto:chenrui202508@163.com',
    icon: (
      <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: '15942940858',
    href: 'tel:15942940858',
    icon: (
      <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 011 .948l.817 5.444a1 1 0 01-.476.906l-2.03 1.35a11.047 11.047 0 005.07 5.07l1.35-2.03a1 1 0 01.906-.476l5.444.817a1 1 0 01.948 1V19a2 2 0 01-2 2h-1C9.715 21 3 14.285 3 6V5z" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-dark-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-4">
            联系方式
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">感兴趣？联系我吧！</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            我目前正在寻找实习机会，同时也欢迎技术交流与合作探讨。如果您有合适的岗位或项目想法，欢迎随时联系我。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {contactLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name === 'GitHub' ? '_blank' : undefined}
                rel={link.name === 'GitHub' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 px-6 py-3 bg-dark-surface border border-dark-border rounded-xl text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-300"
              >
                {link.icon}
                <span className="whitespace-nowrap">{link.name}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 p-8 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl"
          >
            <h3 className="text-xl font-semibold text-white mb-2">感兴趣？联系我吧！</h3>
            <p className="text-gray-400 mb-6">
              我目前正在寻找实习机会，同时也欢迎技术交流与合作探讨。如果您有合适的岗位或项目想法，欢迎随时联系我。
            </p>
            <a
              href="mailto:chenrui202508@163.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              发送邮件
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
