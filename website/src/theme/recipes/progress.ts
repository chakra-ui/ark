import { progressAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const progress = defineSlotRecipe({
  className: 'progress',
  slots: progressAnatomy.keys(),
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    track: {
      backgroundColor: 'bg.emphasized',
      borderRadius: 'l2',
      overflow: 'hidden',
      width: '100%',
    },
    range: {
      backgroundColor: 'colorPalette.default',
      height: '100%',
      transition: 'width 0.2s ease-in-out',
      '--translate-x': '-100%',
    },
    circleTrack: {
      stroke: 'bg.emphasized',
    },
    circleRange: {
      stroke: 'colorPalette.default',
      transitionProperty: 'stroke-dasharray, stroke',
      transitionDuration: '0.6s',
    },
    valueText: {
      textStyle: 'sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        circle: {
          '--size': '36px',
          '--thickness': '4px',
        },
        track: {
          height: '1.5',
        },
      },
      md: {
        track: {
          height: '2',
        },
        circle: {
          '--size': '40px',
          '--thickness': '4px',
        },
      },
      lg: {
        track: {
          height: '2.5',
        },
        circle: {
          '--size': '44px',
          '--thickness': '4px',
        },
      },
    },
  },
})
