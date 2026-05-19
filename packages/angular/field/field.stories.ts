import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { FieldCustomControlExample } from './examples/custom-control'
import { FieldDisabledExample } from './examples/disabled'
import { FieldInputExample } from './examples/input'
import { FieldInvalidExample } from './examples/invalid'
import { FieldItemExample } from './examples/item'
import { FieldRequiredIndicatorExample } from './examples/required-indicator'
import { FieldRootProviderExample } from './examples/root-provider'
import { FieldSelectExample } from './examples/select'
import { FieldTextareaAutoresizeExample } from './examples/textarea-autoresize'
import { FieldTextareaExample } from './examples/textarea'

const meta: Meta = {
  title: 'Components / Field',
}

export default meta

export const Input: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldInputExample] })],
  render: () => ({ template: '<field-input-example />' }),
}

export const Textarea: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldTextareaExample] })],
  render: () => ({ template: '<field-textarea-example />' }),
}

export const TextareaAutoresize: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldTextareaAutoresizeExample] })],
  render: () => ({ template: '<field-textarea-autoresize-example />' }),
}

export const Select: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldSelectExample] })],
  render: () => ({ template: '<field-select-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldDisabledExample] })],
  render: () => ({ template: '<field-disabled-example />' }),
}

export const Invalid: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldInvalidExample] })],
  render: () => ({ template: '<field-invalid-example />' }),
}

export const RequiredIndicator: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldRequiredIndicatorExample] })],
  render: () => ({ template: '<field-required-indicator-example />' }),
}

export const Item: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldItemExample] })],
  render: () => ({ template: '<field-item-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldRootProviderExample] })],
  render: () => ({ template: '<field-root-provider-example />' }),
}

export const CustomControl: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldCustomControlExample] })],
  render: () => ({ template: '<field-custom-control-example />' }),
}
