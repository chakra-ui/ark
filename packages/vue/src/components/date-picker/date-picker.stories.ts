import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DefaultValueExample from './examples/default-value.vue'
import DefaultViewExample from './examples/default-view.vue'
import MonthYearSelectExample from './examples/month-year-select.vue'
import InlineExample from './examples/inline.vue'
import LocaleExample from './examples/locale.vue'
import MinMaxExample from './examples/min-max.vue'
import MonthPickerExample from './examples/month-picker.vue'
import MultipleMonthsExample from './examples/multiple-months.vue'
import MultiSelectionExample from './examples/multi-selection.vue'
import PresetsExample from './examples/presets.vue'
import RangeSelectionExample from './examples/range-selection.vue'
import RootProviderExample from './examples/root-provider.vue'
import TriggerValueExample from './examples/trigger-value.vue'
import UnavailableExample from './examples/unavailable.vue'
import WithTimeExample from './examples/with-time.vue'
import OpenOnClickExample from './examples/open-on-click.vue'
import WeekNumbersExample from './examples/week-numbers.vue'
import YearPickerExample from './examples/year-picker.vue'
import SelectTodayExample from './examples/select-today.vue'
import FixedWeeksExample from './examples/fixed-weeks.vue'
import FormExample from './examples/form.vue'
import MaxSelectedDatesExample from './examples/max-selected-dates.vue'
import CustomCalendarExample from './examples/custom-calendar.vue'

const meta: Meta = {
  title: 'Components / DatePicker',
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

export const DefaultView = {
  render: () => ({
    components: { Component: DefaultViewExample },
    template: '<Component />',
  }),
}

export const MonthYearSelect = {
  render: () => ({
    components: { Component: MonthYearSelectExample },
    template: '<Component />',
  }),
}

export const Inline = {
  render: () => ({
    components: { Component: InlineExample },
    template: '<Component />',
  }),
}

export const Locale = {
  render: () => ({
    components: { Component: LocaleExample },
    template: '<Component />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { Component: MinMaxExample },
    template: '<Component />',
  }),
}

export const MonthPicker = {
  render: () => ({
    components: { Component: MonthPickerExample },
    template: '<Component />',
  }),
}

export const MultipleMonths = {
  render: () => ({
    components: { Component: MultipleMonthsExample },
    template: '<Component />',
  }),
}

export const MultiSelection = {
  render: () => ({
    components: { Component: MultiSelectionExample },
    template: '<Component />',
  }),
}

export const Presets = {
  render: () => ({
    components: { Component: PresetsExample },
    template: '<Component />',
  }),
}

export const RangeSelection = {
  render: () => ({
    components: { Component: RangeSelectionExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const TriggerValue = {
  render: () => ({
    components: { Component: TriggerValueExample },
    template: '<Component />',
  }),
}

export const Unavailable = {
  render: () => ({
    components: { Component: UnavailableExample },
    template: '<Component />',
  }),
}

export const WithTime = {
  render: () => ({
    components: { Component: WithTimeExample },
    template: '<Component />',
  }),
}

export const OpenOnClick = {
  render: () => ({
    components: { Component: OpenOnClickExample },
    template: '<Component />',
  }),
}

export const WeekNumbers = {
  render: () => ({
    components: { Component: WeekNumbersExample },
    template: '<Component />',
  }),
}

export const YearPicker = {
  render: () => ({
    components: { Component: YearPickerExample },
    template: '<Component />',
  }),
}

export const SelectToday = {
  render: () => ({
    components: { Component: SelectTodayExample },
    template: '<Component />',
  }),
}

export const FixedWeeks = {
  render: () => ({
    components: { Component: FixedWeeksExample },
    template: '<Component />',
  }),
}

export const Form = {
  render: () => ({
    components: { Component: FormExample },
    template: '<Component />',
  }),
}

export const MaxSelectedDates = {
  render: () => ({
    components: { Component: MaxSelectedDatesExample },
    template: '<Component />',
  }),
}

export const CustomCalendar = {
  render: () => ({
    components: { Component: CustomCalendarExample },
    template: '<Component />',
  }),
}
