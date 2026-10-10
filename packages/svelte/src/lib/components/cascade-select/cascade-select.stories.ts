import type { Meta } from '@storybook/svelte'
import AllowParentSelectionExample from './examples/allow-parent-selection.svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import EventsExample from './examples/events.svelte'
import HoverTriggerExample from './examples/hover-trigger.svelte'
import MultipleExample from './examples/multiple.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/CascadeSelect',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Multiple = {
  render: () => ({
    Component: MultipleExample,
  }),
}

export const HoverTrigger = {
  render: () => ({
    Component: HoverTriggerExample,
  }),
}

export const AllowParentSelection = {
  render: () => ({
    Component: AllowParentSelectionExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
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
