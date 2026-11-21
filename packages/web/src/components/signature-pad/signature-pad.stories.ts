import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/signature-pad/basic.js'
import { mount as ControlledExample } from '../../../examples/signature-pad/controlled.js'
import { mount as ImagePreviewExample } from '../../../examples/signature-pad/image-preview.js'

const meta: Meta = { title: 'Components / Signature Pad' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const ImagePreview: StoryObj = { name: 'Image Preview', render: renderExample(ImagePreviewExample) }
