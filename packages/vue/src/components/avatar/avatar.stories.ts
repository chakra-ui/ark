import { action } from '@storybook/addon-actions'
import type { Meta } from '@storybook/vue3'

import type { EmitHandlers } from '../../../.storybook/storybook.types'

import type { AvatarRootEmits } from './avatar-root.vue'
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

interface ClosedArgs {
  props: AvatarProps
  emits: EmitHandlers<AvatarRootEmits>
}

export const Closed = {
  render: (args: ClosedArgs) => ({
    components: { ClosedExample },
    setup() {
      return {
        args,
      }
    },
    template: '<ClosedExample v-bind="args.props" v-on="args.emits" />',
  }),
  args: {
    props: {
      name: 'Christian',
      src: 'https://avatars.githubusercontent.com/u/1846056?v=4',
    },
    emits: {
      statusChange: (details) => action('status changed')(details),
    },
  } satisfies ClosedArgs,
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}
