import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import LazyMountAndUnmountOnExitExample from './examples/lazy-mount-and-unmount-on-exit.vue'
import SkipAnimationOnMountExample from './examples/skip-animation-on-mount.vue'
import UnmountOnExitExample from './examples/unmount-on-exit.vue'

const meta: Meta = {
  title: 'Components / Presence',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const LazyMountAndUnmountOnExit = {
  render: () => ({
    components: { Component: LazyMountAndUnmountOnExitExample },
    template: '<Component />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { Component: LazyMountExample },
    template: '<Component />',
  }),
}

export const SkipAnimationOnMount = {
  render: () => ({
    components: { Component: SkipAnimationOnMountExample },
    template: '<Component />',
  }),
}

export const UnmountOnExit = {
  render: () => ({
    components: { Component: UnmountOnExitExample },
    template: '<Component />',
  }),
}
