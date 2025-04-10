import type { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Components / Collapsible',
}

export default meta

export { Basic } from './examples/basic'
export { InitialOpen } from './examples/initial-open'
export { LazyMount } from './examples/lazy-mount'
export { LazyMountAndUnmountOnExit } from './examples/lazy-mount-and-unmount-on-exit'
export { OnExitComplete } from './examples/on-exit-complete'
export { RootProvider } from './examples/root-provider'
export { UnmountOnExit } from './examples/unmount-on-exit'
