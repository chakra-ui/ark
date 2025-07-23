import type { Meta } from '@storybook/svelte'
import ListSelectionMultipleExample from './examples/list-selection-multiple.svelte'
import ListSelectionRangeExample from './examples/list-selection-range.svelte'
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

export const ListSelectionMultiple = {
  render: () => ({
    Component: ListSelectionMultipleExample,
  }),
}

export const ListSelectionRange = {
  render: () => ({
    Component: ListSelectionRangeExample,
  }),
}
