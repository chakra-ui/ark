import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ImageCropperBasicExample } from './examples/basic'
import { ImageCropperControlledExample } from './examples/controlled'
import { ImageCropperRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Image Cropper',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperBasicExample] })],
  render: () => ({ template: '<image-cropper-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperControlledExample] })],
  render: () => ({ template: '<image-cropper-controlled-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperRootProviderExample] })],
  render: () => ({ template: '<image-cropper-root-provider-example />' }),
}
