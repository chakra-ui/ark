import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DownloadExample from './examples/download.vue'
import ErrorCorrectionExample from './examples/error-correction.vue'
import FillExample from './examples/fill.vue'
import OverlayExample from './examples/overlay.vue'
import RootProviderExample from './examples/root-provider.vue'

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

export const Download = {
  render: () => ({
    components: { Component: DownloadExample },
    template: '<Component />',
  }),
}

export const ErrorCorrection = {
  render: () => ({
    components: { Component: ErrorCorrectionExample },
    template: '<Component />',
  }),
}

export const Fill = {
  render: () => ({
    components: { Component: FillExample },
    template: '<Component />',
  }),
}

export const Overlay = {
  render: () => ({
    components: { Component: OverlayExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
