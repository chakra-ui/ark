import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import LazyMountAndUnmountOnExitExample from './examples/lazy-mount-and-unmount-on-exit.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import OnExitCompleteExample from './examples/on-exit-complete.vue'
import RootProviderExample from './examples/root-provider.vue'
import UnMountOnExitExample from './examples/unmount-on-exit.vue'

const meta = {
  title: 'Components / Collapsible',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { LazyMountExample },
    template: '<LazyMountExample />',
  }),
}

export const OnExitComplete = {
  render: () => ({
    components: { OnExitCompleteExample },
    template: '<OnExitCompleteExample />',
  }),
}

export const UnmountOnExit = {
  render: () => ({
    components: { UnMountOnExitExample },
    template: '<UnMountOnExitExample />',
  }),
}

export const LazyMountAndUnmountOnExit = {
  render: () => ({
    components: { LazyMountAndUnmountOnExitExample },
    template: '<LazyMountAndUnmountOnExitExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}