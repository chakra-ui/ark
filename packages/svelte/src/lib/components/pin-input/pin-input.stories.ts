import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import BlurOnCompleteExample from './examples/blur-on-complete.svelte'
import CustomPlaceholderExample from './examples/custom-placeholder.svelte'
import MaskExample from './examples/mask.svelte'
import OtpModeExample from './examples/otp-mode.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components/PinInput',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const BlurOnComplete = {
  render: () => ({
    Component: BlurOnCompleteExample,
  }),
}

export const CustomPlaceholder = {
  render: () => ({
    Component: CustomPlaceholderExample,
  }),
}

export const Mask = {
  render: () => ({
    Component: MaskExample,
  }),
}

export const OtpMode = {
  render: () => ({
    Component: OtpModeExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}
