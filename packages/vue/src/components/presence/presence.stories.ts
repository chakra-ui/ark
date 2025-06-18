import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import LazyMountAndUnmountOnExitExample from './examples/lazy-mount-and-unmount-on-exit.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import SkipAnimationOnMountExample from './examples/skip-animation-on-mount.vue'
import UnmountOnExitExample from './examples/unmount-on-exit.vue'

const meta = {
  title: 'Components / Presence',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { LazyMountExample },
    template: '<LazyMountExample />',
  }),
}

export const UnmountOnExit = {
  render: () => ({
    components: { UnmountOnExitExample },
    template: '<UnmountOnExitExample />',
  }),
}

export const SkipAnimationOnMount = {
  render: () => ({
    components: { SkipAnimationOnMountExample },
    template: '<SkipAnimationOnMountExample />',
  }),
}

export const LazyMountAndUnmountOnExit = {
  render: () => ({
    components: { LazyMountAndUnmountOnExitExample },
    template: '<LazyMountAndUnmountOnExitExample />',
  }),
}
