import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import IndicatorExample from './examples/indicator.vue'
import RenderFnExample from './examples/render-fn.vue'

const meta: Meta = {
  title: 'Components / Toggle',
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

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const Indicator = {
  render: () => ({
    components: { Component: IndicatorExample },
    template: '<Component />',
  }),
}

export const RenderFunction = {
  render: () => ({
    components: { Component: RenderFnExample },
    template: '<Component />',
  }),
}
