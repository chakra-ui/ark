import { mount as AsyncLoadingExample } from '../examples/tree-view/async-loading.js'
import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/tree-view/basic.js'
import { mount as CheckboxTreeExample } from '../examples/tree-view/checkbox-tree.js'
import { mount as ContextMenuExample } from '../examples/tree-view/context-menu.js'
import { mount as ControlledExpandedExample } from '../examples/tree-view/controlled-expanded.js'
import { mount as ControlledSelectedExample } from '../examples/tree-view/controlled-selected.js'
import { mount as DisabledNodeExample } from '../examples/tree-view/disabled-node.js'
import { mount as ExpandCollapseAllExample } from '../examples/tree-view/expand-collapse-all.js'
import { mount as FilteringExample } from '../examples/tree-view/filtering.js'
import { mount as FromJsonExample } from '../examples/tree-view/from-json.js'
import { mount as LargeExample } from '../examples/tree-view/large.js'
import { mount as LazyMountExample } from '../examples/tree-view/lazy-mount.js'
import { mount as LinksExample } from '../examples/tree-view/links.js'
import { mount as RenameNodeExample } from '../examples/tree-view/rename-node.js'
import { mount as ShadowRootExample } from '../examples/tree-view/shadow-root.js'

const meta: Meta = { title: 'Components / Tree View' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const CheckboxTree: StoryObj = { name: 'Checkbox Tree', render: renderExample(CheckboxTreeExample) }

export const ContextMenu: StoryObj = { name: 'Context Menu', render: renderExample(ContextMenuExample) }

export const ControlledExpanded: StoryObj = {
  name: 'Controlled Expanded',
  render: renderExample(ControlledExpandedExample),
}

export const ControlledSelected: StoryObj = {
  name: 'Controlled Selected',
  render: renderExample(ControlledSelectedExample),
}

export const DisabledNode: StoryObj = { name: 'Disabled Node', render: renderExample(DisabledNodeExample) }

export const ExpandCollapseAll: StoryObj = {
  name: 'Expand Collapse All',
  render: renderExample(ExpandCollapseAllExample),
}

export const Filtering: StoryObj = { name: 'Filtering', render: renderExample(FilteringExample) }

export const FromJson: StoryObj = { name: 'From Json', render: renderExample(FromJsonExample) }

export const Large: StoryObj = { name: 'Large', render: renderExample(LargeExample) }

export const LazyMount: StoryObj = { name: 'Lazy Mount', render: renderExample(LazyMountExample) }

export const Links: StoryObj = { name: 'Links', render: renderExample(LinksExample) }

export const RenameNode: StoryObj = { name: 'Rename Node', render: renderExample(RenameNodeExample) }

export const ShadowRoot: StoryObj = { name: 'Shadow Root', render: renderExample(ShadowRootExample) }

export const AsyncLoading: StoryObj = { name: 'Async Loading', render: renderExample(AsyncLoadingExample) }
