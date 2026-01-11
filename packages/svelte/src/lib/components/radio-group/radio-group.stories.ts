import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import InitialValueExample from './examples/initial-value.svelte'
import OrientationExample from './examples/orientation.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldsetExample from './examples/with-fieldset.svelte'

const meta: Meta = {
  title: 'Components / Radio Group',
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

export const InitialValue = {
  render: () => ({
    Component: InitialValueExample,
  }),
}

export const Orientation = {
  render: () => ({
    Component: OrientationExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithFieldset = {
  render: () => ({
    Component: WithFieldsetExample,
  }),
}
