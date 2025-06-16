import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import RenderFnExample from './examples/render-fn.svelte'

const meta: Meta = {
  title: 'Components / Dialog',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const RenderFn = {
  render: () => ({
    Component: RenderFnExample,
  }),
}
