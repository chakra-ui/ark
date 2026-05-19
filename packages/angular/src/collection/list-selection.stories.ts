import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { CollectionListSelectionBasicExample } from './examples/list-selection-basic'
import { CollectionListSelectionMultipleExample } from './examples/list-selection-multiple'
import { CollectionListSelectionRangeExample } from './examples/list-selection-range'

const meta: Meta = {
  title: 'Utilities / List Selection',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollectionListSelectionBasicExample] })],
  render: () => ({ template: '<collection-list-selection-basic-example />' }),
}

export const Multiple: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollectionListSelectionMultipleExample] })],
  render: () => ({ template: '<collection-list-selection-multiple-example />' }),
}

export const Range: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollectionListSelectionRangeExample] })],
  render: () => ({ template: '<collection-list-selection-range-example />' }),
}
