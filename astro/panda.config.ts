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
  tokens: {
    ...tokens,
    colors: {
      light: {
        blue: {
          300: { value: '#91C3FD' },
          500: { value: '#3479E8' },
          600: { value: '#2362EA' },
          700: { value: '#1D4FD7' },
        },
      },
      dark: {
        blue: {
          600: { value: '#50A1FF' },
          700: { value: '#7AB7FF' },
          800: { value: '#DCEBFE' },
          900: { value: '#F0F6FF' },
        },
      },
    },
  },
  // Add your semantic tokens here
  semanticTokens: {},
  // Add your keyframes here (spin, fade, etc)
  keyframes,
  // Add your breakpoints here (sm, md, lg, xl)
  breakpoints,
  // Add your css property utilities here (mt, ml, etc)
  utilities,
  // Add your css patterns here (stack, grid, etc)
  patterns: {
    ...patterns,
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
  recipes: {
    button: {
      name: 'button',
      description: 'A button styles',
      base: {
        fontWeight: 'semibold',
        cursor: 'pointer',
        transitionProperty: 'common',
        transitionDuration: 'normal',
      },
      variants: {
        variant: {
          primary: {
            color: {
              value: {
                base: '#ffffff',
                dark: '#141414',
              },
            },
            backgroundColor: {
              value: {
                base: 'light.blue.600',
                dark: 'dark.blue.600',
              },
              hover: {
                base: 'light.blue.500',
                dark: 'dark.blue.700',
              },
              active: {
                base: 'light.blue.300',
                dark: 'dark.blue.800',
              },
            },
            borderColor: {
              value: {
                base: 'light.blue.700',
                dark: 'dark.blue.700',
              },
              active: {
                base: 'light.blue.300',
                dark: 'dark.blue.800',
              },
            },
            borderWidth: '1px',
            borderStyle: 'solid',
          },
        },
        size: {
          sm: {
            fontSize: 'sm',
            height: 9,
            minHeight: 9,
            px: 4,
            borderRadius: 'lg',
          },
          md: {
            fontSize: 'md',
          },
        },
      },
    },
  },
})
