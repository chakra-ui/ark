import type { Meta } from '@storybook/vue3-vite'

import AspectRatioExample from './examples/aspect-ratio.vue'
import BasicExample from './examples/basic.vue'
import CircleExample from './examples/circle.vue'
import ContextExample from './examples/context.vue'
import ControlledZoomExample from './examples/controlled-zoom.vue'
import EventsExample from './examples/events.vue'
import FixedExample from './examples/fixed.vue'
import FlipExample from './examples/flip.vue'
import CropPreviewExample from './examples/crop-preview.vue'
import InitialCropExample from './examples/initial-crop.vue'
import MinMaxSizeExample from './examples/min-max-size.vue'
import ResetExample from './examples/reset.vue'
import RootProviderExample from './examples/root-provider.vue'
import RotationExample from './examples/rotation.vue'
import ZoomLimitsExample from './examples/zoom-limits.vue'

const meta: Meta = {
  title: 'Components / Image Cropper',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const AspectRatio = {
  render: () => ({
    components: { Component: AspectRatioExample },
    template: '<Component />',
  }),
}

export const Circle = {
  render: () => ({
    components: { Component: CircleExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const ControlledZoom = {
  render: () => ({
    components: { Component: ControlledZoomExample },
    template: '<Component />',
  }),
}

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

export const Fixed = {
  render: () => ({
    components: { Component: FixedExample },
    template: '<Component />',
  }),
}

export const Flip = {
  render: () => ({
    components: { Component: FlipExample },
    template: '<Component />',
  }),
}

export const CropPreview = {
  render: () => ({
    components: { Component: CropPreviewExample },
    template: '<Component />',
  }),
}

export const InitialCrop = {
  render: () => ({
    components: { Component: InitialCropExample },
    template: '<Component />',
  }),
}

export const MinMaxSize = {
  render: () => ({
    components: { Component: MinMaxSizeExample },
    template: '<Component />',
  }),
}

export const Reset = {
  render: () => ({
    components: { Component: ResetExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Rotation = {
  render: () => ({
    components: { Component: RotationExample },
    template: '<Component />',
  }),
}

export const ZoomLimits = {
  render: () => ({
    components: { Component: ZoomLimitsExample },
    template: '<Component />',
  }),
}
