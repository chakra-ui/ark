import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import PositioningExample from './examples/positioning.vue'
import RenderPropExample from './examples/render-prop.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / HoverCard',
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

export const Positioning = {
  render: () => ({
    components: { Component: PositioningExample },
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
