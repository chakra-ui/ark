import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import NestedExample from './examples/nested.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithCollapsibleExample from './examples/with-collapsible.vue'
import WithHoverExample from './examples/with-hover.vue'
import WithIndicatorExample from './examples/with-indicator.vue'
import WithTreeViewExample from './examples/with-tree-view.vue'

const meta: Meta = {
  title: 'Components / Toc',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Nested = {
  render: () => ({
    components: { Component: NestedExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithCollapsible = {
  render: () => ({
    components: { Component: WithCollapsibleExample },
    template: '<Component />',
  }),
}

export const WithHover = {
  render: () => ({
    components: { Component: WithHoverExample },
    template: '<Component />',
  }),
}

export const WithIndicator = {
  render: () => ({
    components: { Component: WithIndicatorExample },
    template: '<Component />',
  }),
}

export const WithTreeView = {
  render: () => ({
    components: { Component: WithTreeViewExample },
    template: '<Component />',
  }),
}
