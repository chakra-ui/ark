import type { Meta } from '@storybook/svelte'
import AutocompleteExample from './examples/autocomplete.svelte'
import BasicExample from './examples/basic.svelte'
import ControlledVisibilityExample from './examples/controlled-visibility.svelte'
import IgnorePasswordManagerExample from './examples/ignore-password-manager.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldExample from './examples/with-field.svelte'
import StrengthMeterExample from './examples/strength-meter.svelte'
import WithValidationExample from './examples/with-validation.svelte'

const meta: Meta = {
  title: 'Components/PasswordInput',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Autocomplete = {
  render: () => ({
    Component: AutocompleteExample,
  }),
}

export const ControlledVisibility = {
  render: () => ({
    Component: ControlledVisibilityExample,
  }),
}

export const IgnorePasswordManager = {
  render: () => ({
    Component: IgnorePasswordManagerExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}

export const StrengthMeter = {
  render: () => ({
    Component: StrengthMeterExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithValidation = {
  render: () => ({
    Component: WithValidationExample,
  }),
}
