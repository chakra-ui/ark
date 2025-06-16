import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import DisabledExample from './examples/disabled.svelte'
import InitialValueExample from './examples/initial-value.svelte'
import OnEventExample from './examples/on-event.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components / Radio Group',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
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

export const OnEvent = {
  render: () => ({
    Component: OnEventExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
