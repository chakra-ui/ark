import type { Meta } from '@storybook/vue3-vite'

import AsyncLoadingExample from './examples/async-loading.vue'
import AsyncTreeNodeExample from './examples/async-tree-node.vue'
import BasicExample from './examples/basic.vue'
import CheckboxTreeExample from './examples/checkbox-tree.vue'
import ControlledExpandedExample from './examples/controlled-expanded.vue'
import ControlledSelectedExample from './examples/controlled-selected.vue'
import FilteringExample from './examples/filtering.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import LinksExample from './examples/links.vue'
import RootProviderExample from './examples/root-provider.vue'
import TreeNodeExample from './examples/tree-node.vue'
import TreeNodeWithCheckboxExample from './examples/tree-node-with-checkbox.vue'
import TreeNodeWithLinksExample from './examples/tree-node-with-links.vue'

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

export const AsyncTreeNode = {
  render: () => ({
    components: { Component: AsyncTreeNodeExample },
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

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const TreeNode = {
  render: () => ({
    components: { Component: TreeNodeExample },
    template: '<Component />',
  }),
}

export const TreeNodeWithCheckbox = {
  render: () => ({
    components: { Component: TreeNodeWithCheckboxExample },
    template: '<Component />',
  }),
}

export const TreeNodeWithLinks = {
  render: () => ({
    components: { Component: TreeNodeWithLinksExample },
    template: '<Component />',
  }),
}
