import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { CollectionAsyncListFilterExample } from './examples/async-list-filter'
import { CollectionAsyncListReloadExample } from './examples/async-list-reload'
import { CollectionAsyncListSortClientSideExample } from './examples/async-list-sort-client-side'

const meta: Meta = {
  title: 'Utilities / Async List',
}

export default meta

export const Reload: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollectionAsyncListReloadExample] })],
  render: () => ({ template: '<collection-async-list-reload-example />' }),
}

export const Filter: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollectionAsyncListFilterExample] })],
  render: () => ({ template: '<collection-async-list-filter-example />' }),
}

export const SortClientSide: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollectionAsyncListSortClientSideExample] })],
  render: () => ({ template: '<collection-async-list-sort-client-side-example />' }),
}
