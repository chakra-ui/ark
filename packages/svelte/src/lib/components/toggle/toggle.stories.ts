import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import IndicatorExample from './examples/indicator.svelte'
import RenderFnExample from './examples/render-fn.svelte'

const meta: Meta = {
  title: 'Components / Toggle',
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

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const Indicator = {
  render: () => ({
    Component: IndicatorExample,
  }),
}

export const RenderFn = {
  render: () => ({
    Component: RenderFnExample,
  }),
}
