import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/course_info': 'http://localhost:5000',
      '/course_search': 'http://localhost:5000',
      '/course_gpa_trend/': 'http://localhost:5000',
      '/total_course_grade_dis': 'http://localhost:5000',
      '/total_section_distribution/': 'http://localhost:5000'
    }
  }
})
