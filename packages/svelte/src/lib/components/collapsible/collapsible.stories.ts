import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import DisabledExample from './examples/disabled.svelte'
import InitialOpenExample from './examples/initial-open.svelte'
import LazyMountExample from './examples/lazy-mount.svelte'
import NestedExample from './examples/nested.svelte'
import PartialCollapseExample from './examples/partial-collapse.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/Collapsible',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const InitialOpen = {
  render: () => ({
    Component: InitialOpenExample,
  }),
}

export const LazyMount = {
  render: () => ({
    Component: LazyMountExample,
  }),
}

export const Nested = {
  render: () => ({
    Component: NestedExample,
  }),
}

export const PartialCollapse = {
  render: () => ({
    Component: PartialCollapseExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
