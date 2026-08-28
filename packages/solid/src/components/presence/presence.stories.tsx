import type { Meta } from 'storybook-solidjs-vite'

const meta: Meta = {
  title: 'Components / Presence',
}

export default meta

export { Basic } from './examples/basic.tsx'
export { LazyMount } from './examples/lazy-mount.tsx'
export { LazyMountAndUnmountOnExit } from './examples/lazy-mount-and-unmount-on-exit.tsx'
export { SkipAnimationOnMount } from './examples/skip-animation-on-mount.tsx'
export { UnmountOnExit } from './examples/unmount-on-exit.tsx'
