import { splitterAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(splitterAnatomy.build())

export const splitter = defineRecipe({
  name: 'splitter',
  description: 'A splitter style',
  base: parts({
    root: {},
    panel: {},
    resizeTrigger: {
      background: '#ebebeb',
      // borderRadius: '8px',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      // transition: 'background-color 0.2s ease-in-out',
      // outline: '0',
      // position: 'relative',
      '&[data-orientation="horizontal"]': {
        width: '1',
        margin: 'min(1rem, 20%) 0',
        minHeight: '50px',
      },
      '&[data-orientation="vertical"]': {
        minHeight: '1',
        margin: '0 min(1rem, 20%)',
      },
      // _before: {
      //   content: '""',
      //   position: 'absolute',
      //   display: 'block',
      //   inset: '-4',
      //   borderRadius: '-2',
      //   border: 'none',
      // },
      // _hover: {
      //   background: '#abb2c9',
      //   color: 'white',
      // },
      // _active: {
      //   background: '#3f51b5',
      //   color: 'white',
      // },
      // _disabled: {
      //   opacity: 0.5,
      // },
    },
  }),
})
