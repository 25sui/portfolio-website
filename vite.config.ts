import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// GitHub Pages 部署时需要设置 base 路径
// 如果是部署到 https://username.github.io/portfolio-website/
// 则 base 应该是 '/portfolio-website/'
// 本地开发时 base 是 '/'

const repositoryName = 'portfolio-website'  // 改成你的 GitHub 仓库名
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react()],
  base: isProduction ? `/${repositoryName}/` : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
