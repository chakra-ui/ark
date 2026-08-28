import { menuAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const itemStyle = {
  alignItems: 'center',
  borderRadius: 'l1',
  cursor: 'pointer',
  display: 'flex',
  fontWeight: 'medium',
  textStyle: 'sm',
  transitionDuration: 'fast',
  transitionProperty: 'background, color',
  transitionTimingFunction: 'default',
  _hover: {
    background: 'bg.muted',
    '& :where(svg)': {
      color: 'fg.default',
    },
  },
  _highlighted: {
    background: 'bg.muted',
  },
  '& :where(svg)': {
    color: 'fg.muted',
  },
  _disabled: {
    color: 'fg.disabled',
    cursor: 'not-allowed',
    _hover: {
      color: 'fg.disabled',
      background: 'none',
    },
  },
}

export const menu = defineSlotRecipe({
  className: 'menu',
  slots: menuAnatomy.keys(),
  base: {
    itemGroupLabel: {
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
    content: {
      background: 'bg.default',
      borderRadius: 'l2',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      outline: 'none',
      width: 'calc(100% + 2rem)',
      zIndex: 'dropdown',
      _hidden: {
        display: 'none',
      },
      _open: {
        animation: 'fadeIn 0.25s ease-out',
      },
      _closed: {
        animation: 'fadeOut 0.2s ease-out',
      },
    },
    itemGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    positioner: {
      zIndex: 'dropdown',
    },
    item: itemStyle,
    triggerItem: itemStyle,
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      xs: {
        itemGroup: {
          gap: '1',
        },
        itemGroupLabel: {
          py: '1.5',
          px: '1.5',
          mx: '1',
        },
        content: {
          py: '1',
          gap: '1',
        },
        item: {
          h: '8',
          px: '1.5',
          mx: '1',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        optionItem: {
          h: '8',
          px: '1.5',
          mx: '1',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        triggerItem: {
          h: '8',
          px: '1.5',
          mx: '1',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
      },
      sm: {
        itemGroup: {
          gap: '1',
        },
        itemGroupLabel: {
          py: '2',
          px: '2',
          mx: '1',
        },
        content: {
          py: '1',
          gap: '1',
        },
        item: {
          h: '9',
          px: '2',
          mx: '1',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        optionItem: {
          h: '9',
          px: '2',
          mx: '1',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        triggerItem: {
          h: '9',
          px: '2',
          mx: '1.5',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
      },
      md: {
        itemGroup: {
          gap: '1',
        },
        itemGroupLabel: {
          py: '2.5',
          px: '2.5',
          mx: '1',
        },
        content: {
          py: '1',
          gap: '1',
        },
        item: {
          h: '10',
          px: '2.5',
          mx: '1',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        optionItem: {
          h: '10',
          px: '2.5',
          mx: '1',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        triggerItem: {
          h: '10',
          px: '2.5',
          mx: '1.5',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
      },
      lg: {
        itemGroup: {
          gap: '1',
        },
        itemGroupLabel: {
          py: '2.5',
          px: '2.5',
          mx: '1',
        },
        content: {
          py: '1',
          gap: '1',
        },
        item: {
          h: '11',
          px: '2.5',
          mx: '1',
          '& :where(svg)': {
            width: '5',
            height: '5',
          },
        },
        optionItem: {
          h: '11',
          px: '2.5',
          mx: '1',
          '& :where(svg)': {
            width: '5',
            height: '5',
          },
        },
        triggerItem: {
          h: '11',
          px: '2.5',
          mx: '1.5',
          '& :where(svg)': {
            width: '5',
            height: '5',
          },
        },
      },
    },
  },
})
