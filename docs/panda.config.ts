import { defineConfig } from 'css-panda'
import { button } from './src/theme/recipes/button'
import { link } from './src/theme/recipes/link'
import { tabs } from './src/theme/recipes/tabs'
import { tooltip } from './src/theme/recipes/tooltip'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{astro,tsx}'],
  presets: ['css-panda/presets'],
  outdir: 'panda',
  jsxFramework: 'react',

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
      black: { value: '#171717' },
      gray: {
        50: { value: '#FCFCFC' },
        100: { value: '#F5F5F5' },
        200: { value: '#EEEEEE' },
        300: { value: '#E0E0E0' },
        400: { value: '#BDBDBD' },
        500: { value: '#9E9E9E' },
        600: { value: '#757575' },
        700: { value: '#616161' },
        800: { value: '#424242' },
        900: { value: '#323232' },
        950: { value: '#1F1F1F' },
      },
      blue: {
        50: { value: '#ECEEFE' },
        100: { value: '#D8DDFD' },
        200: { value: '#B1BAFB' },
        300: { value: '#8B98F9' },
        400: { value: '#6475F7' },
        500: { value: '#3D53F5' },
        600: { value: '#3142C4' },
        700: { value: '#253293 ' },
        800: { value: '#182162' },
        900: { value: '#0C1131' },
        950: { value: '#060818' },
      },
      purple: {
        50: { value: '#EEECFB' },
        100: { value: '#DDD9F7' },
        200: { value: '#BBB2EF' },
        300: { value: '#9A8CE8' },
        400: { value: '#7865E0 ' },
        500: { value: '#563FD8' },
        600: { value: '#4532AD' },
        700: { value: '#342682' },
        800: { value: '#221956 ' },
        900: { value: '#110D2B' },
        950: { value: '#090616' },
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
          maxW: '8xl',
          width: '100%',
          mx: 'auto',
          ...props,
        }
      },
    },
  },
  semanticTokens: {
    colors: {
      fg: {
        default: { value: { base: '{colors.black}', _dark: 'white' } },
        muted: { value: { base: '{colors.gray.700}', _dark: '{colors.gray.200}' } },
        subtle: { value: { base: '{colors.gray.500}', _dark: '{colors.gray.500}' } },
      },
      bg: {
        canvas: { value: { base: '{colors.gray.50}', _dark: '{colors.black}' } },
        surface: { value: { base: '{colors.white}', _dark: '{colors.gray.950}' } },
        muted: { value: { base: '{colors.gray.300}', _dark: '{colors.gray.600}' } },
        subtle: { value: { base: '{colors.gray.200}', _dark: '{colors.gray.900}' } },
      },
      accent: {
        default: { value: { base: '{colors.purple.500}', _dark: '{colors.purple.300}' } }, // original _dark:400
        emphasis: { value: { base: '{colors.purple.600}', _dark: '{colors.purple.500}' } },
        muted: { value: { base: '{colors.purple.400}', _dark: '{colors.purple.600}' } },
        subtle: { value: { base: '{colors.purple.50}', _dark: '{colors.purple.950}' } },
      },
    },
    shadows: {
      xs: {
        value: {
          base: '0px 0px 1px rgba(48, 49, 51, 0.05), 0px 1px 3px rgba(48, 49, 51, 0.1)',
          _dark: '0px 0px 1px #0D0D0D, 0px 1px 3px rgba(13, 13, 13, 0.9)',
        },
      },
      sm: {
        value: {
          base: '0px 0px 1px rgba(48, 49, 51, 0.05), 0px 2px 4px rgba(48, 49, 51, 0.1)',
          _dark: '0px 0px 1px #0D0D0D, 0px 2px 4px rgba(13, 13, 13, 0.9)',
        },
      },
      md: {
        value: {
          base: '0px 0px 1px rgba(48, 49, 51, 0.05), 0px 4px 8px rgba(48, 49, 51, 0.1)',
          _dark: '0px 0px 1px #0D0D0D, 0px 4px 8px rgba(13, 13, 13, 0.9)',
        },
      },
      lg: {
        value: {
          base: '0px 0px 1px rgba(48, 49, 51, 0.05), 0px 8px 16px rgba(48, 49, 51, 0.1)',
          _dark: '0px 0px 1px #0D0D0D, 0px 8px 16px rgba(13, 13, 13, 0.9)',
        },
      },
      xl: {
        value: {
          base: '0px 0px 1px rgba(48, 49, 51, 0.05), 0px 16px 24px rgba(48, 49, 51, 0.1)',
          _dark: '0px 0px 1px #0D0D0D, 0px 16px 24px rgba(13, 13, 13, 0.9)',
        },
      },
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
      backgroundColor: 'bg.canvas',
      color: 'fg.default',
      fontFamily: 'InterVariable, sans-serif',
      height: '100%',
    },
    '*, *::before, *::after': {
      borderColor: 'bg.subtle',
      borderStyle: 'solid',
    },
  },
  recipes: {
    button,
    link,
    tabs,
    tooltip,
  },
})
