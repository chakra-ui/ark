import { splitterAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(splitterAnatomy.build())

export const splitter = defineRecipe({
  name: 'splitter',
  description: 'A splitter style',
  base: parts({
    root: {
      width: 'full',
      gap: '2',
    },
    panel: {
      display: 'flex',
      overflow: 'auto',
      flex: '1',
    },
    resizeTrigger: {
      alignItems: 'center',
      background: {
        base: 'gray.200',
        _dark: 'brown.200',
      },
      borderRadius: 'lg',
      display: 'flex',
      justifyContent: 'center',
      transition: 'background-color 0.2s ease-in-out',
      outline: '0',
      padding: '0',
      position: 'relative',
      '&[data-orientation="horizontal"]': {
        minWidth: '6px',
        margin: 'min(1rem, 20%) 0',
      },
      '&[data-orientation="vertical"]': {
        minHeight: '6px',
        margin: '0 min(1rem, 20%)',
      },
      _hover: {
        background: 'accent.muted',
      },
      _active: {
        background: 'accent.muted',
      },
      _disabled: {
        opacity: 0.5,
      },
    },
  }),
})
