import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AutocompleteExample } from './examples/autocomplete.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ControlledVisibilityExample } from './examples/controlled-visibility.js'
import { mount as IgnorePasswordManagerExample } from './examples/ignore-password-manager.js'
import { mount as StrengthMeterExample } from './examples/strength-meter.js'
import { mount as WithValidationExample } from './examples/with-validation.js'

const meta: Meta = { title: 'Components / Password Input' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const ControlledVisibility: StoryObj = {
  name: 'Controlled Visibility',
  render: renderExample(ControlledVisibilityExample),
}

export const Autocomplete: StoryObj = { name: 'Autocomplete', render: renderExample(AutocompleteExample) }

export const IgnorePasswordManager: StoryObj = {
  name: 'Ignore Password Manager',
  render: renderExample(IgnorePasswordManagerExample),
}

export const WithValidation: StoryObj = { name: 'With Validation', render: renderExample(WithValidationExample) }

export const StrengthMeter: StoryObj = { name: 'Strength Meter', render: renderExample(StrengthMeterExample) }
