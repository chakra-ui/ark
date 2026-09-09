import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import DisabledExample from './examples/disabled.vue'
import NestedExample from './examples/nested.vue'
import RootProviderExample from './examples/root-provider.vue'
import VerticalExample from './examples/vertical.vue'

const meta: Meta = {
  title: 'Components / Menubar',
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

export const Nested = {
  render: () => ({
    components: { Component: NestedExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}
