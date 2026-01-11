import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import InitialCheckedExample from './examples/initial-checked.svelte'
import ContextExample from './examples/context.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components/Switch',
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

export const InitialChecked = {
  render: () => ({
    Component: InitialCheckedExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
