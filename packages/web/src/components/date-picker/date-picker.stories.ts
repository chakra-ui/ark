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
