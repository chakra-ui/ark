import type { Meta } from 'storybook-solidjs'

const meta: Meta = {
  title: 'Components / Presence',
}

export default meta

export { Basic } from './examples/basic'
export { LazyMount } from './examples/lazy-mount'
export { UnmountOnExit } from './examples/unmount-on-exit'
export { LazyMountAndUnmountOnExit } from './examples/lazy-mount-and-unmount-on-exit'
