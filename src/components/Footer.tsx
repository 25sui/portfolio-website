export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-[#0B1020] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
    瑞仔宇宙
  </span>
          </div>

                  <p className="text-white/40 text-sm">
            © {currentYear} 瑞仔宇宙. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#qidian" className="text-white/40 hover:text-white transition-colors text-sm">
              奇点
            </a>
            <a href="#zaowu" className="text-white/40 hover:text-white transition-colors text-sm">
              造物星域
            </a>
            <a href="#hangxing" className="text-white/40 hover:text-white transition-colors text-sm">
              航行星图
            </a>
            <a href="#xinghe" className="text-white/40 hover:text-white transition-colors text-sm">
              星河电台
            </a>
            <a href="#xinglian" className="text-white/40 hover:text-white transition-colors text-sm">
              星链枢纽
            </a>
            <a href="#tongxun" className="text-white/40 hover:text-white transition-colors text-sm">
              宇宙通讯站
            </a>
            <a href="#jingxiang" className="text-white/40 hover:text-white transition-colors text-sm">
              镜像星
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
