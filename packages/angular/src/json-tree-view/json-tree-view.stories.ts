import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { JsonTreeViewArrayDataExample } from './examples/array-data'
import { JsonTreeViewBasicExample } from './examples/basic'
import { JsonTreeViewDataTypesExample } from './examples/data-types'
import { JsonTreeViewErrorsExample } from './examples/errors'
import { JsonTreeViewExpandLevelExample } from './examples/expand-level'
import { JsonTreeViewFunctionsExample } from './examples/functions'
import { JsonTreeViewMapAndSetExample } from './examples/map-and-set'
import { JsonTreeViewRegexExample } from './examples/regex'
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

export const ArrayData: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewArrayDataExample] })],
  render: () => ({ template: '<json-tree-view-array-data-example />' }),
}

export const MapAndSet: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewMapAndSetExample] })],
  render: () => ({ template: '<json-tree-view-map-and-set-example />' }),
}

export const Regex: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewRegexExample] })],
  render: () => ({ template: '<json-tree-view-regex-example />' }),
}

export const Functions: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewFunctionsExample] })],
  render: () => ({ template: '<json-tree-view-functions-example />' }),
}

export const ExpandLevel: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewExpandLevelExample] })],
  render: () => ({ template: '<json-tree-view-expand-level-example />' }),
}

export const DataTypes: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewDataTypesExample] })],
  render: () => ({ template: '<json-tree-view-data-types-example />' }),
}

export const Errors: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewErrorsExample] })],
  render: () => ({ template: '<json-tree-view-errors-example />' }),
}

export const RenderValue: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewRenderValueExample] })],
  render: () => ({ template: '<json-tree-view-render-value-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [JsonTreeViewRootProviderExample] })],
  render: () => ({ template: '<json-tree-view-root-provider-example />' }),
}
