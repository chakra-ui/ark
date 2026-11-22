import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as CopyStatusExample } from './examples/copy-status.js'
import { mount as TimeoutExample } from './examples/timeout.js'
import { mount as ValueTextExample } from './examples/value-text.js'

const meta: Meta = { title: 'Components / Clipboard' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const CopyStatus: StoryObj = { name: 'Copy Status', render: renderExample(CopyStatusExample) }

export const Timeout: StoryObj = { name: 'Timeout', render: renderExample(TimeoutExample) }

export const ValueText: StoryObj = { name: 'Value Text', render: renderExample(ValueTextExample) }
