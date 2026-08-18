import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// 部署到 Netlify（免费子域 xxx.netlify.app），站点位于域名根路径
// 本地开发与生产构建 base 均为 '/'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
