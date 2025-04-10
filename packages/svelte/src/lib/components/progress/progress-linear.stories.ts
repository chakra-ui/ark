import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/linear/basic.svelte'
import IndeterminateExample from './examples/linear/indeterminate.svelte'
import InitialValueExample from './examples/linear/initial-value.svelte'
import MinMaxExample from './examples/linear/min-max.svelte'
import RootProviderExample from './examples/linear/root-provider.svelte'
import ValueTextExample from './examples/linear/value-text.svelte'

const meta = {
  title: 'Components / Progress / Linear',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Indeterminate = {
  render: () => ({
    Component: IndeterminateExample,
  }),
}

export const InitialValue = {
  render: () => ({
    Component: InitialValueExample,
  }),
}

export const MinMax = {
  render: () => ({
    Component: MinMaxExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const ValueText = {
  render: () => ({
    Component: ValueTextExample,
  }),
}
