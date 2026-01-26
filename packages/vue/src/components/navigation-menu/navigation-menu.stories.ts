import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import ContextExample from './examples/context.vue'
import RootProviderExample from './examples/root-provider.vue'
import ViewportExample from './examples/viewport.vue'

const meta: Meta = {
  title: 'Components / Navigation Menu',
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

export const Viewport = {
  render: () => ({
    components: { Component: ViewportExample },
    template: '<Component />',
  }),
}
