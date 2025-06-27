import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import PositioningExample from './examples/positioning.svelte'
import RenderPropExample from './examples/render-prop.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithContextExample from './examples/with-context.svelte'

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

export const Positioning = {
  render: () => ({
    Component: PositioningExample,
  }),
}

export const RenderProp = {
  render: () => ({
    Component: RenderPropExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithContext = {
  render: () => ({
    Component: WithContextExample,
  }),
}
