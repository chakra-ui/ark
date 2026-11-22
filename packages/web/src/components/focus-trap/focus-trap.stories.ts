import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AutofocusExample } from './examples/autofocus.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as InitialFocusExample } from './examples/initial-focus.js'

const meta: Meta = { title: 'Utilities / Focus Trap' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const InitialFocus: StoryObj = { name: 'Initial Focus', render: renderExample(InitialFocusExample) }

export const Autofocus: StoryObj = { name: 'Autofocus', render: renderExample(AutofocusExample) }
