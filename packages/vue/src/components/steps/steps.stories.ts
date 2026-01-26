import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import RootProviderExample from './examples/root-provider.vue'
import VerticalExample from './examples/vertical.vue'

const meta: Meta = {
  title: 'Components / Steps',
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

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}
