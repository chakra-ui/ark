import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import TourExample from './examples/tour.vue'

const meta: Meta = {
  title: 'Components / Tour',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Tour = {
  render: () => ({
    components: { Component: TourExample },
    template: '<Component />',
  }),
}
