import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import MultipleMonthsExample from './examples/multiple-months.vue'
import RangeExample from './examples/range.vue'
import RootProviderExample from './examples/root-provider.vue'
import InlineExample from './examples/inline.vue'

const meta: Meta = {
  title: 'Components / DatePicker',
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

export const Inline = {
  render: () => ({
    components: { Component: InlineExample },
    template: '<Component />',
  }),
}

export const Range = {
  render: () => ({
    components: { Component: RangeExample },
    template: '<Component />',
  }),
}

export const MultipleMonths = {
  render: () => ({
    components: { Component: MultipleMonthsExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
