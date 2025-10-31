import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import CountdownExample from './examples/countdown.vue'
import EventsExample from './examples/events.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / Timer',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Countdown = {
  render: () => ({
    components: { Component: CountdownExample },
    template: '<Component />',
  }),
}

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
