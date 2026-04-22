import { defineTokens } from '@pandacss/dev'

export const animations = defineTokens.animations({
  'backdrop-in': {
    value: 'fade-in 250ms {easings.emphasized-in}',
  },
  'backdrop-out': {
    value: 'fade-out 200ms {easings.emphasized-out}',
  },
  'dialog-in': {
    value: 'slide-in 400ms {easings.emphasized-in}',
  },
  'dialog-out': {
    value: 'slide-out 200ms {easings.emphasized-out}',
  },
  'drawer-in-left': {
    value: 'slide-in-left 400ms {easings.emphasized-in}',
  },
  'drawer-out-left': {
    value: 'slide-out-left 200ms {easings.emphasized-out}',
  },
  'drawer-in-right': {
    value: 'slide-in-right 400ms {easings.emphasized-in}',
  },
  'drawer-out-right': {
    value: 'slide-out-right 200ms {easings.emphasized-out}',
  },
  'skeleton-pulse': {
    value: 'skeleton-pulse 2s {easings.pulse} infinite',
  },
  'fade-in': {
    value: 'fade-in 400ms {easings.emphasized-in}',
  },
  'collapse-in': {
    value: 'collapse-in 250ms {easings.emphasized-in}',
  },
  'collapse-out': {
    value: 'collapse-out 200ms {easings.emphasized-out}',
  },
  spin: {
    value: 'spin 1s linear infinite',
  },
})
