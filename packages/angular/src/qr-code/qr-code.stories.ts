import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { QrCodeBasicExample } from './examples/basic'
import { QrCodeControlledExample } from './examples/controlled'
import { QrCodeDownloadExample } from './examples/download'
import { QrCodeOverlayExample } from './examples/overlay'
import { QrCodeRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / QR Code',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [QrCodeBasicExample] })],
  render: () => ({ template: '<qr-code-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [QrCodeControlledExample] })],
  render: () => ({ template: '<qr-code-controlled-example />' }),
}

export const Download: StoryObj = {
  decorators: [moduleMetadata({ imports: [QrCodeDownloadExample] })],
  render: () => ({ template: '<qr-code-download-example />' }),
}

export const Overlay: StoryObj = {
  decorators: [moduleMetadata({ imports: [QrCodeOverlayExample] })],
  render: () => ({ template: '<qr-code-overlay-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [QrCodeRootProviderExample] })],
  render: () => ({ template: '<qr-code-root-provider-example />' }),
}
