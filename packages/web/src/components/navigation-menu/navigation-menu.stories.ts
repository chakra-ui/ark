import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/navigation-menu/basic.js'
import { mount as ViewportExample } from '../../../examples/navigation-menu/viewport.js'
import { mount as VerticalExample } from '../../../examples/navigation-menu/vertical.js'
import { mount as ControlledExample } from '../../../examples/navigation-menu/controlled.js'

const meta: Meta = { title: 'Components / Navigation Menu' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Viewport: StoryObj = { name: 'Viewport', render: renderExample(ViewportExample) }

export const Vertical: StoryObj = { name: 'Vertical', render: renderExample(VerticalExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }
