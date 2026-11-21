import { mount as CustomFormatExample } from '../../../examples/date-picker/custom-format.js'
import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/date-picker/basic.js'
import { mount as ControlledExample } from '../../../examples/date-picker/controlled.js'
import { mount as DefaultViewExample } from '../../../examples/date-picker/default-view.js'
import { mount as InlineExample } from '../../../examples/date-picker/inline.js'
import { mount as LocaleExample } from '../../../examples/date-picker/locale.js'
import { mount as MinMaxExample } from '../../../examples/date-picker/min-max.js'
import { mount as MultiSelectionExample } from '../../../examples/date-picker/multi-selection.js'
import { mount as MultipleMonthsExample } from '../../../examples/date-picker/multiple-months.js'
import { mount as RangeSelectionExample } from '../../../examples/date-picker/range-selection.js'
import { mount as SelectTodayExample } from '../../../examples/date-picker/select-today.js'
import { mount as UnavailableExample } from '../../../examples/date-picker/unavailable.js'

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
