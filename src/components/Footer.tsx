export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-dark-surface border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
    陈瑞
  </span>
          </div>

                  <p className="text-gray-500 text-sm">
            © {currentYear} 陈瑞. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#hero" className="text-gray-500 hover:text-white transition-colors text-sm">
              首页
            </a>
            <a href="#about" className="text-gray-500 hover:text-white transition-colors text-sm">
              关于我
            </a>
            <a href="#projects" className="text-gray-500 hover:text-white transition-colors text-sm">
              项目
            </a>
            <a href="#contact" className="text-gray-500 hover:text-white transition-colors text-sm">
              联系
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
