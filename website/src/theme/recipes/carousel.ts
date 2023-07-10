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
    indicatorGroup: {
      position: 'absolute',
      display: 'flex',
      gap: 2,
      bottom: 3,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    indicator: {
      borderRadius: 'full',
      width: 3,
      height: 3,
      background: {
        base: 'white',
        _hover: 'orange.200',
      },
      cursor: 'pointer',

      '&[data-current]': {
        background: 'orange.300',
        '&:hover': {
          cursor: 'default',
          background: 'orange.300',
        }
      },

      // for screen readers only.
      '& span': {
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
      }
    }
  }),
})
