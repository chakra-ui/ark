import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { DateInputBasicExample } from './examples/basic'
import { DateInputControlledExample } from './examples/controlled'
import { DateInputDefaultValueExample } from './examples/default-value'
import { DateInputDisabledExample } from './examples/disabled'
import { DateInputGranularityExample } from './examples/granularity'
import { DateInputInvalidExample } from './examples/invalid'
import { DateInputLeadingZerosExample } from './examples/leading-zeros'
import { DateInputLocalizedExample } from './examples/localized'
import { DateInputMinMaxExample } from './examples/min-max'
import { DateInputRangeExample } from './examples/range'
import { DateInputReadOnlyExample } from './examples/read-only'
import { DateInputRootProviderExample } from './examples/root-provider'
import { DateInputRtlExample } from './examples/rtl'
import { DateInputWithClearButtonExample } from './examples/with-clear-button'
import { DateInputWithDatePickerExample } from './examples/with-date-picker'

const meta: Meta = {
  title: 'Components / Date Input',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputBasicExample] })],
  render: () => ({ template: '<date-input-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputControlledExample] })],
  render: () => ({ template: '<date-input-controlled-example />' }),
}

export const DefaultValue: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputDefaultValueExample] })],
  render: () => ({ template: '<date-input-default-value-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputDisabledExample] })],
  render: () => ({ template: '<date-input-disabled-example />' }),
}

export const Granularity: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputGranularityExample] })],
  render: () => ({ template: '<date-input-granularity-example />' }),
}

export const Invalid: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputInvalidExample] })],
  render: () => ({ template: '<date-input-invalid-example />' }),
}

export const LeadingZeros: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputLeadingZerosExample] })],
  render: () => ({ template: '<date-input-leading-zeros-example />' }),
}

export const Localized: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputLocalizedExample] })],
  render: () => ({ template: '<date-input-localized-example />' }),
}

export const MinMax: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputMinMaxExample] })],
  render: () => ({ template: '<date-input-min-max-example />' }),
}

export const Range: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputRangeExample] })],
  render: () => ({ template: '<date-input-range-example />' }),
}

export const ReadOnly: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputReadOnlyExample] })],
  render: () => ({ template: '<date-input-read-only-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputRootProviderExample] })],
  render: () => ({ template: '<date-input-root-provider-example />' }),
}

export const RTL: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputRtlExample] })],
  render: () => ({ template: '<date-input-rtl-example />' }),
}

export const WithClearButton: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputWithClearButtonExample] })],
  render: () => ({ template: '<date-input-with-clear-button-example />' }),
}

export const WithDatePicker: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputWithDatePickerExample] })],
  render: () => ({ template: '<date-input-with-date-picker-example />' }),
}
