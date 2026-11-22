import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AspectRatioExample } from './examples/aspect-ratio.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as CircleExample } from './examples/circle.js'
import { mount as ControlledZoomExample } from './examples/controlled-zoom.js'
import { mount as CropPreviewExample } from './examples/crop-preview.js'
import { mount as EventsExample } from './examples/events.js'
import { mount as FixedExample } from './examples/fixed.js'
import { mount as FlipExample } from './examples/flip.js'
import { mount as InitialCropExample } from './examples/initial-crop.js'
import { mount as MinMaxSizeExample } from './examples/min-max-size.js'
import { mount as ResetExample } from './examples/reset.js'
import { mount as RotationExample } from './examples/rotation.js'
import { mount as ZoomLimitsExample } from './examples/zoom-limits.js'

const meta: Meta = { title: 'Components / Image Cropper' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const AspectRatio: StoryObj = { name: 'Aspect Ratio', render: renderExample(AspectRatioExample) }

export const Circle: StoryObj = { name: 'Circle', render: renderExample(CircleExample) }

export const ControlledZoom: StoryObj = { name: 'Controlled Zoom', render: renderExample(ControlledZoomExample) }

export const CropPreview: StoryObj = { name: 'Crop Preview', render: renderExample(CropPreviewExample) }

export const Events: StoryObj = { name: 'Events', render: renderExample(EventsExample) }

export const Fixed: StoryObj = { name: 'Fixed', render: renderExample(FixedExample) }

export const Flip: StoryObj = { name: 'Flip', render: renderExample(FlipExample) }

export const InitialCrop: StoryObj = { name: 'Initial Crop', render: renderExample(InitialCropExample) }

export const MinMaxSize: StoryObj = { name: 'Min Max Size', render: renderExample(MinMaxSizeExample) }

export const Reset: StoryObj = { name: 'Reset', render: renderExample(ResetExample) }

export const Rotation: StoryObj = { name: 'Rotation', render: renderExample(RotationExample) }

export const ZoomLimits: StoryObj = { name: 'Zoom Limits', render: renderExample(ZoomLimitsExample) }
