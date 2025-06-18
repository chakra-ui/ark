import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import GroupExample from './examples/group.vue'
import MultipleExample from './examples/multiple.vue'
import RootProviderExample from './examples/root-provider.vue'
import ValueTextExample from './examples/value-text.vue'

const meta = {
  title: 'Components / Listbox',
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

export const Disabled = {
  render: () => ({
    components: { DisabledExample },
    template: '<DisabledExample />',
  }),
}

export const Group = {
  render: () => ({
    components: { GroupExample },
    template: '<GroupExample />',
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

export const ValueText = {
  render: () => ({
    components: { ValueTextExample },
    template: '<ValueTextExample />',
  }),
}
