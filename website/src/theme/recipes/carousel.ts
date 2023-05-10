import { carouselAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(carouselAnatomy.build())

export const carousel = defineRecipe({
  name: 'carousel',
  description: 'A carousel style',
  base: parts({
    viewport: {
      overflowX: 'hidden',
      position: 'relative',
    },
    control: {
      display: 'flex',
      justifyContent: 'space-between',
      left: 3,
      position: 'absolute',
      right: 3,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
  }),
})
