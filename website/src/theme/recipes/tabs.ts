import { tabsAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const tabs = defineSlotRecipe({
  className: 'tabs',
  slots: tabsAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      width: 'full',
      _horizontal: {
        flexDirection: 'column',
      },
      _vertical: {
        flexDirection: 'row',
      },
    },
    list: {
      display: 'flex',
      flexShrink: '0',
      _horizontal: {
        flexDirection: 'row',
      },
      _vertical: {
        flexDirection: 'column',
      },
      overflow: 'auto',
      position: 'relative',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    trigger: {
      alignItems: 'center',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: '0',
      fontWeight: 'semibold',
      gap: '2',
      justifyContent: 'center',
      transitionDuration: 'normal',
      transitionProperty: 'color, background, border-color',
      transitionTimingFunction: 'default',
      whiteSpace: 'nowrap',
      zIndex: '1',
      _disabled: {
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          color: 'fg.disabled',
        },
      },
      _hover: {
        color: 'fg.muted',
      },
      _selected: {
        color: 'fg.default',
        _hover: {
          color: 'fg.default',
        },
      },
      _vertical: {
        justifyContent: 'flex-start',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'line',
  },
  variants: {
    variant: {
      enclosed: {
        list: {
          borderRadius: 'l3',
          borderWidth: '1px',
          px: '1',
          backgroundColor: {
            _light: 'gray.a2',
            _dark: 'bg.canvas',
          },
          _horizontal: {
            alignItems: 'center',
          },
          _vertical: {
            height: 'fit-content!',
            py: '1',
          },
        },
        indicator: {
          backgroundColor: {
            _light: 'bg.default',
            _dark: 'bg.subtle',
          },

          boxShadow: 'xs',
          borderRadius: 'l2',
          '--transition-duration': '200ms!',
          height: 'var(--height)',
          width: 'var(--width)',
        },
      },
      line: {
        list: {
          _horizontal: {
            boxShadow: '0 -1px 0 0 inset var(--colors-border-default)',
            gap: '4',
          },
          _vertical: {
            boxShadow: '1px 0 0 0 inset var(--colors-border-default)',
            gap: '1',
          },
        },
        indicator: {
          background: 'colorPalette.default',
          _horizontal: {
            bottom: '0',
            height: '2px',
            width: 'var(--width)',
          },
          _vertical: {
            height: 'var(--height)',
            left: '0',
            width: '2px',
          },
        },
        content: {
          pt: '4',
        },
        trigger: {
          _horizontal: {
            pb: '2.5',
          },
        },
      },
      outline: {
        list: {
          _horizontal: {
            mb: '-1px',
          },
          _vertical: {
            mr: '-1px',
          },
        },
        trigger: {
          borderColor: 'transparent',
          borderWidth: '1px',
          _horizontal: {
            borderTopRadius: 'l2',
          },
          _vertical: {
            borderTopLeftRadius: 'l2',
            borderBottomLeftRadius: 'l2',
          },
          _selected: {
            background: 'bg.default',
            borderColor: 'border.subtle',
            _horizontal: {
              borderBottomColor: 'transparent',
            },
            _vertical: {
              borderRightColor: 'transparent',
            },
          },
        },
        content: {
          borderWidth: '1px',
          borderColor: 'border.subtle',
          background: 'bg.default',
          width: 'full',
        },
      },
    },
    size: {
      sm: {
        trigger: {
          '& svg': {
            width: '4',
            height: '4',
          },
        },
      },
      md: {
        trigger: {
          '& svg': {
            width: '5',
            height: '5',
          },
        },
      },
      lg: {
        trigger: {
          '& svg': {
            width: '5',
            height: '5',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      variant: 'enclosed',
      css: {
        list: {
          height: '10',
        },
        trigger: {
          h: '8',
          minW: '8',
          textStyle: 'sm',
          px: '3',
        },
        content: {
          p: '3.5',
        },
      },
    },
    {
      size: 'md',
      variant: 'enclosed',
      css: {
        list: {
          height: '11',
        },
        trigger: {
          h: '9',
          minW: '9',
          textStyle: 'sm',
          px: '3.5',
        },
        content: {
          p: '4',
        },
      },
    },
    {
      size: 'lg',
      variant: 'enclosed',
      css: {
        list: {
          height: '12',
        },
        trigger: {
          h: '10',
          minW: '10',
          textStyle: 'sm',
          px: '4',
        },
        content: {
          p: '4.5',
        },
      },
    },
    {
      size: 'sm',
      variant: 'outline',
      css: {
        trigger: {
          h: '9',
          minW: '9',
          textStyle: 'sm',
          px: '3.5',
        },
        content: {
          p: '3.5',
        },
      },
    },
    {
      size: 'md',
      variant: 'outline',
      css: {
        trigger: {
          h: '10',
          minW: '10',
          textStyle: 'sm',
          px: '4',
        },
        content: {
          p: '4',
        },
      },
    },
    {
      size: 'lg',
      variant: 'outline',
      css: {
        trigger: {
          h: '11',
          minW: '11',
          textStyle: 'md',
          px: '4.5',
        },
        content: {
          p: '4.5',
        },
      },
    },
    {
      size: 'sm',
      variant: 'line',
      css: {
        trigger: {
          fontSize: 'sm',
          h: '9',
          minW: '9',
          px: '2.5',
        },
        content: {
          pt: '3',
        },
      },
    },
    {
      size: 'md',
      variant: 'line',
      css: {
        trigger: {
          fontSize: 'md',
          h: '10',
          minW: '10',
          px: '3',
        },
        content: {
          pt: '4',
        },
      },
    },
    {
      size: 'lg',
      variant: 'line',
      css: {
        trigger: {
          px: '3.5',
          h: '11',
          minW: '11',
          fontSize: 'md',
        },
        content: {
          pt: '5',
        },
      },
    },
  ],
})
