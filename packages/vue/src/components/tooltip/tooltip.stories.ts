import type { Meta } from '@storybook/vue3-vite'

import ArrowExample from './examples/arrow.vue'
import BasicExample from './examples/basic.vue'
import ContextExample from './examples/context.vue'
import ControlledExample from './examples/controlled.vue'
import DelayExample from './examples/delay.vue'
import PositioningExample from './examples/positioning.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / Tooltip',
}

export default meta

export const Arrow = {
  render: () => ({
    components: { Component: ArrowExample },
    template: '<Component />',
  }),
}

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

export const Delay = {
  render: () => ({
    components: { Component: DelayExample },
    template: '<Component />',
  }),
}

export const Positioning = {
  render: () => ({
    components: { Component: PositioningExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
