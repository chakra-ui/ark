import { defineRecipe } from '@pandacss/dev'

export const code = defineRecipe({
  name: 'code',
  description: 'A code style',
  base: {
    '&:not([data-language])': {
      alignItems: 'center',
      bg: 'bg.surface',
      borderWidth: '1px',
      borderRadius: 'sm',
      color: 'accent.muted',
      display: 'inline-flex',
      fontFamily: 'var(--font-fira-code)',
      fontWeight: 'medium',
      fontSize: 'sm',
      height: '6',
      px: '1',
    },
  },
})
