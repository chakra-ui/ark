import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/dev/presets', '@park-ui/presets'],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
})
