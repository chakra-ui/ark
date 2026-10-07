import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import BatteryExample from './examples/battery.vue'
import ContextExample from './examples/context.vue'
import FormatOptionsExample from './examples/format-options.vue'
import MinMaxExample from './examples/min-max.vue'
import PasswordStrengthExample from './examples/password-strength.vue'
import RootProviderExample from './examples/root-provider.vue'
import ValueStateExample from './examples/value-state.vue'
import ValueTextExample from './examples/value-text.vue'
import VerticalExample from './examples/vertical.vue'

const meta: Meta = {
  title: 'Components / Meter',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Battery = {
  render: () => ({
    components: { Component: BatteryExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const FormatOptions = {
  render: () => ({
    components: { Component: FormatOptionsExample },
    template: '<Component />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { Component: MinMaxExample },
    template: '<Component />',
  }),
}

export const PasswordStrength = {
  render: () => ({
    components: { Component: PasswordStrengthExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const ValueState = {
  render: () => ({
    components: { Component: ValueStateExample },
    template: '<Component />',
  }),
}

export const ValueText = {
  render: () => ({
    components: { Component: ValueTextExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}
