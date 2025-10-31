import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import BlurredExample from './examples/blurred.vue'
import CustomizedExample from './examples/customized.vue'
import InitialValueExample from './examples/initial-value.vue'
import OTPModeExample from './examples/otp-mode.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithAutofocusExample from './examples/with-autofocus.vue'
import WithFieldExample from './examples/with-field.vue'
import WithMaskExample from './examples/with-mask.vue'

const meta: Meta = {
  title: 'Components / PinInput',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Blurred = {
  render: () => ({
    components: { Component: BlurredExample },
    template: '<Component />',
  }),
}

export const Customized = {
  render: () => ({
    components: { Component: CustomizedExample },
    template: '<Component />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { Component: InitialValueExample },
    template: '<Component />',
  }),
}

export const OTPMode = {
  render: () => ({
    components: { Component: OTPModeExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithAutofocus = {
  render: () => ({
    components: { Component: WithAutofocusExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}

export const WithMask = {
  render: () => ({
    components: { Component: WithMaskExample },
    template: '<Component />',
  }),
}
