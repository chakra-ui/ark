import type { Meta } from '@storybook/vue3'

import ArrowExample from './examples/arrow.vue'
import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import PositioningExample from './examples/positioning.vue'
import RenderFnExample from './examples/render-fn.vue'
import RootProviderExample from './examples/root-provider.vue'
import TimingsExample from './examples/timings.vue'

const meta = {
  title: 'Components / Tooltip',
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

export const RenderFn = {
  render: () => ({
    components: { RenderFnExample },
    template: '<RenderFnExample />',
  }),
}

export const Arrow = {
  render: () => ({
    components: { ArrowExample },
    template: '<ArrowExample />',
  }),
}

export const Timings = {
  render: () => ({
    components: { TimingsExample },
    template: '<TimingsExample />',
  }),
}

export const Positioning = {
  render: () => ({
    components: { PositioningExample },
    template: '<PositioningExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}