import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/circular/basic.svelte'
import IndeterminateExample from './examples/circular/indeterminate.svelte'
import InitialValueExample from './examples/circular/initial-value.svelte'
import MinMaxExample from './examples/circular/min-max.svelte'
import RootProviderExample from './examples/circular/root-provider.svelte'
import ValueTextExample from './examples/circular/value-text.svelte'

const meta = {
  title: 'Components / Progress / Circular',
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
