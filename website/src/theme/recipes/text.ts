import { defineRecipe } from '@pandacss/dev'

export const text = defineRecipe({
  className: 'text',
  jsx: ['Heading', 'Text'],
  variants: {
    variant: {
      heading: {
        color: 'fg.default',
        fontWeight: 'semibold',
      },
    },
    size: {
      xs: { textStyle: 'xs', lineHeight: '1.125rem' },
      sm: { textStyle: 'sm', lineHeight: '1.25rem' },
      md: { textStyle: 'md', lineHeight: '1.5rem' },
      lg: { textStyle: 'lg', lineHeight: '1.75rem' },
      xl: { textStyle: 'xl', lineHeight: '1.875rem' },
      '2xl': { textStyle: '2xl', lineHeight: '2rem' },
      '3xl': { textStyle: '3xl', lineHeight: '2.375rem' },
      '4xl': { textStyle: '4xl', lineHeight: '2.75rem', letterSpacing: '-0.02em' },
      '5xl': { textStyle: '5xl', lineHeight: '3.75rem', letterSpacing: '-0.02em' },
      '6xl': { textStyle: '6xl', lineHeight: '4.5rem', letterSpacing: '-0.02em' },
      '7xl': { textStyle: '7xl', lineHeight: '5.75rem', letterSpacing: '-0.02em' },
    },
  },
})
