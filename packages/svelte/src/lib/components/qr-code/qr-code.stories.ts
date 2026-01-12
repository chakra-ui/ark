import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import DownloadExample from './examples/download.svelte'
import ErrorCorrectionExample from './examples/error-correction.svelte'
import FillExample from './examples/fill.svelte'
import OverlayExample from './examples/overlay.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta = {
  title: 'Components / QR Code',
} satisfies Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Download = {
  render: () => ({
    Component: DownloadExample,
  }),
}

export const ErrorCorrection = {
  render: () => ({
    Component: ErrorCorrectionExample,
  }),
}

export const Fill = {
  render: () => ({
    Component: FillExample,
  }),
}

export const Overlay = {
  render: () => ({
    Component: OverlayExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
