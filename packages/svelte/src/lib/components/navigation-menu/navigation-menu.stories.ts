import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import ContextExample from './examples/context.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import ViewportExample from './examples/viewport.svelte'
import type { Meta } from '@storybook/svelte'

const meta: Meta = {
  title: 'Components / Navigation Menu',
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
export const Viewport = {
  render: () => ({
    Component: ViewportExample,
  }),
}
