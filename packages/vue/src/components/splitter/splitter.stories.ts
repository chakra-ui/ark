import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import CollapsibleExample from './examples/collapsible.vue'
import ContextExample from './examples/context.vue'
import MultiplePanelsExample from './examples/multiple-panels.vue'
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

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}

export const MultiplePanels = {
  render: () => ({
    components: { Component: MultiplePanelsExample },
    template: '<Component />',
  }),
}

export const Collapsible = {
  render: () => ({
    components: { Component: CollapsibleExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const ResizeIndicator = {
  render: () => ({
    components: { Component: ResizeIndicatorExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
