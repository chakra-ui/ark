import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import ErrorCorrectionExample from './examples/error-correction.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithOverlayExample from './examples/with-overlay.vue'

const meta: Meta = {
  title: 'Components / QrCode',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const ErrorCorrection = {
  render: () => ({
    components: { Component: ErrorCorrectionExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithOverlay = {
  render: () => ({
    components: { Component: WithOverlayExample },
    template: '<Component />',
  }),
}
