import { defineConfig } from 'css-panda'
import { breakpoints, conditions, keyframes, patterns, tokens, utilities } from 'css-panda/presets'

export default defineConfig({
  // whether to use css reset
  preflight: true,
  // where to look for your css declarations
  include: ['./src/**/*.{astro,tsx}'],
  // files to exclude
  exclude: [],
  // The output directory for system
  outdir: 'panda',
  // Add your css conditions here (&:hover, &:focus, etc)
  conditions,
  // Add your tokens here
  tokens,
  // Add your semantic tokens here
  semanticTokens: {},
  // Add your keyframes here (spin, fade, etc)
  keyframes,
  // Add your breakpoints here (sm, md, lg, xl)
  breakpoints,
  // Add your css property utilities here (mt, ml, etc)
  utilities,
  // Add your css patterns here (stack, grid, etc)
  patterns,
})
