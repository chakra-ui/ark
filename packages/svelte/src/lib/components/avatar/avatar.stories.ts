import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ClosedExample from './examples/closed.svelte'
import ContextExample from './examples/context.svelte'
import EventsExample from './examples/events.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta = {
  title: 'Components / Avatar',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Closed = {
  name: 'Composed Avatar',
  render: () => ({
    Component: ClosedExample,
    props: {
      name: 'John Doe',
      src: 'https://i.pravatar.cc/300?u=johndoe',
    },
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const Events = {
  render: () => ({
    Component: EventsExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
