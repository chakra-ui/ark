import { defineSlotRecipe } from '@pandacss/dev'

export const table = defineSlotRecipe({
  className: 'table',
  slots: ['root', 'body', 'cell', 'footer', 'head', 'header', 'row', 'caption'],
  base: {
    root: {
      captionSide: 'bottom',
      width: 'full',
    },
    body: {
      '& tr:last-child': {
        borderBottomWidth: '0',
      },
    },
    caption: {
      color: 'fg.subtle',
    },
    cell: {
      verticalAlign: 'middle',
    },
    footer: {
      fontWeight: 'medium',
      borderTopWidth: '1px',
      '& tr:last-child': {
        borderBottomWidth: '0',
      },
    },
    header: {
      color: 'fg.muted',
      fontWeight: 'medium',
      textAlign: 'left',
      verticalAlign: 'middle',
    },
    row: {
      borderBottomWidth: '1px',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'plain',
  },
  variants: {
    variant: {
      outline: {
        root: {
          borderWidth: '1px',
        },
        head: {
          bg: 'bg.subtle',
        },
      },
      plain: {
        row: {
          _hover: {
            bg: 'bg.subtle',
          },
          _selected: {
            bg: 'bg.muted',
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          textStyle: 'sm',
        },
        caption: {
          mt: '4',
        },
        cell: {
          height: '11',
          px: '3',
        },
        header: {
          height: '11',
          px: '3',
        },
      },
      md: {
        root: {
          textStyle: 'sm',
        },
        caption: {
          mt: '4',
        },
        cell: {
          height: '14',
          px: '4',
        },
        header: {
          height: '11',
          px: '4',
        },
      },
    },
  },
})
