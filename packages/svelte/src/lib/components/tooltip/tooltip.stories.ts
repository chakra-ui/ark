import type { Meta } from '@storybook/svelte'
import ArrowExample from './examples/arrow.svelte'
import BasicExample from './examples/basic.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import DelayExample from './examples/delay.svelte'
import PositioningExample from './examples/positioning.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/Tooltip',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Arrow = {
  render: () => ({
    Component: ArrowExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Delay = {
  render: () => ({
    Component: DelayExample,
  }),
}

export const Positioning = {
  render: () => ({
    Component: PositioningExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
