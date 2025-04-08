import type { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components / Presence',
}

export default meta

export { Basic } from './examples/basic'
export { LazyMount } from './examples/lazy-mount'
export { LazyMountAndUnmountOnExit } from './examples/lazy-mount-and-unmount-on-exit'
export { SkipAnimationOnMount } from './examples/skip-animation-on-mount'
export { UnmountOnExit } from './examples/unmount-on-exit'
