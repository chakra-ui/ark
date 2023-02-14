import { splitterAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(splitterAnatomy.build())

const partDetails = splitterAnatomy.build()
export const splitter = defineRecipe({
  name: 'splitter',
  description: 'A splitter style',
  base: parts({
    root: {
      width: 'full',
      gap: '2',
      '&[data-orientation="horizontal"]': {
        height: '300px',
      },
      '&[data-orientation="vertical"]': {
        width: '800px',
        height: '600px',
        flexDirection: 'column',
      },
      [`& ${partDetails.panel.selector}:has(${partDetails.panel.selector})` as any]: {
        border: 'none',
      },
    },
    panel: {
      display: 'flex',
      overflow: 'auto',
      flex: '1',
    },
    resizeTrigger: {
      alignItems: 'center',
      background: 'bg.muted',
      borderRadius: 'lg',
      display: 'flex',
      justifyContent: 'center',
      transition: 'background-color 0.2s ease-in-out',
      outline: '0',
      position: 'relative',
      '&[data-orientation="horizontal"]': {
        width: '1',
        margin: 'min(1rem, 20%) 0',
        minHeight: '50px',
      },
      '&[data-orientation="vertical"]': {
        minHeight: '1',
        margin: '0 min(1rem, 20%)',
      },
      _before: {
        content: '""',
        position: 'absolute',
        display: 'block',
        inset: '-4',
        borderRadius: '-2',
        border: 'none',
      },
      _hover: {
        background: 'accent.default',
      },
      _active: {
        background: 'accent.default',
      },
      _disabled: {
        opacity: 0.5,
      },
    },
  }),
})
