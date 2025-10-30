import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import StepExample from './examples/step.vue'

const meta: Meta = {
  title: 'Components / AngleSlider',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Step = {
  render: () => ({
    components: { Component: StepExample },
    template: '<Component />',
  }),
}
