import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'

const meta = {
  title: 'Providers / Environment',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}