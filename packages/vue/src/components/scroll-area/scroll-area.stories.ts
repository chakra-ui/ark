import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import BothDirectionsExample from './examples/both-directions.vue'
import ContextExample from './examples/context.vue'
import HorizontalExample from './examples/horizontal.vue'
import NestedExample from './examples/nested.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / ScrollArea',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const BothDirections = {
  render: () => ({
    components: { Component: BothDirectionsExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const Horizontal = {
  render: () => ({
    components: { Component: HorizontalExample },
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
