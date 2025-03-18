import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import RangeExample from './examples/range.vue'
import RootProviderExample from './examples/root-provider.vue'
import StandaloneExample from './examples/standalone.vue'

const meta = {
  title: 'Components / DatePicker',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const Standalone = {
  render: () => ({
    components: { StandaloneExample },
    template: '<StandaloneExample />',
  }),
}

export const Range = {
  render: () => ({
    components: { RangeExample },
    template: '<RangeExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}
