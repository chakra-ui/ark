import type { Meta } from '@storybook/svelte'
import ListSelectionExample from './examples/list-selection.svelte'

const meta: Meta = {
  title: 'Components / Collection',
}

export default meta

export const ListSelection = {
  render: () => ({
    Component: ListSelectionExample,
  }),
}
