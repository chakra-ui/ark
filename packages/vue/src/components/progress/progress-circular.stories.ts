import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/circular/basic.vue'
import ControlledExample from './examples/circular/controlled.vue'
import IndeterminateExample from './examples/circular/indeterminate.vue'
import InitialValueExample from './examples/circular/initial-value.vue'
import MinMaxExample from './examples/circular/min-max.vue'
import RootProviderExample from './examples/circular/root-provider.vue'
import ValueTextExample from './examples/circular/value-text.vue'

const meta = {
  title: 'Components / Progress / Circular',
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

export const InitialValue = {
  render: () => ({
    components: { InitialValueExample },
    template: '<InitialValueExample />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { MinMaxExample },
    template: '<MinMaxExample />',
  }),
}

export const Indeterminate = {
  render: () => ({
    components: { IndeterminateExample },
    template: '<IndeterminateExample />',
  }),
}

export const ValueText = {
  render: () => ({
    components: { ValueTextExample },
    template: '<ValueTextExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}