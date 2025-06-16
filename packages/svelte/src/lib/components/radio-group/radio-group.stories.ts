import type { Meta } from '@storybook/svelte'
import Basic from './examples/basic.svelte'
import Disabled from './examples/disabled.svelte'
import InitialValue from './examples/initial-value.svelte'
import OnEvent from './examples/on-event.svelte'
import RootProvider from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components / Radio Group',
}

export default meta

export const Base = {
  render: () => ({
    Component: Basic,
  }),
}

export const DisabledExample = {
  render: () => ({
    Component: Disabled,
  }),
}

export const InitialValueExample = {
  render: () => ({
    Component: InitialValue,
  }),
}

export const OnEventExample = {
  render: () => ({
    Component: OnEvent,
  }),
}

export const RootProviderExample = {
  render: () => ({
    Component: RootProvider,
  }),
}
