import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ClosedExample from './examples/closed.vue'
import EventsExample from './examples/events.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / Avatar',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Events = {
  render: () => ({
    components: { EventsExample },
    template: '<EventsExample />',
  }),
}

export const Closed = {
  render: () => ({
    components: { ClosedExample },
    template: `
      <ClosedExample
        name="Christian"
        src="https://avatars.githubusercontent.com/u/1846056?v=4"
        @status-change="(e) => console.log(e.status)"
      />
      `,
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}