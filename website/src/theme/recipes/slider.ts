import { sliderAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(sliderAnatomy.build())

export const slider = defineRecipe({
  name: 'slider',
  description: 'A slider style',
  base: parts({
    root: {
      width: 'full',
    },
    control: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      py: '2',
    },
    track: {
      backgroundColor: 'border.default',
      borderRadius: 'sm',
      flex: '1',
      height: '2',
    },
    range: {
      backgroundColor: 'accent.default',
      borderRadius: 'sm',
      height: '2',
    },
    thumb: {
      background: 'bg.surface',
      borderRadius: 'full',
      borderWidth: '1.5px',
      borderColor: 'accent.default',
      boxShadow: 'sm',
      outline: 'none',
      height: '6',
      width: '6',
      _focus: {
        outline: 'none',
      },
    },
    marker: {
      mt: '2',
      textStyle: 'md',
    },
  }),
})
