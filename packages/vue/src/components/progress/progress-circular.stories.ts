import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/circular/basic.vue'
import ControlledExample from './examples/circular/controlled.vue'
import IndeterminateExample from './examples/circular/indeterminate.vue'
import InitialValueExample from './examples/circular/initial-value.vue'
import MinMaxExample from './examples/circular/min-max.vue'
import RootProviderExample from './examples/circular/root-provider.vue'
import ValueTextExample from './examples/circular/value-text.vue'

const meta: Meta = {
  title: 'Components / Progress - Circular',
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
