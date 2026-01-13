import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import VerticalExample from './examples/vertical.svelte'

const meta: Meta = {
  title: 'Components/Steps',
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

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Vertical = {
  render: () => ({
    Component: VerticalExample,
  }),
}
