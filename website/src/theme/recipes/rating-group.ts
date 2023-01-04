import { ratingGroupAnatomy } from '@ark-ui/react'
import { defineRecipe } from 'css-panda'
import { defineParts } from './define-parts'

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
      color: 'bg.muted',
      fill: 'bg.muted',
      transitionProperty: 'base',
      transitionDuration: '50',
      '--stop-color-active': {
        base: 'colors.purple.500',
        _dark: 'colors.purple.200',
      },
      '--stop-color-inactive': {
        base: 'colors.gray.300',
        _dark: 'colors.gray.600',
      },
      _focus: {
        outline: 'none',
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
