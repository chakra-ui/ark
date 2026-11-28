import { mount as CustomFormatExample } from './examples/custom-format.js'
import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as DefaultViewExample } from './examples/default-view.js'
import { mount as InlineExample } from './examples/inline.js'
import { mount as LocaleExample } from './examples/locale.js'
import { mount as MinMaxExample } from './examples/min-max.js'
import { mount as MultiSelectionExample } from './examples/multi-selection.js'
import { mount as MultipleMonthsExample } from './examples/multiple-months.js'
import { mount as RangeSelectionExample } from './examples/range-selection.js'
import { mount as SelectTodayExample } from './examples/select-today.js'
import { mount as UnavailableExample } from './examples/unavailable.js'
import { mount as DefaultValueExample } from './examples/default-value.js'
import { mount as FixedWeeksExample } from './examples/fixed-weeks.js'
import { mount as FormExample } from './examples/form.js'
import { mount as FormatParseExample } from './examples/format-parse.js'
import { mount as MaxSelectedDatesExample } from './examples/max-selected-dates.js'
import { mount as MonthPickerExample } from './examples/month-picker.js'
import { mount as MonthPickerRangeExample } from './examples/month-picker-range.js'
import { mount as OpenOnClickExample } from './examples/open-on-click.js'
import { mount as PresetsExample } from './examples/presets.js'
import { mount as YearPickerExample } from './examples/year-picker.js'
import { mount as YearPickerRangeExample } from './examples/year-picker-range.js'

const meta: Meta = { title: 'Components / Date Picker' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const DefaultView: StoryObj = { name: 'Default View', render: renderExample(DefaultViewExample) }

export const Inline: StoryObj = { name: 'Inline', render: renderExample(InlineExample) }

export const Locale: StoryObj = { name: 'Locale', render: renderExample(LocaleExample) }

export const MinMax: StoryObj = { name: 'Min Max', render: renderExample(MinMaxExample) }

export const MultiSelection: StoryObj = { name: 'Multi Selection', render: renderExample(MultiSelectionExample) }

export const MultipleMonths: StoryObj = { name: 'Multiple Months', render: renderExample(MultipleMonthsExample) }

export const RangeSelection: StoryObj = { name: 'Range Selection', render: renderExample(RangeSelectionExample) }

export const SelectToday: StoryObj = { name: 'Select Today', render: renderExample(SelectTodayExample) }

export const Unavailable: StoryObj = { name: 'Unavailable', render: renderExample(UnavailableExample) }

export const CustomFormat: StoryObj = { name: 'Custom Format', render: renderExample(CustomFormatExample) }

export const DefaultValue: StoryObj = { name: 'Default Value', render: renderExample(DefaultValueExample) }

export const FixedWeeks: StoryObj = { name: 'Fixed Weeks', render: renderExample(FixedWeeksExample) }

export const Form: StoryObj = { name: 'Form', render: renderExample(FormExample) }

export const FormatParse: StoryObj = { name: 'Format Parse', render: renderExample(FormatParseExample) }

export const MaxSelectedDates: StoryObj = { name: 'Max Selected Dates', render: renderExample(MaxSelectedDatesExample) }

export const MonthPicker: StoryObj = { name: 'Month Picker', render: renderExample(MonthPickerExample) }

export const MonthPickerRange: StoryObj = { name: 'Month Picker Range', render: renderExample(MonthPickerRangeExample) }

export const OpenOnClick: StoryObj = { name: 'Open On Click', render: renderExample(OpenOnClickExample) }

export const Presets: StoryObj = { name: 'Presets', render: renderExample(PresetsExample) }

export const YearPicker: StoryObj = { name: 'Year Picker', render: renderExample(YearPickerExample) }

export const YearPickerRange: StoryObj = { name: 'Year Picker Range', render: renderExample(YearPickerRangeExample) }
