import type { Meta } from '@storybook/vue3-vite'

import AllowParentSelectionExample from './examples/allow-parent-selection.vue'
import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import EventsExample from './examples/events.vue'
import HoverTriggerExample from './examples/hover-trigger.vue'
import MultipleExample from './examples/multiple.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / Cascade Select',
}

export default meta

export const AllowParentSelection = {
  render: () => ({
    components: { Component: AllowParentSelectionExample },
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

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

export const HoverTrigger = {
  render: () => ({
    components: { Component: HoverTriggerExample },
    template: '<Component />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { Component: MultipleExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
