import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ContextExample from './examples/context.vue'
import ControlledExample from './examples/controlled.vue'
import CopyStatusExample from './examples/copy-status.vue'
import TimeoutExample from './examples/timeout.vue'
import RootProviderExample from './examples/root-provider.vue'
import ValueTextExample from './examples/value-text.vue'

const meta: Meta = {
  title: 'Components / Clipboard',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const CopyStatus = {
  render: () => ({
    components: { Component: CopyStatusExample },
    template: '<Component />',
  }),
}

export const Timeout = {
  render: () => ({
    components: { Component: TimeoutExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const ValueText = {
  render: () => ({
    components: { Component: ValueTextExample },
    template: '<Component />',
  }),
}
