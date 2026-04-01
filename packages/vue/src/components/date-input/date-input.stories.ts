import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DefaultValueExample from './examples/default-value.vue'
import DisabledExample from './examples/disabled.vue'
import GranularityExample from './examples/granularity.vue'
import InvalidExample from './examples/invalid.vue'
import LeadingZerosExample from './examples/leading-zeros.vue'
import LocalizedExample from './examples/localized.vue'
import MinMaxExample from './examples/min-max.vue'
import RangeExample from './examples/range.vue'
import ReadOnlyExample from './examples/read-only.vue'
import RootProviderExample from './examples/root-provider.vue'
import RTLExample from './examples/rtl.vue'
import WithClearButtonExample from './examples/with-clear-button.vue'
import WithDatePickerExample from './examples/with-date-picker.vue'

const meta: Meta = {
  title: 'Components / Date Input',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const DefaultValue = {
  render: () => ({
    components: { Component: DefaultValueExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const Granularity = {
  render: () => ({
    components: { Component: GranularityExample },
    template: '<Component />',
  }),
}

export const Invalid = {
  render: () => ({
    components: { Component: InvalidExample },
    template: '<Component />',
  }),
}

export const LeadingZeros = {
  render: () => ({
    components: { Component: LeadingZerosExample },
    template: '<Component />',
  }),
}

export const Localized = {
  render: () => ({
    components: { Component: LocalizedExample },
    template: '<Component />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { Component: MinMaxExample },
    template: '<Component />',
  }),
}

export const Range = {
  render: () => ({
    components: { Component: RangeExample },
    template: '<Component />',
  }),
}

export const ReadOnly = {
  render: () => ({
    components: { Component: ReadOnlyExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const RTL = {
  render: () => ({
    components: { Component: RTLExample },
    template: '<Component />',
  }),
}

export const WithClearButton = {
  render: () => ({
    components: { Component: WithClearButtonExample },
    template: '<Component />',
  }),
}

export const WithDatePicker = {
  render: () => ({
    components: { Component: WithDatePickerExample },
    template: '<Component />',
  }),
}
