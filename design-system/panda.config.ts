import { defineConfig } from '@pandacss/dev'
import preset from './src'

export default defineConfig({
  presets: ['@pandacss/preset-panda', preset],
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'dist',
  jsxFramework: 'react',
})
