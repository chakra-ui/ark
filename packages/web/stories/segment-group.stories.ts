import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/segment-group/basic.js'
import { mount as ConditionalExample } from '../examples/segment-group/conditional.js'
import { mount as ControlledExample } from '../examples/segment-group/controlled.js'
import { mount as DisabledExample } from '../examples/segment-group/disabled.js'

const meta: Meta = { title: 'Components / Segment Group' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const Conditional: StoryObj = { name: 'Conditional', render: renderExample(ConditionalExample) }
