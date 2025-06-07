import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import CustomizedExample from './examples/customized.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / Pagination',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Customized = {
  render: () => ({
    components: { CustomizedExample },
    template: '<CustomizedExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}