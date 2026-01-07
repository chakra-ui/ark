import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import InitialValueExample from './examples/initial-value.vue'
import OrientationExample from './examples/orientation.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldsetExample from './examples/with-fieldset.vue'

const meta: Meta = {
  title: 'Components / Radio Group',
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

export const InitialValue = {
  render: () => ({
    components: { Component: InitialValueExample },
    template: '<Component />',
  }),
}

export const Orientation = {
  render: () => ({
    components: { Component: OrientationExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithFieldset = {
  render: () => ({
    components: { Component: WithFieldsetExample },
    template: '<Component />',
  }),
}
