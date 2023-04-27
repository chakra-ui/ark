import { tagsInputAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(tagsInputAnatomy.build())

export const tagsInput = defineRecipe({
  name: 'tagsInput',
  description: 'A tags input style',
  base: parts({
    root: {
      width: '100%',
    },
    control: {
      background: 'bg.surface',
      borderColor: 'border.emphasized',
      borderWidth: '1px',
      borderRadius: 'lg',
      boxShadow: 'xs',
      color: 'fg.default',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5',
      p: '3',
      transitionProperty: 'base',
      transitionDuration: '100',
      _focusWithin: {
        zIndex: 1,
        '--shadow': {
          base: 'colors.orange.400',
          _dark: 'colors.orange.400',
        },
        boxShadow: '0 0 0 1px var(--shadow)',
        borderColor: 'accent.default',
      },
    },
    input: {
      background: 'bg.surface',
      color: 'fg.default',
      outline: 'none',
    },
    tag: {
      alignItems: 'center',
      background: 'bg.surface',
      borderColor: 'border.emphasized',
      borderRadius: 'md',
      borderWidth: '1px',
      color: 'fg.emphasized',
      display: 'inline-flex',
      fontWeight: 'medium',
      h: '6',
      justifyContent: 'center',
      pl: '2.5',
      pr: '1',
      textStyle: 'sm',
      _selected: {
        zIndex: 1,
        borderColor: 'accent.default',
      },
      '&[hidden]': {
        display: 'none',
      },
    },
    tagInput: {
      background: 'bg.surface',
      color: 'fg.default',
      outline: 'none',
    },
    tagDeleteTrigger: {
      alignItems: 'center',
      background: 'transparent',
      color: 'fg.subtle',
      cursor: 'pointer',
      display: 'inline-flex',
      height: '4',
      justifyContent: 'center',
      p: '0',
      width: '4',
      marginLeft: '1',
      '& svg': {
        width: '3',
        height: '3',
      },
    },
  }),
})
