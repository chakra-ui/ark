import { defineRecipe } from 'css-panda'

export const tooltip = defineRecipe({
  name: 'tooltip',
  description: 'A tooltip style',
  base: {
    py: '2.5',
    px: '4',
    backgroundColor: {
      base: 'gray.950',
      _dark: 'white',
    },
    boxShadow: 'sm',
    borderRadius: 'sm',
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
