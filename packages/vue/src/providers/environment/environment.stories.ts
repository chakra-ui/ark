import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'

const meta: Meta = {
  title: 'Providers / Environment',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}
