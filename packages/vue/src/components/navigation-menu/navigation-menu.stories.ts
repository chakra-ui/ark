import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import RenderPropExample from './examples/render-prop.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithViewportExample from './examples/with-viewport.vue'

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

export const RenderProp = {
  render: () => ({
    components: { Component: RenderPropExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithViewport = {
  render: () => ({
    components: { Component: WithViewportExample },
    template: '<Component />',
  }),
}
