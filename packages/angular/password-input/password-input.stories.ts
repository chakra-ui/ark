import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { PasswordInputAutocompleteExample } from './examples/autocomplete'
import { PasswordInputBasicExample } from './examples/basic'
import { PasswordInputControlledExample } from './examples/controlled'
import { PasswordInputIgnorePasswordManagerExample } from './examples/ignore-password-manager'
import { PasswordInputRootProviderExample } from './examples/root-provider'
import { PasswordInputStrengthMeterExample } from './examples/strength-meter'
import { PasswordInputWithFieldExample } from './examples/with-field'
import { PasswordInputWithValidationExample } from './examples/with-validation'

const meta: Meta = {
  title: 'Components / Password Input',
}

export default meta

export const Autocomplete: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputAutocompleteExample] })],
  render: () => ({ template: '<password-input-autocomplete-example />' }),
}

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputBasicExample] })],
  render: () => ({ template: '<password-input-basic-example />' }),
}

export const ControlledVisibility: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputControlledExample] })],
  render: () => ({ template: '<password-input-controlled-example />' }),
}

export const IgnorePasswordManager: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputIgnorePasswordManagerExample] })],
  render: () => ({ template: '<password-input-ignore-password-manager-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputRootProviderExample] })],
  render: () => ({ template: '<password-input-root-provider-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputWithFieldExample] })],
  render: () => ({ template: '<password-input-with-field-example />' }),
}

export const StrengthMeter: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputStrengthMeterExample] })],
  render: () => ({ template: '<password-input-strength-meter-example />' }),
}

export const WithValidation: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputWithValidationExample] })],
  render: () => ({ template: '<password-input-with-validation-example />' }),
}
