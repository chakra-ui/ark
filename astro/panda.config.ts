import { defineConfig } from 'css-panda'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{astro,tsx}'],
  presets: ['css-panda/presets'],
  outdir: 'panda',
  jsxFramework: 'solid',
  tokens: {
    colors: {
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2A37',
        900: '#111928',
      },
      blue: {
        50: '#EBF5FF',
        100: '#E1EFFE',
        200: '#C3DDFD',
        300: '#A4CAFE',
        400: '#76A9FA',
        500: '#3F83F8',
        600: '#1C64F2',
        700: '#1A56DB',
        800: '#1E429F',
        900: '#233876',
      },
      purple: {
        50: '#F6F5FF',
        100: '#EDEBFE',
        200: '#DCD7FE',
        300: '#CABFFD',
        400: '#AC94FA',
        500: '#9061F9',
        600: '#7E3AF2',
        700: '#6C2BD9',
        800: '#5521B5',
        900: '#4A1D96',
      },
    },
  },
  patterns: {
    container: {
      properties: {},
      transform: () => {
        return {
          px: { base: '4', md: '8' },
          maxW: '7xl',
          width: '100%',
          mx: 'auto',
        }
      },
    },
  },
  semanticTokens: {
    colors: {
      default: { value: { base: 'gray.900', dark: 'white' } },
      muted: { value: { base: 'gray.500', dark: 'gray.400' } },
    },
  },
  globalCss: {
    html: {
      lineHeight: 1.5,
      textRendering: 'optimizeLegibility',
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      WebkitTextSizeAdjust: '100%',
    },
    body: {
      backgroundColor: { base: 'gray.50', dark: 'gray.900' },
      color: { base: 'gray.900', dark: 'white' },
      fontFamily: 'InterVariable, sans-serif',
    },
    a: {
      color: 'purple.600',
    },
  },
  sizes: {
    4.5: '1.125rem', // TODO ?
  },
  recipes: {
    button: {
      name: 'button',
      description: 'A button styles',
      base: {
        cursor: 'pointer',
        borderRadius: 'lg',
        fontWeight: 'semibold',
        display: 'inline-flex',
        appearance: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        position: 'relative',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        outline: 'none',
      },
      variants: {
        variant: {
          primary: {
            color: {
              base: 'white',
            },
            backgroundColor: {
              base: 'purple.600',
              hover: {
                base: 'purple.700',
              },
            },
          },
        },
        size: {
          sm: {
            h: 9,
            minW: 9,
            fontSize: 'sm',
            px: 3.5,
          },
          md: {
            h: 10,
            minW: 10,
            fontSize: 'sm',
            px: 4,
          },
          lg: {
            h: 11,
            minW: 11,
            // px: 4.5,
            px: '1.125rem',
            fontSize: 'md',
          },
          xl: {
            h: 12,
            minW: 12,
            px: 5,
            fontSize: 'md',
          },
          '2xl': {
            // h: 15,
            // minW: 15,
            h: '3.75rem',
            minW: '3.75rem',
            px: 7,
            fontSize: 'lg',
          },
        },
      },
    },
  },
})
