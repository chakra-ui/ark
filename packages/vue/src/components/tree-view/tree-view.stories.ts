import type { Meta } from '@storybook/vue3-vite'

import AsyncLoadingExample from './examples/async-loading.vue'
import BasicExample from './examples/basic.vue'
import CheckboxTreeExample from './examples/checkbox-tree.vue'
import ContextMenuExample from './examples/context-menu.vue'
import ControlledExpandedExample from './examples/controlled-expanded.vue'
import ControlledSelectedExample from './examples/controlled-selected.vue'
import DisabledNodeExample from './examples/disabled-node.vue'
import ExpandCollapseAllExample from './examples/expand-collapse-all.vue'
import FilteringExample from './examples/filtering.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import LinksExample from './examples/links.vue'
import MutationExample from './examples/mutation.vue'
import RenameNodeExample from './examples/rename-node.vue'
import RootProviderExample from './examples/root-provider.vue'
import VirtualizedExample from './examples/virtualized.vue'

const meta: Meta = {
  title: 'Components / TreeView',
}

export default meta

export const AsyncLoading = {
  render: () => ({
    components: { Component: AsyncLoadingExample },
    template: '<Component />',
  }),
}

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const CheckboxTree = {
  render: () => ({
    components: { Component: CheckboxTreeExample },
    template: '<Component />',
  }),
}

export const ContextMenu = {
  render: () => ({
    components: { Component: ContextMenuExample },
    template: '<Component />',
  }),
}

export const ControlledExpanded = {
  render: () => ({
    components: { Component: ControlledExpandedExample },
    template: '<Component />',
  }),
}

export const ControlledSelected = {
  render: () => ({
    components: { Component: ControlledSelectedExample },
    template: '<Component />',
  }),
}

export const DisabledNode = {
  render: () => ({
    components: { Component: DisabledNodeExample },
    template: '<Component />',
  }),
}

export const ExpandCollapseAll = {
  render: () => ({
    components: { Component: ExpandCollapseAllExample },
    template: '<Component />',
  }),
}

export const Filtering = {
  render: () => ({
    components: { Component: FilteringExample },
    template: '<Component />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { Component: LazyMountExample },
    template: '<Component />',
  }),
}

export const Links = {
  render: () => ({
    components: { Component: LinksExample },
    template: '<Component />',
  }),
}

export const Mutation = {
  render: () => ({
    components: { Component: MutationExample },
    template: '<Component />',
  }),
}

export const RenameNode = {
  render: () => ({
    components: { Component: RenameNodeExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Virtualized = {
  render: () => ({
    components: { Component: VirtualizedExample },
    template: '<Component />',
  }),
}
