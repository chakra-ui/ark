import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import CountdownExample from './examples/countdown.vue'
import EventsExample from './examples/events.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / Timer',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Countdown = {
  render: () => ({
    components: { CountdownExample },
    template: '<CountdownExample />',
  }),
}

export const Events = {
  render: () => ({
    components: { EventsExample },
    template: '<EventsExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}