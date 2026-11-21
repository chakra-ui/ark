import type { Meta } from '@storybook/vue3-vite'

import AsyncExample from './examples/async.vue'
import BasicExample from './examples/basic.vue'
import EmptyStateExample from './examples/empty-state.vue'
import GroupsExample from './examples/groups.vue'
import KeywordsExample from './examples/keywords.vue'
import PagesExample from './examples/pages.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithDialogExample from './examples/with-dialog.vue'

const meta: Meta = {
  title: 'Components / Command',
}

export default meta

export const Async = {
  render: () => ({
    components: { Component: AsyncExample },
    template: '<Component />',
  }),
}

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const EmptyState = {
  render: () => ({
    components: { Component: EmptyStateExample },
    template: '<Component />',
  }),
}

export const Groups = {
  render: () => ({
    components: { Component: GroupsExample },
    template: '<Component />',
  }),
}

export const Keywords = {
  render: () => ({
    components: { Component: KeywordsExample },
    template: '<Component />',
  }),
}

export const Pages = {
  render: () => ({
    components: { Component: PagesExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithDialog = {
  render: () => ({
    components: { Component: WithDialogExample },
    template: '<Component />',
  }),
}
