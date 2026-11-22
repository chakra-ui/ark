import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'

const meta: Meta = { title: 'Utilities / Locale' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }
