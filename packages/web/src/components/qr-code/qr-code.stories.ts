import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/qr-code/basic.js'
import { mount as ControlledExample } from '../../../examples/qr-code/controlled.js'
import { mount as DownloadExample } from '../../../examples/qr-code/download.js'
import { mount as ErrorCorrectionExample } from '../../../examples/qr-code/error-correction.js'
import { mount as FillExample } from '../../../examples/qr-code/fill.js'
import { mount as OverlayExample } from '../../../examples/qr-code/overlay.js'

const meta: Meta = { title: 'Components / QR Code' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Download: StoryObj = { name: 'Download', render: renderExample(DownloadExample) }

export const ErrorCorrection: StoryObj = { name: 'Error Correction', render: renderExample(ErrorCorrectionExample) }

export const Fill: StoryObj = { name: 'Fill', render: renderExample(FillExample) }

export const Overlay: StoryObj = { name: 'Overlay', render: renderExample(OverlayExample) }
