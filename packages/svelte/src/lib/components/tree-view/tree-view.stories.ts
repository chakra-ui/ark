import type { Meta } from '@storybook/svelte'
import AsyncLoadingExample from './examples/async-loading.svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExpandedExample from './examples/controlled-expanded.svelte'
import ControlledSelectedExample from './examples/controlled-selected.svelte'
import FilteringExample from './examples/filtering.svelte'
import LazyMountExample from './examples/lazy-mount.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/TreeView',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const ControlledExpanded = {
  render: () => ({
    Component: ControlledExpandedExample,
  }),
}

export const ControlledSelected = {
  render: () => ({
    Component: ControlledSelectedExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const AsyncLoading = {
  render: () => ({
    Component: AsyncLoadingExample,
  }),
}

export const Filtering = {
  render: () => ({
    Component: FilteringExample,
  }),
}

export const LazyMount = {
  render: () => ({
    Component: LazyMountExample,
  }),
}
