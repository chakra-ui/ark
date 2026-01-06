import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import CollapsibleExample from './examples/collapsible.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import HorizontalExample from './examples/horizontal.svelte'
import ItemContextExample from './examples/item-context.svelte'
import LazyMountExample from './examples/lazy-mount.svelte'
import MultipleExample from './examples/multiple.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/Accordion',
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

export const Collapsible = {
  render: () => ({
    Component: CollapsibleExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const Horizontal = {
  render: () => ({
    Component: HorizontalExample,
  }),
}

export const LazyMount = {
  render: () => ({
    Component: LazyMountExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const ItemContext = {
  render: () => ({
    Component: ItemContextExample,
  }),
}
