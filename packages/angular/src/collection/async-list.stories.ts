import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { CollectionAsyncListDependenciesExample } from './examples/async-list-dependencies'
import { CollectionAsyncListFilterExample } from './examples/async-list-filter'
import { CollectionAsyncListInfiniteLoadingExample } from './examples/async-list-infinite-loading'
import { CollectionAsyncListReloadExample } from './examples/async-list-reload'
import { CollectionAsyncListSortClientSideExample } from './examples/async-list-sort-client-side'
import { CollectionAsyncListSortServerSideExample } from './examples/async-list-sort-server-side'

const meta: Meta = {
  title: 'Utilities / Async List',
}

export default meta

export const Dependencies: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollectionAsyncListDependenciesExample] })],
  render: () => ({ template: '<collection-async-list-dependencies-example />' }),
}

export const InfiniteLoading: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollectionAsyncListInfiniteLoadingExample] })],
  render: () => ({ template: '<collection-async-list-infinite-loading-example />' }),
}

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

export const SortServerSide: StoryObj = {
  decorators: [moduleMetadata({ imports: [CollectionAsyncListSortServerSideExample] })],
  render: () => ({ template: '<collection-async-list-sort-server-side-example />' }),
}
