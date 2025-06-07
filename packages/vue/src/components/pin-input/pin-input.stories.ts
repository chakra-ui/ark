import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import BlurredExample from './examples/blurred.vue'
import CustomizedExample from './examples/customized.vue'
import InitialValueExample from './examples/initial-value.vue'
import OTPModeExample from './examples/otp-mode.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'
import WithMaskExample from './examples/with-mask.vue'

const meta = {
  title: 'Components / PinInput',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { InitialValueExample },
    template: '<InitialValueExample />',
  }),
}

export const Customized = {
  render: () => ({
    components: { CustomizedExample },
    template: '<CustomizedExample />',
  }),
}

export const Blurred = {
  render: () => ({
    components: { BlurredExample },
    template: '<BlurredExample />',
  }),
}

export const OTPMode = {
  render: () => ({
    components: { OTPModeExample },
    template: '<OTPModeExample />',
  }),
}

export const WithMask = {
  render: () => ({
    components: { WithMaskExample },
    template: '<WithMaskExample />',
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