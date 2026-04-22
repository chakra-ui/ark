import { tagsInputAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const tagsInput = defineSlotRecipe({
  className: 'tagsInput',
  slots: tagsInputAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    control: {
      alignItems: 'center',
      borderColor: 'border.default',
      borderRadius: 'l2',
      borderWidth: '1px',
      display: 'flex',
      flexWrap: 'wrap',
      outline: 0,
      transitionDuration: 'normal',
      transitionProperty: 'border-color, box-shadow',
      transitionTimingFunction: 'default',
      _focusWithin: {
        borderColor: 'colorPalette.default',
        boxShadow: '0 0 0 1px var(--colors-color-palette-default)',
      },
    },
    input: {
      background: 'transparent',
      color: 'fg.default',
      outline: 'none',
    },
    itemPreview: {
      alignItems: 'center',
      borderColor: 'border.default',
      borderRadius: 'l1',
      borderWidth: '1px',
      color: 'fg.default',
      display: 'inline-flex',
      fontWeight: 'medium',
      _highlighted: {
        borderColor: 'colorPalette.default',
        boxShadow: '0 0 0 1px var(--colors-color-palette-default)',
      },
      _hidden: {
        display: 'none',
      },
    },
    itemInput: {
      background: 'transparent',
      color: 'fg.default',
      outline: 'none',
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
      textStyle: 'sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      md: {
        root: {
          gap: '1.5',
        },
        control: {
          fontSize: 'md',
          gap: '1.5',
          minW: '10',
          px: '3',
          py: '7px', // TODO line break
        },
        itemPreview: {
          gap: '1',
          h: '6',
          pe: '1',
          ps: '2',
          textStyle: 'sm',
        },
      },
    },
  },
})
