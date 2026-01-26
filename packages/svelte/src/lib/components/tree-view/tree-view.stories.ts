import type { Meta } from '@storybook/svelte'
import AsyncLoadingExample from './examples/async-loading.svelte'
import BasicExample from './examples/basic.svelte'
import CheckboxTreeExample from './examples/checkbox-tree.svelte'
import ContextMenuExample from './examples/context-menu.svelte'
import ControlledExpandedExample from './examples/controlled-expanded.svelte'
import ControlledSelectedExample from './examples/controlled-selected.svelte'
import DisabledNodeExample from './examples/disabled-node.svelte'
import ExpandCollapseAllExample from './examples/expand-collapse-all.svelte'
import FilteringExample from './examples/filtering.svelte'
import LazyMountExample from './examples/lazy-mount.svelte'
import LinksExample from './examples/links.svelte'
import MutationExample from './examples/mutation.svelte'
import RenameNodeExample from './examples/rename-node.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import VirtualizedExample from './examples/virtualized.svelte'

const meta: Meta = {
  title: 'Components/TreeView',
}

export default meta

export const AsyncLoading = {
  render: () => ({
    Component: AsyncLoadingExample,
  }),
}

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const CheckboxTree = {
  render: () => ({
    Component: CheckboxTreeExample,
  }),
}

export const ContextMenu = {
  render: () => ({
    Component: ContextMenuExample,
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

export const DisabledNode = {
  render: () => ({
    Component: DisabledNodeExample,
  }),
}

export const ExpandCollapseAll = {
  render: () => ({
    Component: ExpandCollapseAllExample,
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

export const Links = {
  render: () => ({
    Component: LinksExample,
  }),
}

export const Mutation = {
  render: () => ({
    Component: MutationExample,
  }),
}

export const RenameNode = {
  render: () => ({
    Component: RenameNodeExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Virtualized = {
  render: () => ({
    Component: VirtualizedExample,
  }),
}
