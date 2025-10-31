import type { Meta } from '@storybook/vue3-vite'

import ArrowExample from './examples/arrow.vue'
import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import PositioningExample from './examples/positioning.vue'
import RenderFnExample from './examples/render-fn.vue'
import RootProviderExample from './examples/root-provider.vue'
import TimingsExample from './examples/timings.vue'

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

export const RenderFn = {
  render: () => ({
    components: { Component: RenderFnExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Timings = {
  render: () => ({
    components: { Component: TimingsExample },
    template: '<Component />',
  }),
}
