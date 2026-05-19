import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { DateInputBasicExample } from './examples/basic'
import { DateInputControlledExample } from './examples/controlled'
import { DateInputRangeExample } from './examples/range'
import { DateInputRootProviderExample } from './examples/root-provider'

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

export const Range: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputRangeExample] })],
  render: () => ({ template: '<date-input-range-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [DateInputRootProviderExample] })],
  render: () => ({ template: '<date-input-root-provider-example />' }),
}
