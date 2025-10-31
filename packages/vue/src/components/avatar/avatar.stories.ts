import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ClosedExample from './examples/closed.vue'
import ContextExample from './examples/context.vue'
import EventsExample from './examples/events.vue'
import ProviderExample from './examples/provider.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / Avatar',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

export const Closed = {
  render: () => ({
    components: { Component: ClosedExample },
    template:
      '<Component name="Christian" src="https://avatars.githubusercontent.com/u/1846056?v=4" @status-change="(e) => console.log(e.status)" />',
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

export const Provider = {
  render: () => ({
    components: { Component: ProviderExample },
    template: '<Component />',
  }),
}
