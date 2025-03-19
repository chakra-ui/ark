import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import ErrorCorrectionExample from './examples/error-correction.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithOverlayExample from './examples/with-overlay.vue'

const meta = {
  title: 'Components / QR Code',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}

export const WithOverlay = {
  render: () => ({
    components: { WithOverlayExample },
    template: '<WithOverlayExample />',
  }),
}

export const ErrorCorrection = {
  render: () => ({
    components: { ErrorCorrectionExample },
    template: '<ErrorCorrectionExample />',
  }),
}