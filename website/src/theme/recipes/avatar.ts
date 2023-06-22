import { avatarAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(avatarAnatomy.build())

export const avatar = defineRecipe({
  name: 'avatar',
  description: 'An avatar style',
  base: parts({
    root: {
      height: '16',
      width: '16',
      borderColor: 'accent.default',
      borderRadius: 'full',
      borderWidth: '1px',
    },
    fallback: {
      alignItems: 'center',
      background: 'accent.default',
      color: 'white',
      display: 'flex',
      fontWeight: 'semibold',
      height: 'inherit',
      justifyContent: 'center',
      textStyle: 'xl',
    },
    image: {
      objectFit: 'cover',
    },
  }),
})
