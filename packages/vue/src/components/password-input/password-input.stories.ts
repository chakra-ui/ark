import type { Meta } from '@storybook/vue3'

import AutocompleteExample from './examples/autocomplete.vue'
import BasicExample from './examples/basic.vue'
import ControlledVisibilityExample from './examples/controlled-visibility.vue'
import IgnorePasswordManagerExample from './examples/ignore-password-manager.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

const meta = {
  title: 'Components / Password Input',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Autocomplete = {
  render: () => ({
    components: { AutocompleteExample },
    template: '<AutocompleteExample />',
  }),
}

export const ControlledVisibility = {
  render: () => ({
    components: { ControlledVisibilityExample },
    template: '<ControlledVisibilityExample />',
  }),
}

export const IgnorePasswordManager = {
  render: () => ({
    components: { IgnorePasswordManagerExample },
    template: '<IgnorePasswordManagerExample />',
  }),
}

export const WithField = {
  render: () => ({
    components: { WithFieldExample },
    template: '<WithFieldExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}
