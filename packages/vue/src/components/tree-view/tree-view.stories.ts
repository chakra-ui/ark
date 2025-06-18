import type { Meta } from '@storybook/vue3'

import AsyncLoadingExample from './examples/async-loading.vue'
import AsyncTreeNodeExample from './examples/async-tree-node.vue'
import BasicExample from './examples/basic.vue'
import ControlledExpandedExample from './examples/controlled-expanded.vue'
import ControlledSelectedExample from './examples/controlled-selected.vue'
import RootProviderExample from './examples/root-provider.vue'
import TreeNodeExample from './examples/tree-node.vue'

const meta = {
  title: 'Components / Tree View',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const TreeNode = {
  render: () => ({
    components: { TreeNodeExample },
    template: '<TreeNodeExample />',
  }),
}

export const AsyncLoading = {
  render: () => ({
    components: { AsyncLoadingExample },
    template: '<AsyncLoadingExample />',
  }),
}

export const AsyncTreeNode = {
  render: () => ({
    components: { AsyncTreeNodeExample },
    template: '<AsyncTreeNodeExample />',
  }),
}

export const ControlledExpanded = {
  render: () => ({
    components: { ControlledExpandedExample },
    template: '<ControlledExpandedExample />',
  }),
}

export const ControlledSelected = {
  render: () => ({
    components: { ControlledSelectedExample },
    template: '<ControlledSelectedExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}
