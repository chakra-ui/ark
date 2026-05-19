import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { PinInputBasicExample } from './examples/basic'
import { PinInputBlurOnCompleteExample } from './examples/blur-on-complete'
import { PinInputControlledExample } from './examples/controlled'
import { PinInputCustomPlaceholderExample } from './examples/custom-placeholder'
import { PinInputMaskExample } from './examples/mask'
import { PinInputOtpExample } from './examples/otp'
import { PinInputRootProviderExample } from './examples/root-provider'
import { PinInputWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / PinInput',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputBasicExample] })],
  render: () => ({ template: '<pin-input-basic-example />' }),
}

export const BlurOnComplete: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputBlurOnCompleteExample] })],
  render: () => ({ template: '<pin-input-blur-on-complete-example />' }),
}

export const CustomPlaceholder: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputCustomPlaceholderExample] })],
  render: () => ({ template: '<pin-input-custom-placeholder-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputControlledExample] })],
  render: () => ({ template: '<pin-input-controlled-example />' }),
}

export const OTPMode: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputOtpExample] })],
  render: () => ({ template: '<pin-input-otp-example />' }),
}

export const Mask: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputMaskExample] })],
  render: () => ({ template: '<pin-input-mask-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputWithFieldExample] })],
  render: () => ({ template: '<pin-input-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputRootProviderExample] })],
  render: () => ({ template: '<pin-input-root-provider-example />' }),
}
