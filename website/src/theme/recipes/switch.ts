import { switchAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(switchAnatomy.build())

export const switchRecipe = defineRecipe({
  name: 'switchRecipe',
  description: 'A switch style',
  base: parts({
    root: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      gap: '2',
      width: 'fit-content',

      '--switch-track-diff': 'calc(var(--switch-track-width) - var(--switch-track-height))',
      '--switch-thumb-x': 'var(--switch-track-diff)',
      '--switch-track-width': '1.875rem',
      '--switch-track-height': '1rem',
    },
    control: {
      display: 'inline-flex',
      alignItems: 'center',
      boxSizing: 'content-box',
      justifyContent: 'flex-start',
      flexShrink: '0',
      cursor: 'pointer',
      borderRadius: 'full',
      padding: '0.5',
      width: 'var(--switch-track-width)',
      height: 'var(--switch-track-height)',
      transitionProperty:
        'background-color, border-color, color, fill, stroke, opacity, box-shadow,transform',
      transitionDuration: '150ms',
      background: {
        base: 'gray.200',
        _dark: 'brown.900',
      },
      _checked: {
        background: 'accent.default !important',
      },
      _focusVisible: {
        '--shadow': {
          base: 'colors.orange.50',
          _dark: 'colors.gray.700',
        },
        boxShadow: '0 0 0 4px var(--shadow)',
      },
    },
    label: {
      userSelect: 'none',
      textStyle: 'md',
      fontWeight: 'medium',
    },
    thumb: {
      background: {
        base: 'white',
        _dark: 'brown.600',
      },
      transitionProperty: 'transform',
      transitionDuration: '200ms',
      borderRadius: 'inherit',
      width: 'var(--switch-track-height)',
      height: 'var(--switch-track-height)',
      position: 'relative',
      _before: {
        transition: 'background-color 0.2s ease-in-out',
        position: 'absolute',
        '--thumb-size': 'calc(var(--switch-track-height) + 0.7rem)',
        height: 'var(--thumb-size)',
        width: 'var(--thumb-size)',
        backgroundColor: 'transparent',
        content: '',
        zIndex: '1',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 'inherit',
      },
      _checked: {
        background: {
          base: 'white',
          _dark: 'black',
        },
        transform: 'translateX(var(--switch-thumb-x))',
      },
    },
  }),
})
