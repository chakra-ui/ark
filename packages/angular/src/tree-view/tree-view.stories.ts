import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { TreeViewAsyncLoadingExample } from './examples/async-loading'
import { TreeViewBasicExample } from './examples/basic'
import { TreeViewCheckboxTreeExample } from './examples/checkbox-tree'
import { TreeViewControlledExpandedExample } from './examples/controlled-expanded'
import { TreeViewControlledSelectedExample } from './examples/controlled-selected'
import { TreeViewExpandCollapseAllExample } from './examples/expand-collapse-all'
import { TreeViewRenameNodeExample } from './examples/rename-node'
import { TreeViewRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Tree View',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [TreeViewBasicExample] })],
  render: () => ({ template: '<tree-view-basic-example />' }),
}

export const ControlledExpanded: StoryObj = {
  decorators: [moduleMetadata({ imports: [TreeViewControlledExpandedExample] })],
  render: () => ({ template: '<tree-view-controlled-expanded-example />' }),
}

export const ControlledSelected: StoryObj = {
  decorators: [moduleMetadata({ imports: [TreeViewControlledSelectedExample] })],
  render: () => ({ template: '<tree-view-controlled-selected-example />' }),
}

export const CheckboxTree: StoryObj = {
  decorators: [moduleMetadata({ imports: [TreeViewCheckboxTreeExample] })],
  render: () => ({ template: '<tree-view-checkbox-tree-example />' }),
}

export const ExpandCollapseAll: StoryObj = {
  decorators: [moduleMetadata({ imports: [TreeViewExpandCollapseAllExample] })],
  render: () => ({ template: '<tree-view-expand-collapse-all-example />' }),
}

export const AsyncLoading: StoryObj = {
  decorators: [moduleMetadata({ imports: [TreeViewAsyncLoadingExample] })],
  render: () => ({ template: '<tree-view-async-loading-example />' }),
}

export const RenameNode: StoryObj = {
  decorators: [moduleMetadata({ imports: [TreeViewRenameNodeExample] })],
  render: () => ({ template: '<tree-view-rename-node-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [TreeViewRootProviderExample] })],
  render: () => ({ template: '<tree-view-root-provider-example />' }),
}
