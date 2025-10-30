import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import WithSvgExample from './examples/svg.vue'
import WithPromiseExample from './examples/with-promise.vue'

const meta: Meta = {
  title: 'Utilities / DownloadTrigger',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Svg = {
  render: () => ({
    components: { Component: WithSvgExample },
    template: '<Component />',
  }),
}

export const WithPromise = {
  render: () => ({
    components: { Component: WithPromiseExample },
    template: '<Component />',
  }),
}
