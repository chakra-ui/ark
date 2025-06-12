import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import InitialValueExample from './examples/initial-value.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / SegmentGroup',
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

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { DisabledExample },
    template: '<DisabledExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}