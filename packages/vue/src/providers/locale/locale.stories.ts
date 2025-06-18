import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import SetupExample from './examples/setup.vue'
import UsageExample from './examples/usage.vue'

const meta = {
  title: 'Providers / Locale',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Setup = {
  render: () => ({
    components: { SetupExample },
    template: '<SetupExample />',
  }),
}

export const Usage = {
  render: () => ({
    components: { UsageExample },
    template: '<UsageExample />',
  }),
}
