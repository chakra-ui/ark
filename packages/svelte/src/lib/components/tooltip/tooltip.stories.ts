import type { Meta } from '@storybook/svelte'
import ArrowExample from './examples/arrow.svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import PositioningExample from './examples/positioning.svelte'
import RenderFnExample from './examples/render-fn.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import TimingsExample from './examples/timings.svelte'

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

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
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

export const Timings = {
  render: () => ({
    Component: TimingsExample,
  }),
}

export const RenderFn = {
  render: () => ({
    Component: RenderFnExample,
  }),
}
