import { defineConfig } from 'css-panda'
import { button } from './src/theme/recipes/button'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{astro,tsx}'],
  presets: ['css-panda/presets'],
  outdir: 'panda',
  jsxFramework: 'solid',

  textStyles: {
    xs: { value: { fontSize: 'xs', lineHeight: '1.125rem' } },
    sm: { value: { fontSize: 'sm', lineHeight: '1.25rem' } },
    md: { value: { fontSize: 'md', lineHeight: '1.5rem' } },
    lg: { value: { fontSize: 'lg', lineHeight: '1.75rem' } },
    xl: { value: { fontSize: 'xl', lineHeight: '1.875rem' } },
    '2xl': { value: { fontSize: '2xl', lineHeight: '2rem' } },
    '3xl': { value: { fontSize: '3xl', lineHeight: '2.375rem' } },
    '4xl': { value: { fontSize: '4xl', lineHeight: '2.75rem', letterSpacing: '-0.02em' } },
    '5xl': { value: { fontSize: '5xl', lineHeight: '3.75rem', letterSpacing: '-0.02em' } },
    '6xl': { value: { fontSize: '6xl', lineHeight: '4.5rem', letterSpacing: '-0.02em' } },
    '7xl': { value: { fontSize: '7xl', lineHeight: '5.75rem', letterSpacing: '-0.02em' } },
  },

  tokens: {
    colors: {
      gray: {
        50: { value: '#F9FAFB' },
        100: { value: '#F3F4F6' },
        200: { value: '#E5E7EB' },
        300: { value: '#D1D5DB' },
        400: { value: '#9CA3AF' },
        500: { value: '#6B7280' },
        600: { value: '#4B5563' },
        700: { value: '#374151' },
        800: { value: '#1F2A37' },
        900: { value: '#111928' },
      },
      blue: {
        50: { value: '#EBF5FF' },
        100: { value: '#E1EFFE' },
        200: { value: '#C3DDFD' },
        300: { value: '#A4CAFE' },
        400: { value: '#76A9FA' },
        500: { value: '#3F83F8' },
        600: { value: '#1C64F2' },
        700: { value: '#1A56DB' },
        800: { value: '#1E429F' },
        900: { value: '#233876' },
      },
      purple: {
        50: { value: '#F6F5FF' },
        100: { value: '#EDEBFE' },
        200: { value: '#DCD7FE' },
        300: { value: '#CABFFD' },
        400: { value: '#AC94FA' },
        500: { value: '#9061F9' },
        600: { value: '#7E3AF2' },
        700: { value: '#6C2BD9' },
        800: { value: '#5521B5' },
        900: { value: '#4A1D96' },
      },
    },
    spacing: {
      '4.5': { value: '1.125rem' },
      '15': { value: '3.75rem' },
    },
  },
  patterns: {
    container: {
      properties: {},
      transform: (props) => {
        return {
          px: { base: '4', md: '8' },
          maxW: '7xl',
          width: '100%',
          mx: 'auto',
          ...props,
        }
      },
    },
  },
  semanticTokens: {
    colors: {
      default: { value: { base: '{colors.gray.900}', _dark: 'white' } },
      muted: { value: { base: '{colors.gray.600}', _dark: '{colors.gray.200}' } },
      canvas: { value: { base: '{colors.gray.50}', _dark: '{colors.gray.900}' } },
    },
  },
  globalCss: {
    html: {
      lineHeight: 1.5,
      textRendering: 'optimizeLegibility',
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      WebkitTextSizeAdjust: '100%',
      height: '100%',
    },
    body: {
      backgroundColor: 'canvas',
      color: 'default',
      fontFamily: 'InterVariable, sans-serif',
      height: '100%',
    },
    a: {
      color: 'purple.600',
    },
    '*, *::before, *::after': {
      borderColor: 'gray.200',
      borderStyle: 'solid',
    },
  },
  recipes: {
    button,
  },
})
