import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import InitialOpenExample from './examples/initial-open.vue'
import LazyMountAndUnmountOnExitExample from './examples/lazy-mount-and-unmount-on-exit.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import NestedCollapsibleExample from './examples/nested-collapsible.vue'
import OnExitCompleteExample from './examples/on-exit-complete.vue'
import PartialCollapseExample from './examples/partial-collapse.vue'
import ProgrammaticOpenExample from './examples/programmatic-open.vue'
import RootProviderExample from './examples/root-provider.vue'
import UnMountOnExitExample from './examples/unmount-on-exit.vue'

const meta: Meta = {
  title: 'Components / Collapsible',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const InitialOpen = {
  render: () => ({
    components: { Component: InitialOpenExample },
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

export const NestedCollapsible = {
  render: () => ({
    components: { Component: NestedCollapsibleExample },
    template: '<Component />',
  }),
}

export const OnExitComplete = {
  render: () => ({
    components: { Component: OnExitCompleteExample },
    template: '<Component />',
  }),
}

export const PartialCollapse = {
  render: () => ({
    components: { Component: PartialCollapseExample },
    template: '<Component />',
  }),
}

export const ProgrammaticOpen = {
  render: () => ({
    components: { Component: ProgrammaticOpenExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const UnmountOnExit = {
  render: () => ({
    components: { Component: UnMountOnExitExample },
    template: '<Component />',
  }),
}
