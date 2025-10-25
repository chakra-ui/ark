import type { Meta } from '@storybook/svelte'
import AutoFillExample from './examples/auto-fill.svelte'
import BasicExample from './examples/basic.svelte'
import FiniteLoopsExample from './examples/finite-loops.svelte'
import PauseOnInteractionExample from './examples/pause-on-interaction.svelte'
import ProgrammaticControlExample from './examples/programmatic-control.svelte'
import ReverseExample from './examples/reverse.svelte'
import SpeedExample from './examples/speed.svelte'
import VerticalExample from './examples/vertical.svelte'
import WithEdgesExample from './examples/with-edges.svelte'

const meta: Meta = {
  title: 'Components/Marquee',
}

export default meta

export const AutoFill = {
  render: () => ({
    Component: AutoFillExample,
  }),
}

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const FiniteLoops = {
  render: () => ({
    Component: FiniteLoopsExample,
  }),
}

export const PauseOnInteraction = {
  render: () => ({
    Component: PauseOnInteractionExample,
  }),
}

export const ProgrammaticControl = {
  render: () => ({
    Component: ProgrammaticControlExample,
  }),
}

export const Reverse = {
  render: () => ({
    Component: ReverseExample,
  }),
}

export const Speed = {
  render: () => ({
    Component: SpeedExample,
  }),
}

export const Vertical = {
  render: () => ({
    Component: VerticalExample,
  }),
}

export const WithEdges = {
  render: () => ({
    Component: WithEdgesExample,
  }),
}
