import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { FieldsetBasicExample } from './examples/basic'
import { FieldsetDisabledExample } from './examples/disabled'
import { FieldsetInvalidExample } from './examples/invalid'
import { FieldsetPhoneInputExample } from './examples/phone-input'
import { FieldsetRootProviderExample } from './examples/root-provider'
import { FieldsetWithCheckboxExample } from './examples/with-checkbox'
import { FieldsetWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Fieldset',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldsetBasicExample] })],
  render: () => ({ template: '<fieldset-basic-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldsetDisabledExample] })],
  render: () => ({ template: '<fieldset-disabled-example />' }),
}

export const Invalid: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldsetInvalidExample] })],
  render: () => ({ template: '<fieldset-invalid-example />' }),
}

export const PhoneInput: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldsetPhoneInputExample] })],
  render: () => ({ template: '<fieldset-phone-input-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldsetRootProviderExample] })],
  render: () => ({ template: '<fieldset-root-provider-example />' }),
}

export const WithCheckbox: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldsetWithCheckboxExample] })],
  render: () => ({ template: '<fieldset-with-checkbox-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [FieldsetWithFieldExample] })],
  render: () => ({ template: '<fieldset-with-field-example />' }),
}
