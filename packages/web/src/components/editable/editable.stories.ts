import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/editable/basic.js'
import { mount as ControlledExample } from '../../../examples/editable/controlled.js'
import { mount as ControlsExample } from '../../../examples/editable/controls.js'
import { mount as DoubleClickExample } from '../../../examples/editable/double-click.js'
import { mount as TextareaExample } from '../../../examples/editable/textarea.js'

const meta: Meta = { title: 'Components / Editable' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Controls: StoryObj = { name: 'Controls', render: renderExample(ControlsExample) }

export const DoubleClick: StoryObj = { name: 'Double Click', render: renderExample(DoubleClickExample) }

export const Textarea: StoryObj = { name: 'Textarea', render: renderExample(TextareaExample) }
