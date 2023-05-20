import { createAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(createAnatomy('button').parts('root', 'icon', 'spinner').build())

export const button = defineRecipe({
  name: 'button',
  description: 'A button styles',
  base: parts({
    root: {
      alignItems: 'center',
      appearance: 'none',
      borderRadius: 'lg',
      cursor: 'pointer',
      display: 'inline-flex',
      fontWeight: 'semibold',
      justifyContent: 'center',
      outline: 'none',
      position: 'relative',
      transitionProperty: 'base',
      transitionDuration: '100',
      transitionTimingFunction: 'ease-out',
      userSelect: 'none',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
    },
    icon: {
      display: 'inline-flex',
      alignSelf: 'center',
      flexShrink: '0',
    },
  }),
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
  variants: {
    variant: {
      primary: {
        color: 'white',
        backgroundColor: 'orange.400',
        _hover: {
          backgroundColor: 'orange.500',
        },
        _focusVisible: {
          zIndex: 1,
          '--shadow': {
            base: 'colors.orange.50',
            _dark: 'colors.gray.700',
          },
          boxShadow: '0 0 0 4px var(--shadow)',
        },
      },
      secondary: {
        background: {
          base: 'white',
          _dark: 'transparent',
        },
        borderWidth: '1px',
        borderColor: 'border.emphasized',
        color: 'fg.emphasized',
        _hover: {
          color: 'fg.default',
          background: 'bg.subtle',
          _disabled: {
            borderColor: 'border.default',
            background: 'bg.surface',
            color: 'fg.subtle',
            cursor: 'not-allowed',
          },
        },
        _selected: {
          background: 'bg.subtle',
        },
        _focusVisible: {
          zIndex: 1,
          '--shadow': {
            base: 'colors.gray.100',
            _dark: 'colors.gray.800',
          },
          boxShadow: '0 0 0 4px var(--shadow)',
        },
        _disabled: {
          borderColor: 'border.default',
          color: 'fg.subtle',
          cursor: 'not-allowed',
        },
      },
      tertiary: {
        background: 'transparent',
        color: 'fg.emphasized',
        _hover: {
          color: 'fg.default',
          _disabled: {
            borderColor: 'border.default',
            color: 'fg.subtle',
            cursor: 'not-allowed',
          },
        },
        _selected: {
          background: 'bg.subtle',
        },
        _focusVisible: {
          zIndex: 1,
          '--shadow': {
            base: 'colors.gray.100',
            _dark: 'colors.gray.800',
          },
          boxShadow: '0 0 0 4px var(--shadow)',
        },
        _disabled: {
          borderColor: 'border.default',
          color: 'fg.subtle',
          cursor: 'not-allowed',
        },
      },
      link: {
        background: 'transparent',
        color: 'fg.muted',
        _hover: {
          color: 'fg.emphasized',
        },
        _disabled: {
          color: 'fg.subtle',
          cursor: 'not-allowed',
        },
        height: 'auto !important',
        px: '0 !important',
      },
    },
    size: {
      xs: parts({
        root: {
          h: '8',
          minW: '8',
          textStyle: 'xs',
          px: '3',
        },
        icon: {
          fontSize: '1.0rem',
          '--icon-spacing': '0.5rem',
        },
      }),
      sm: parts({
        root: {
          h: '9',
          minW: '9',
          textStyle: 'sm',
          px: '3.5',
        },
        icon: {
          fontSize: '1.25rem',
          '--icon-spacing': '0.5rem',
        },
      }),
      md: parts({
        root: {
          h: '10',
          minW: '10',
          textStyle: 'sm',
          px: '4',
        },
        icon: {
          fontSize: '1.25rem',
          '--icon-spacing': '0.5rem',
        },
      }),
      lg: parts({
        root: {
          h: '11',
          minW: '11',
          px: '4.5',
          textStyle: 'md',
        },
        icon: {
          fontSize: '1.25rem',
          '--icon-spacing': '0.5rem',
        },
      }),
      xl: parts({
        root: {
          h: '12',
          minW: '12',
          px: '5',
          textStyle: 'md',
        },
        icon: {
          fontSize: '1.25rem',
          '--icon-spacing': '0.5rem',
        },
      }),
      '2xl': parts({
        root: {
          h: '15',
          minW: '15',
          px: '7',
          fontSize: 'lg',
        },
        icon: {
          fontSize: '1.5rem',
          '--icon-spacing': '0.75rem',
        },
      }),
    },
  },
})
