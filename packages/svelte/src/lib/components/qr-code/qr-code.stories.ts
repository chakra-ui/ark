import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ContextExample from './examples/context.svelte'
import ErrorCorrectionExample from './examples/error-correction.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithOverlayExample from './examples/with-overlay.svelte'

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

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithOverlay = {
  render: () => ({
    Component: WithOverlayExample,
  }),
}

export const ErrorCorrection = {
  render: () => ({
    Component: ErrorCorrectionExample,
  }),
}
