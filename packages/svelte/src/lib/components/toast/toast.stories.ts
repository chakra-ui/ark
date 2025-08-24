import type { Meta } from '@storybook/svelte'
import ActionExample from './examples/action.svelte'
import BasicExample from './examples/basic.svelte'
import PromiseExample from './examples/promise-toast.svelte'
import TypesExample from './examples/types.svelte'
import UpdateExample from './examples/update.svelte'

const meta: Meta = {
  title: 'Components / Toast',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Action = {
  render: () => ({
    Component: ActionExample,
  }),
}

export const PromiseToast = {
  render: () => ({
    Component: PromiseExample,
  }),
}

export const Types = {
  render: () => ({
    Component: TypesExample,
  }),
}

export const Update = {
  render: () => ({
    Component: UpdateExample,
  }),
}
