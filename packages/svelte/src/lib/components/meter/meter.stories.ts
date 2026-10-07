import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import BatteryExample from './examples/battery.svelte'
import ContextExample from './examples/context.svelte'
import FormatOptionsExample from './examples/format-options.svelte'
import MinMaxExample from './examples/min-max.svelte'
import PasswordStrengthExample from './examples/password-strength.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import ValueStateExample from './examples/value-state.svelte'
import ValueTextExample from './examples/value-text.svelte'
import VerticalExample from './examples/vertical.svelte'

const meta = {
  title: 'Components / Meter',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Battery = {
  render: () => ({
    Component: BatteryExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const FormatOptions = {
  render: () => ({
    Component: FormatOptionsExample,
  }),
}

export const MinMax = {
  render: () => ({
    Component: MinMaxExample,
  }),
}

export const PasswordStrength = {
  render: () => ({
    Component: PasswordStrengthExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const ValueState = {
  render: () => ({
    Component: ValueStateExample,
  }),
}

export const ValueText = {
  render: () => ({
    Component: ValueTextExample,
  }),
}

export const Vertical = {
  render: () => ({
    Component: VerticalExample,
  }),
}
