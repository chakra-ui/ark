import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/linear/basic.vue'
import ControlledExample from './examples/linear/controlled.vue'
import IndeterminateExample from './examples/linear/indeterminate.vue'
import InitialValueExample from './examples/linear/initial-value.vue'
import MinMaxExample from './examples/linear/min-max.vue'
import RootProviderExample from './examples/linear/root-provider.vue'
import ValueTextExample from './examples/linear/value-text.vue'
import VerticalExample from './examples/linear/vertical.vue'

const meta: Meta = {
  title: 'Components / Progress - Linear',
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

export const Indeterminate = {
  render: () => ({
    components: { Component: IndeterminateExample },
    template: '<Component />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { Component: InitialValueExample },
    template: '<Component />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { Component: MinMaxExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const ValueText = {
  render: () => ({
    components: { Component: ValueTextExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}
