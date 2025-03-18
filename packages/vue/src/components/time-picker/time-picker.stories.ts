import type { Meta } from '@storybook/vue3'

import AdvancedExample from './examples/advanced.vue'
import BasicExample from './examples/basic.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / TimePicker',
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

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}