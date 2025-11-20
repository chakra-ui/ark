import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import CollapsibleExample from './examples/collapsible.vue'
import EventsExample from './examples/events.vue'
import MultiplePanelsExample from './examples/multiple-panels.vue'
import RenderPropExample from './examples/render-prop.vue'
import ResizeIndicatorExample from './examples/resize-indicator.vue'
import RootProviderExample from './examples/root-provider.vue'
import VerticalExample from './examples/vertical.vue'

const meta: Meta = {
  title: 'Components / Splitter',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}

export const Collapsible = {
  render: () => ({
    components: { Component: CollapsibleExample },
    template: '<Component />',
  }),
}

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

export const MultiplePanels = {
  render: () => ({
    components: { Component: MultiplePanelsExample },
    template: '<Component />',
  }),
}

export const RenderProp = {
  render: () => ({
    components: { Component: RenderPropExample },
    template: '<Component />',
  }),
}

export const ResizeIndicator = {
  render: () => ({
    components: { Component: ResizeIndicatorExample },
    template: '<Component />',
  }),
}
