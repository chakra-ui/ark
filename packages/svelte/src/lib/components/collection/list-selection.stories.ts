import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/list-selection/basic.svelte'
import MultipleExample from './examples/list-selection/multiple.svelte'
import RangeExample from './examples/list-selection/range.svelte'

const meta: Meta = {
  title: 'Utilities / List Selection',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Multiple = {
  render: () => ({
    Component: MultipleExample,
  }),
}

export const Range = {
  render: () => ({
    Component: RangeExample,
  }),
}
