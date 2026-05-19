import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { SignaturePadBasicExample } from './examples/basic'
import { SignaturePadImagePreviewExample } from './examples/image-preview'
import { SignaturePadRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Signature Pad',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [SignaturePadBasicExample] })],
  render: () => ({ template: '<signature-pad-basic-example />' }),
}

export const ImagePreview: StoryObj = {
  decorators: [moduleMetadata({ imports: [SignaturePadImagePreviewExample] })],
  render: () => ({ template: '<signature-pad-image-preview-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [SignaturePadRootProviderExample] })],
  render: () => ({ template: '<signature-pad-root-provider-example />' }),
}
