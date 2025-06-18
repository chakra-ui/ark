import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import TourExample from './examples/tour.vue'

const meta = {
  title: 'Components / Tour',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Tour = {
  render: () => ({
    components: { TourExample },
    template: '<TourExample />',
  }),
}
