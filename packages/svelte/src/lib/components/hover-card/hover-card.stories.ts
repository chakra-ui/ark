import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import ContextExample from './examples/context.svelte'
import DelayExample from './examples/delay.svelte'
import PositioningExample from './examples/positioning.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta = {
  title: 'Components / Hover Card',
} as Meta

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

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
