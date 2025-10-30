import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import ControlledOpenExample from './examples/controlled-open.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

const meta: Meta = {
  title: 'Components / ColorPicker',
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

export const ControlledOpen = {
  render: () => ({
    components: { Component: ControlledOpenExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
