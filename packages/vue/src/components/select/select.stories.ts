import type { Meta } from '@storybook/vue3'

import AdvancedExample from './examples/advanced.vue'
import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import MultipleExample from './examples/multiple.vue'
import ReactiveCollectionExample from './examples/reactive-collection.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

const meta = {
  title: 'Components / Select',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Advanced = {
  render: () => ({
    components: { AdvancedExample },
    template: '<AdvancedExample />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { MultipleExample },
    template: '<MultipleExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const WithField = {
  render: () => ({
    components: { WithFieldExample },
    template: '<WithFieldExample />',
  }),
}

export const ReactiveCollection = {
  render: () => ({
    components: { ReactiveCollectionExample },
    template: '<ReactiveCollectionExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}