import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { JsonTreeViewBasicExample } from './examples/basic'
import { JsonTreeViewDataTypesExample } from './examples/data-types'
import { JsonTreeViewRenderValueExample } from './examples/render-value'
import { JsonTreeViewRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Utilities / JSON Tree View',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewBasicExample] })],
  render: () => ({ template: '<json-tree-view-basic-example />' }),
}

export const DataTypes: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewDataTypesExample] })],
  render: () => ({ template: '<json-tree-view-data-types-example />' }),
}

export const RenderValue: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewRenderValueExample] })],
  render: () => ({ template: '<json-tree-view-render-value-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewRootProviderExample] })],
  render: () => ({ template: '<json-tree-view-root-provider-example />' }),
}
