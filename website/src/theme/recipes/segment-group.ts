import { segmentGroupAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(segmentGroupAnatomy.build())

export const segmentGroup = defineRecipe({
  name: 'segmentGroup',
  description: 'A segment group style',
  base: parts({
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      borderWidth: '1px',
      borderRadius: 'lg',
      px: '1',
      bg: 'bg.subtle',
      h: '11',
    },
    indicator: {
      background: {
        base: 'white',
        _dark: 'brown.400',
      },
      zIndex: '1',
      boxShadow: 'xs',
      borderRadius: 'md',
    },
    radioControl: {},
    radio: {
      zIndex: '2',
      position: 'relative',
      fontWeight: 'semibold',
      color: 'fg.muted',
      px: '3',
      h: '9',
      cursor: 'pointer',
      display: 'flex',
    },
    radioLabel: {
      alignSelf: 'center',
      textStyle: 'sm',
      _checked: {
        color: 'accent.muted',
      },
      _disabled: {
        color: 'fg.subtle',
        cursor: 'not-allowed',
      },
    },
  }),
})
