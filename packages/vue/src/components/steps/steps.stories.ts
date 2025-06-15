import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / Steps',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}