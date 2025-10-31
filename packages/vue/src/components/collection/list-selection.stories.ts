import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/list-selection/basic.vue'
import MultipleExample from './examples/list-selection/multiple.vue'
import RangeExample from './examples/list-selection/range.vue'

const meta: Meta = {
  title: 'Utilities / List Selection',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { Component: MultipleExample },
    template: '<Component />',
  }),
}

export const Range = {
  render: () => ({
    components: { Component: RangeExample },
    template: '<Component />',
  }),
}
