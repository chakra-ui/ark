import { ratingGroupAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(ratingGroupAnatomy.build())

export const ratingGroup = defineRecipe({
  name: 'ratingGroup',
  description: 'A rating group style',
  base: parts({
    root: {},
    control: {
      display: 'flex',
      gap: '0.5',
    },
    rating: {
      cursor: 'pointer',
      color: {
        base: 'gray.300',
        _dark: 'brown.300',
      },
      fill: {
        base: 'gray.300',
        _dark: 'brown.300',
      },
      transitionProperty: 'base',
      transitionDuration: '50',
      '--stop-color-active': {
        base: 'colors.orange.400',
        _dark: 'colors.orange.400',
      },
      '--stop-color-inactive': {
        base: 'colors.gray.300',
        _dark: 'colors.brown.300',
      },
      _focus: {
        outline: 0,
      },
      '& svg': {
        width: '10',
        height: '10',
      },
      '&[data-highlighted]': {
        color: 'accent.default',
        fill: 'accent.default',
      },
    },
  }),
})
