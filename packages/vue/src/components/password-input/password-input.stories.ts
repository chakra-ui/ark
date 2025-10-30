import type { Meta } from '@storybook/vue3-vite'

import AutocompleteExample from './examples/autocomplete.vue'
import BasicExample from './examples/basic.vue'
import ControlledVisibilityExample from './examples/controlled-visibility.vue'
import IgnorePasswordManagerExample from './examples/ignore-password-manager.vue'
import RootProviderExample from './examples/root-provider.vue'
import StrengthMeterExample from './examples/strength-meter.vue'
import WithFieldExample from './examples/with-field.vue'
import WithValidationExample from './examples/with-validation.vue'

const meta: Meta = {
  title: 'Components / Password Input',
}

export default meta

export const Autocomplete = {
  render: () => ({
    components: { Component: AutocompleteExample },
    template: '<Component />',
  }),
}

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const ControlledVisibility = {
  render: () => ({
    components: { Component: ControlledVisibilityExample },
    template: '<Component />',
  }),
}

export const IgnorePasswordManager = {
  render: () => ({
    components: { Component: IgnorePasswordManagerExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const StrengthMeter = {
  render: () => ({
    components: { Component: StrengthMeterExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}

export const WithValidation = {
  render: () => ({
    components: { Component: WithValidationExample },
    template: '<Component />',
  }),
}
