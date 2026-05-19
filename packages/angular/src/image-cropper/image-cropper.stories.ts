import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ImageCropperAspectRatioExample } from './examples/aspect-ratio'
import { ImageCropperBasicExample } from './examples/basic'
import { ImageCropperCircleExample } from './examples/circle'
import { ImageCropperContextExample } from './examples/context'
import { ImageCropperControlledExample } from './examples/controlled'
import { ImageCropperControlledZoomExample } from './examples/controlled-zoom'
import { ImageCropperCropPreviewExample } from './examples/crop-preview'
import { ImageCropperEventsExample } from './examples/events'
import { ImageCropperFixedExample } from './examples/fixed'
import { ImageCropperFlipExample } from './examples/flip'
import { ImageCropperInitialCropExample } from './examples/initial-crop'
import { ImageCropperMinMaxSizeExample } from './examples/min-max-size'
import { ImageCropperResetExample } from './examples/reset'
import { ImageCropperRotationExample } from './examples/rotation'
import { ImageCropperRootProviderExample } from './examples/root-provider'
import { ImageCropperZoomLimitsExample } from './examples/zoom-limits'

const meta: Meta = {
  title: 'Components / Image Cropper',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperBasicExample] })],
  render: () => ({ template: '<image-cropper-basic-example />' }),
}

export const AspectRatio: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperAspectRatioExample] })],
  render: () => ({ template: '<image-cropper-aspect-ratio-example />' }),
}

export const Circle: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperCircleExample] })],
  render: () => ({ template: '<image-cropper-circle-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperContextExample] })],
  render: () => ({ template: '<image-cropper-context-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperControlledExample] })],
  render: () => ({ template: '<image-cropper-controlled-example />' }),
}

export const ControlledZoom: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperControlledZoomExample] })],
  render: () => ({ template: '<image-cropper-controlled-zoom-example />' }),
}

export const Events: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperEventsExample] })],
  render: () => ({ template: '<image-cropper-events-example />' }),
}

export const Fixed: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperFixedExample] })],
  render: () => ({ template: '<image-cropper-fixed-example />' }),
}

export const Flip: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperFlipExample] })],
  render: () => ({ template: '<image-cropper-flip-example />' }),
}

export const CropPreview: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperCropPreviewExample] })],
  render: () => ({ template: '<image-cropper-crop-preview-example />' }),
}

export const InitialCrop: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperInitialCropExample] })],
  render: () => ({ template: '<image-cropper-initial-crop-example />' }),
}

export const MinMaxSize: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperMinMaxSizeExample] })],
  render: () => ({ template: '<image-cropper-min-max-size-example />' }),
}

export const Reset: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperResetExample] })],
  render: () => ({ template: '<image-cropper-reset-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperRootProviderExample] })],
  render: () => ({ template: '<image-cropper-root-provider-example />' }),
}

export const Rotation: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperRotationExample] })],
  render: () => ({ template: '<image-cropper-rotation-example />' }),
}

export const ZoomLimits: StoryObj = {
  decorators: [moduleMetadata({ imports: [ImageCropperZoomLimitsExample] })],
  render: () => ({ template: '<image-cropper-zoom-limits-example />' }),
}
