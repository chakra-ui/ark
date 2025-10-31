import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import DisabledExample from './examples/disabled.vue'
import InvalidExample from './examples/invalid.vue'
import PhoneInputExample from './examples/phone-input.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithCheckboxExample from './examples/with-checkbox.vue'
import WithFieldExample from './examples/with-field.vue'

const meta: Meta = {
  title: 'Components / Fieldset',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const Invalid = {
  render: () => ({
    components: { Component: InvalidExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}

export const WithCheckbox = {
  render: () => ({
    components: { Component: WithCheckboxExample },
    template: '<Component />',
  }),
}

export const PhoneInput = {
  render: () => ({
    components: { Component: PhoneInputExample },
    template: '<Component />',
  }),
}
