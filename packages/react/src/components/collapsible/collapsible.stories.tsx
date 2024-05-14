import type { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components / Collapsible',
}

export default meta

export { Basic } from './examples/basic'
export { InitialOpen } from './examples/initial-open'
export { OnExitComplete } from './examples/on-exit-complete'
export { LazyMount } from './examples/lazy-mount'
export { UnmountOnExit } from './examples/unmount-on-exit'
export { LazyMountAndUnmountOnExit } from './examples/lazy-mount-and-unmount-on-exit'
