import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { PinInputBasicExample } from './examples/basic'
import { PinInputControlledExample } from './examples/controlled'
import { PinInputOtpExample } from './examples/otp'
import { PinInputRootProviderExample } from './examples/root-provider'
import { PinInputWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Pin Input',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputBasicExample] })],
  render: () => ({ template: '<pin-input-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputControlledExample] })],
  render: () => ({ template: '<pin-input-controlled-example />' }),
}

export const Otp: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputOtpExample] })],
  render: () => ({ template: '<pin-input-otp-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputWithFieldExample] })],
  render: () => ({ template: '<pin-input-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [PinInputRootProviderExample] })],
  render: () => ({ template: '<pin-input-root-provider-example />' }),
}
