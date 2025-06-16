import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import BlurredExample from './examples/blurred.svelte'
import CustomizedExample from './examples/customized.svelte'
import InitialValueExample from './examples/initial-value.svelte'
import OtpModeExample from './examples/otp-mode.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithAutofocusExample from './examples/with-autofocus.svelte'
import WithMaskExample from './examples/with-mask.svelte'

const meta: Meta = {
  title: 'Components/PinInput',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const InitialValue = {
  render: () => ({
    Component: InitialValueExample,
  }),
}

export const WithMask = {
  render: () => ({
    Component: WithMaskExample,
  }),
}

export const OtpMode = {
  render: () => ({
    Component: OtpModeExample,
  }),
}

export const WithAutofocus = {
  render: () => ({
    Component: WithAutofocusExample,
  }),
}

export const Blurred = {
  render: () => ({
    Component: BlurredExample,
  }),
}

export const Customized = {
  render: () => ({
    Component: CustomizedExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
