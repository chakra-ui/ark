import type { Meta } from '@storybook/svelte'
import AspectRatioExample from './examples/aspect-ratio.svelte'
import BasicExample from './examples/basic.svelte'
import CircleExample from './examples/circle.svelte'
import ContextExample from './examples/context.svelte'
import ControlledZoomExample from './examples/controlled-zoom.svelte'
import EventsExample from './examples/events.svelte'
import FixedExample from './examples/fixed.svelte'
import FlipExample from './examples/flip.svelte'
import CropPreviewExample from './examples/crop-preview.svelte'
import InitialCropExample from './examples/initial-crop.svelte'
import MinMaxSizeExample from './examples/min-max-size.svelte'
import ResetExample from './examples/reset.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import RotationExample from './examples/rotation.svelte'
import ZoomLimitsExample from './examples/zoom-limits.svelte'

const meta: Meta = {
  title: 'Components / Image Cropper',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const AspectRatio = {
  render: () => ({
    Component: AspectRatioExample,
  }),
}

export const Circle = {
  render: () => ({
    Component: CircleExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const ControlledZoom = {
  render: () => ({
    Component: ControlledZoomExample,
  }),
}

export const Events = {
  render: () => ({
    Component: EventsExample,
  }),
}

export const Fixed = {
  render: () => ({
    Component: FixedExample,
  }),
}

export const Flip = {
  render: () => ({
    Component: FlipExample,
  }),
}

export const CropPreview = {
  render: () => ({
    Component: CropPreviewExample,
  }),
}

export const InitialCrop = {
  render: () => ({
    Component: InitialCropExample,
  }),
}

export const MinMaxSize = {
  render: () => ({
    Component: MinMaxSizeExample,
  }),
}

export const Reset = {
  render: () => ({
    Component: ResetExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Rotation = {
  render: () => ({
    Component: RotationExample,
  }),
}

export const ZoomLimits = {
  render: () => ({
    Component: ZoomLimitsExample,
  }),
}
