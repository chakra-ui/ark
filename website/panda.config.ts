import { globalCss } from '@/theme/global-css'
import { recipes } from '@/theme/recipes'
import { textStyles } from '@/theme/text-styles'
import { defineConfig } from '@pandacss/dev'
import { ContainerProperties } from 'panda/patterns'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.tsx'],
  presets: ['@pandacss/dev/presets'],
  outdir: 'panda',
  jsxFramework: 'react',
  globalCss,
  conditions: {
    extend: {
      checked: '&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])',
      indeterminate:
        '&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])',
      closed: '&:is([data-state=closed])',
      open: '&:is([open], [data-state=open])',
    },
  },
  theme: {
    extend: {
      recipes,
      textStyles,
      semanticTokens: {
        colors: {
          fg: {
            default: { value: { base: '{colors.gray.900}', _dark: 'white' } },
            emphasized: { value: { base: '{colors.gray.700}', _dark: '{colors.gray.200}' } },
            muted: { value: { base: '{colors.gray.500}', _dark: '{colors.gray.400}' } },
            subtle: { value: { base: '{colors.gray.400}', _dark: '{colors.gray.500}' } },
            placeholder: { value: { base: '{colors.gray.600}', _dark: '{colors.gray.400}' } },
            inverted: {
              default: { value: { base: 'white', _dark: '{colors.black}' } },
            },
          },
          bg: {
            canvas: { value: { base: '{colors.gray.25}', _dark: '{colors.brown.900}' } },
            surface: { value: { base: '{colors.gray.50}', _dark: '{colors.brown.600}' } },
            muted: { value: { base: '{colors.gray.200}', _dark: '{colors.brown.400}' } },
            subtle: { value: { base: '{colors.gray.100}', _dark: '{colors.brown.500}' } },
          },
          accent: {
            default: { value: { base: '{colors.orange.400}', _dark: '{colors.orange.400}' } },
            emphasized: { value: { base: '{colors.orange.500}', _dark: '{colors.orange.500}' } },
            muted: { value: { base: '{colors.orange.400}', _dark: '{colors.orange.300}' } },
            subtle: { value: { base: '{colors.orange.50}', _dark: '{colors.orange.900}' } },
          },
          border: {
            default: { value: { base: '{colors.gray.200}', _dark: '{colors.brown.400}' } },
            emphasized: { value: { base: '{colors.gray.300}', _dark: '{colors.brown.300}' } },
          },
        },
        shadows: {
          xs: {
            value: {
              base: '0px 0px 1px rgba(48, 49, 51, 0.05), 0px 1px 2px rgba(48, 49, 51, 0.1)',
              _dark: '0px 0px 1px #0D0D0D, 0px 1px 2px rgba(13, 13, 13, 0.9)',
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
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', scale: '0.8' },
          '100%': { opacity: '1', scale: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1', scale: '1' },
          '100%': { opacity: '0', scale: '0.8' },
        },
        backdropIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.7' },
        },
        backdropOut: {
          '0%': { opacity: '0.7' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(64px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(64px)' },
        },
      },
      tokens: {
        lineHeights: {
          relaxed: { value: '1.75' },
        },
        colors: {
          black: { value: '#1C1917' },
          gray: {
            25: { value: '#FDFDFC' },
            50: { value: '#FAFAF9' },
            100: { value: '#F5F5F4' },
            200: { value: '#E7E5E4' },
            300: { value: '#D7D3D0' },
            400: { value: '#A9A29D' },
            500: { value: '#79716B' },
            600: { value: '#57534E' },
            700: { value: '#44403C' },
            800: { value: '#292524' },
            900: { value: '#1C1917' },
          },
          orange: {
            50: { value: '#F6E1DB' },
            100: { value: '#EEC2B7' },
            200: { value: '#E49582' },
            300: { value: '#DE7960' },
            400: { value: '#EB5E41' },
            500: { value: '#BD4E34' },
            600: { value: '#953D2B' },
            700: { value: '#662314' },
            800: { value: '#451D14' },
            900: { value: '#391915' },
          },
          brown: {
            50: { value: '#78574F' },
            100: { value: '#5B4039' },
            200: { value: '#4E3630' },
            300: { value: '#3D2925' },
            400: { value: '#33221E' },
            500: { value: '#2D1D19' },
            600: { value: '#261916' },
            700: { value: '#201412' },
            800: { value: '#1D1615' },
            900: { value: '#0F0705' },
          },
        },
        spacing: {
          '4.5': { value: '1.125rem' },
        },
        sizes: {
          '15': { value: '3.75rem' },
          '18': { value: '4.5rem' },
        },
      },
    },
  },
  patterns: {
    extend: {
      container: {
        transform(props: ContainerProperties) {
          return {
            position: 'relative',
            width: '100%',
            maxWidth: '7xl',
            mx: 'auto',
            paddingX: { base: '4', md: '6' },
            ...props,
          }
        },
      },
    },
  },
})
