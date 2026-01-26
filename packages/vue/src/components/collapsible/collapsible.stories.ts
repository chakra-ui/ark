import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import DisabledExample from './examples/disabled.vue'
import InitialOpenExample from './examples/initial-open.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import NestedExample from './examples/nested.vue'
import PartialCollapseExample from './examples/partial-collapse.vue'
import RootProviderExample from './examples/root-provider.vue'

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

export const LazyMount = {
  render: () => ({
    components: { Component: LazyMountExample },
    template: '<Component />',
  }),
}

export const Nested = {
  render: () => ({
    components: { Component: NestedExample },
    template: '<Component />',
  }),
}

export const PartialCollapse = {
  render: () => ({
    components: { Component: PartialCollapseExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
