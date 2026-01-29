import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DefaultValueExample from './examples/default-value.svelte'
import DefaultViewExample from './examples/default-view.svelte'
import InlineExample from './examples/inline.svelte'
import LocaleExample from './examples/locale.svelte'
import MinMaxExample from './examples/min-max.svelte'
import MonthPickerExample from './examples/month-picker.svelte'
import MultiSelectionExample from './examples/multi-selection.svelte'
import MultipleMonthsExample from './examples/multiple-months.svelte'
import PresetsExample from './examples/presets.svelte'
import RangeSelectionExample from './examples/range-selection.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import TriggerValueExample from './examples/trigger-value.svelte'
import UnavailableExample from './examples/unavailable.svelte'
import YearPickerExample from './examples/year-picker.svelte'

const meta: Meta = {
  title: 'Components / DatePicker',
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

export const DefaultView = {
  render: () => ({
    Component: DefaultViewExample,
  }),
}

export const Inline = {
  render: () => ({
    Component: InlineExample,
  }),
}

export const Locale = {
  render: () => ({
    Component: LocaleExample,
  }),
}

export const MinMax = {
  render: () => ({
    Component: MinMaxExample,
  }),
}

export const MonthPicker = {
  render: () => ({
    Component: MonthPickerExample,
  }),
}

export const MultiSelection = {
  render: () => ({
    Component: MultiSelectionExample,
  }),
}

export const MultipleMonths = {
  render: () => ({
    Component: MultipleMonthsExample,
  }),
}

export const Presets = {
  render: () => ({
    Component: PresetsExample,
  }),
}

export const RangeSelection = {
  render: () => ({
    Component: RangeSelectionExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const TriggerValue = {
  render: () => ({
    Component: TriggerValueExample,
  }),
}

export const Unavailable = {
  render: () => ({
    Component: UnavailableExample,
  }),
}

export const YearPicker = {
  render: () => ({
    Component: YearPickerExample,
  }),
}
