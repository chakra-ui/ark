import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import InitialCheckedExample from './examples/initial-checked.vue'
import ContextExample from './examples/context.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

const meta: Meta = {
  title: 'Components / Switch',
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

export const InitialChecked = {
  render: () => ({
    components: { Component: InitialCheckedExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}
