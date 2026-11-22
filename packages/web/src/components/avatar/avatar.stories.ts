import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AvatarStackExample } from './examples/avatar-stack.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as EventsExample } from './examples/events.js'

const meta: Meta = { title: 'Components / Avatar' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Events: StoryObj = { name: 'Events', render: renderExample(EventsExample) }

export const AvatarStack: StoryObj = { name: 'Avatar Stack', render: renderExample(AvatarStackExample) }
