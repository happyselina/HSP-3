import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')  // 讀取 .env / .env.production
  return {
    base: '/HSP-3/',                    // GitHub Pages 子路徑（大小寫要和倉庫名一致）
    plugins: [react()],
    define: {
      // 讓你的前端程式能用 process.env.GEMINI_API_KEY
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? ''),
      // 如果程式碼還有用到 process.env.API_KEY，也一起對應
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? '')
    },
    resolve: {
      alias: { '@': path.resolve(__dirname, '.') }
    }
  }
})
