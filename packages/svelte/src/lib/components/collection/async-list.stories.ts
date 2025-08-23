import type { Meta } from '@storybook/svelte'
import DependenciesExample from './examples/async-list/dependencies.svelte'
import InfiniteLoadingExample from './examples/async-list/infinite-loading.svelte'
import ReloadExample from './examples/async-list/reload.svelte'
import FilterExample from './examples/async-list/filter.svelte'
import SortClientSideExample from './examples/async-list/sort-client-side.svelte'
import SortServerSideExample from './examples/async-list/sort-server-side.svelte'

const meta: Meta = {
  title: 'Utilities / Async List',
}

export default meta

export const Dependencies = {
  render: () => ({
    Component: DependenciesExample,
  }),
}

export const InfiniteLoading = {
  render: () => ({
    Component: InfiniteLoadingExample,
  }),
}

export const Reload = {
  render: () => ({
    Component: ReloadExample,
  }),
}

export const Filter = {
  render: () => ({
    Component: FilterExample,
  }),
}

export const SortClientSide = {
  render: () => ({
    Component: SortClientSideExample,
  }),
}

export const SortServerSide = {
  render: () => ({
    Component: SortServerSideExample,
  }),
}
