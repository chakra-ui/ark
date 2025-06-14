import type { Meta } from '@storybook/svelte'
import ArrowExample from './examples/arrow.svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'

const meta: Meta = {
  title: 'Components/Popover',
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

export const Arrow = {
  render: () => ({
    Component: ArrowExample,
  }),
}
