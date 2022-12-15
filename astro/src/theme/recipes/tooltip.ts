import { defineRecipe } from 'css-panda'

export const tooltip = defineRecipe({
  name: 'tooltip',
  description: 'A tooltip style',
  base: {
    px: '4',
    py: '2.5',
    borderRadius: 'sm',
    backgroundColor: {
      base: 'gray.950',
      _dark: 'white',
    },
    boxShadow: 'sm',
    color: {
      base: 'white',
      _dark: 'gray.950',
    },
    textStyle: 'sm',

    "& [data-part='arrow']": {
      '--arrow-size': '8px',
      '--arrow-background': {
        base: 'colors.gray.950',
        _dark: 'colors.white',
      },
    },
  },
})
