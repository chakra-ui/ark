import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components/ColorPicker',
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

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}
