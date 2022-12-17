import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('slider')
    .parts(
      'root',
      'label',
      'thumb',
      'hiddenInput',
      'output',
      'track',
      'range',
      'control',
      'markerGroup',
      'marker',
    )
    .build(),
)

export const slider = defineRecipe({
  name: 'slider',
  description: 'A slider style',
  base: parts({
    control: {
      position: 'relative',
      display: 'flex',
      align: 'center',
      py: '2.5',
    },
    track: {
      backgroundColor: 'bg.subtle',
      borderRadius: 'sm',
      flex: '1',
      height: '2',
    },
    range: {
      backgroundColor: 'accent.default',
      height: 'full',
    },
    thumb: {
      height: '6',
      width: '6',
      background: 'bg.surface',
      borderRadius: 'full',
      borderWidth: '1.5px',
      borderColor: 'accent.default',
      boxShadow: 'sm',
    },
  }),
})
