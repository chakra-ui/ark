import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as DisabledExample } from './examples/disabled.js'
import { mount as NestedExample } from './examples/nested.js'
import { mount as VerticalExample } from './examples/vertical.js'

const meta: Meta = { title: 'Components / Menubar' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }

export const Vertical: StoryObj = { name: 'Vertical', render: renderExample(VerticalExample) }
