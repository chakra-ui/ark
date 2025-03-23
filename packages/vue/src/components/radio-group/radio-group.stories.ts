import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import DisabledExample from './examples/disabled.vue'
import InitialValueExample from './examples/initial-value.vue'
import OnEventExample from './examples/on-event.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / RadioGroup',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { DisabledExample },
    template: '<DisabledExample />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { InitialValueExample },
    template: '<InitialValueExample />',
  }),
}

export const OnEvent = {
  render: () => ({
    components: { OnEventExample },
    template: '<OnEventExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}