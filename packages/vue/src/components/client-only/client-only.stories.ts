import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import WithFallbackExample from './examples/with-fallback.vue'

const meta: Meta = {
  title: 'Utilities / ClientOnly',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const WithFallback = {
  render: () => ({
    components: { Component: WithFallbackExample },
    template: '<Component />',
  }),
}
