import type { Meta } from '@storybook/svelte'
import AsyncExample from './examples/async.svelte'
import BasicExample from './examples/basic.svelte'
import EmptyStateExample from './examples/empty-state.svelte'
import GroupsExample from './examples/groups.svelte'
import KeywordsExample from './examples/keywords.svelte'
import PagesExample from './examples/pages.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithDialogExample from './examples/with-dialog.svelte'

const meta: Meta = {
  title: 'Components / Command',
}

export default meta

export const Async = {
  render: () => ({
    Component: AsyncExample,
  }),
}

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const EmptyState = {
  render: () => ({
    Component: EmptyStateExample,
  }),
}

export const Groups = {
  render: () => ({
    Component: GroupsExample,
  }),
}

export const Keywords = {
  render: () => ({
    Component: KeywordsExample,
  }),
}

export const Pages = {
  render: () => ({
    Component: PagesExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithDialog = {
  render: () => ({
    Component: WithDialogExample,
  }),
}
