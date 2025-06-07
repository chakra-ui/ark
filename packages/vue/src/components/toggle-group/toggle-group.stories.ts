import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import InitialValueExample from './examples/initial-value.vue'
import MultipleExample from './examples/multiple.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / ToggleGroup',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { InitialValueExample },
    template: '<InitialValueExample />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { MultipleExample },
    template: '<MultipleExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}