import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import BlurOnCompleteExample from './examples/blur-on-complete.vue'
import CustomPlaceholderExample from './examples/custom-placeholder.vue'
import MaskExample from './examples/mask.vue'
import OTPModeExample from './examples/otp-mode.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

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

export const BlurOnComplete = {
  render: () => ({
    components: { Component: BlurOnCompleteExample },
    template: '<Component />',
  }),
}

export const CustomPlaceholder = {
  render: () => ({
    components: { Component: CustomPlaceholderExample },
    template: '<Component />',
  }),
}

export const Mask = {
  render: () => ({
    components: { Component: MaskExample },
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

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}
