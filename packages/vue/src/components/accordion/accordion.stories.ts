import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import CollapsibleExample from './examples/collapsible.vue'
import MultipleExample from './examples/multiple.vue'
import ControlledExample from './examples/controlled.vue'
import HorizontalExample from './examples/horizontal.vue'
import DisabledExample from './examples/disabled.vue'
import RootProviderExample from './examples/root-provider.vue'
import ContextExample from './examples/context.vue'
import ItemContextExample from './examples/item-context.vue'

const meta: Meta = {
  title: 'Components / Accordion',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Collapsible = {
  render: () => ({
    components: { Component: CollapsibleExample },
    template: '<Component />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { Component: MultipleExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Horizontal = {
  render: () => ({
    components: { Component: HorizontalExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const ItemContext = {
  render: () => ({
    components: { Component: ItemContextExample },
    template: '<Component />',
  }),
}
