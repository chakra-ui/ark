import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DefaultValueExample from './examples/default-value.svelte'
import DisabledExample from './examples/disabled.svelte'
import GranularityExample from './examples/granularity.svelte'
import InvalidExample from './examples/invalid.svelte'
import LeadingZerosExample from './examples/leading-zeros.svelte'
import LocalizedExample from './examples/localized.svelte'
import MinMaxExample from './examples/min-max.svelte'
import RangeExample from './examples/range.svelte'
import ReadOnlyExample from './examples/read-only.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import RTLExample from './examples/rtl.svelte'
import WithClearButtonExample from './examples/with-clear-button.svelte'
import WithDatePickerExample from './examples/with-date-picker.svelte'

const meta: Meta = {
  title: 'Components / Date Input',
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

export const DefaultValue = {
  render: () => ({
    Component: DefaultValueExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const Granularity = {
  render: () => ({
    Component: GranularityExample,
  }),
}

export const Invalid = {
  render: () => ({
    Component: InvalidExample,
  }),
}

export const LeadingZeros = {
  render: () => ({
    Component: LeadingZerosExample,
  }),
}

export const Localized = {
  render: () => ({
    Component: LocalizedExample,
  }),
}

export const MinMax = {
  render: () => ({
    Component: MinMaxExample,
  }),
}

export const Range = {
  render: () => ({
    Component: RangeExample,
  }),
}

export const ReadOnly = {
  render: () => ({
    Component: ReadOnlyExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const RTL = {
  render: () => ({
    Component: RTLExample,
  }),
}

export const WithClearButton = {
  render: () => ({
    Component: WithClearButtonExample,
  }),
}

export const WithDatePicker = {
  render: () => ({
    Component: WithDatePickerExample,
  }),
}
