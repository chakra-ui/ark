import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/linear/basic.vue'
import ControlledExample from './examples/linear/controlled.vue'
import IndeterminateExample from './examples/linear/indeterminate.vue'
import InitialValueExample from './examples/linear/initial-value.vue'
import MinMaxExample from './examples/linear/min-max.vue'
import RootProviderExample from './examples/circular/root-provider.vue'
import ValueTextExample from './examples/linear/value-text.vue'

const meta = {
  title: 'Components / Progress / Linear',
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