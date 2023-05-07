import { colorPickerAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(colorPickerAnatomy.build())

export const colorPicker = defineRecipe({
  name: 'colorPicker',
  description: 'A color picker style',
  base: parts({
    content: {
      background: {
        base: 'white',
        _dark: 'brown.600',
      },
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'lg',
      width: '266px',
      overflow: 'hidden',
    },
    area: {
      height: '266px',
    },
    areaGradient: {
      height: '100%',
    },
    channelSliderTrack: {
      height: '3',
      borderRadius: 'full',
      borderWidth: '1px',
    },
    swatchGroup: {
      display: 'inline-flex',
      flexWrap: 'wrap',
      gap: '2',
    },
    swatch: {
      height: '4',
      width: '4',
      borderRadius: 'xs',
      flexShrink: '0',
    },
    areaThumb: {
      borderRadius: 'full',
      border: '2px solid white',
      height: '4',
      width: '4',
      boxShadow: 'black 0px 0px 0px 1px, black 0px 0px 0px 1px inset',
      outline: 'none',
      zIndex: '1',
    },
    channelSliderThumb: {
      borderRadius: 'full',
      border: '2px solid white',
      height: '3',
      width: '3',
      transform: 'translate(-50%, -50%)',
      outline: 'none',
      boxShadow: 'black 0px 0px 0px 1px, black 0px 0px 0px 1px inset',
    },
  }),
})
