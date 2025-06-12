import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import PositioningExample from './examples/positioning.vue'
import RenderPropExample from './examples/render-prop.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / HoverCard',
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

export const Positioning = {
  render: () => ({
    components: { PositioningExample },
    template: '<PositioningExample />',
  }),
}

export const RenderProp = {
  render: () => ({
    components: { RenderPropExample },
    template: '<RenderPropExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}