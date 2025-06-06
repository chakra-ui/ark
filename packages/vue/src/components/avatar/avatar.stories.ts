import { action } from '@storybook/addon-actions'
import type { Meta } from '@storybook/vue3'

import type { AvatarProps } from './examples/closed.vue'

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
  render: (args: AvatarProps) => ({
    components: { ClosedExample },
    setup() {
      return {
        args,
        onStatusChange: action('status changed'),
      }
    },
    template: '<ClosedExample v-bind="args" @status-change="onStatusChange" />',
  }),
  args: {
    name: 'Christian',
    src: 'https://avatars.githubusercontent.com/u/1846056?v=4',
  } satisfies AvatarProps,
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}
