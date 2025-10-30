import type { Meta } from '@storybook/vue3-vite'

import DependenciesExample from './examples/async-list/dependencies.vue'
import InfiniteLoadingExample from './examples/async-list/infinite-loading.vue'
import ReloadExample from './examples/async-list/reload.vue'
import FilterExample from './examples/async-list/filter.vue'
import SortClientSideExample from './examples/async-list/sort-client-side.vue'
import SortServerSideExample from './examples/async-list/sort-server-side.vue'

const meta: Meta = {
  title: 'Utilities / Async List',
}

export default meta

export const Dependencies = {
  render: () => ({
    components: { Component: DependenciesExample },
    template: '<Component />',
  }),
}

export const InfiniteLoading = {
  render: () => ({
    components: { Component: InfiniteLoadingExample },
    template: '<Component />',
  }),
}

export const Reload = {
  render: () => ({
    components: { Component: ReloadExample },
    template: '<Component />',
  }),
}

export const Filter = {
  render: () => ({
    components: { Component: FilterExample },
    template: '<Component />',
  }),
}

export const SortClientSide = {
  render: () => ({
    components: { Component: SortClientSideExample },
    template: '<Component />',
  }),
}

export const SortServerSide = {
  render: () => ({
    components: { Component: SortServerSideExample },
    template: '<Component />',
  }),
}
