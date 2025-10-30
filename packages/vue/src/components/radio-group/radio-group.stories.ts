import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import DisabledExample from './examples/disabled.vue'
import InitialValueExample from './examples/initial-value.vue'
import OnEventExample from './examples/on-event.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / RadioGroup',
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

export const InitialValue = {
  render: () => ({
    components: { Component: InitialValueExample },
    template: '<Component />',
  }),
}

export const OnEvent = {
  render: () => ({
    components: { Component: OnEventExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
