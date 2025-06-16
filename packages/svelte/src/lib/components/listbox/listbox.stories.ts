import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import GroupExample from './examples/group.svelte'
import MultipleExample from './examples/multiple.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components / Listbox',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Group = {
  render: () => ({
    Component: GroupExample,
  }),
}

export const Multiple = {
  render: () => ({
    Component: MultipleExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
