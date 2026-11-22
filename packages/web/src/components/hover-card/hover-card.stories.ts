import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as DelayExample } from './examples/delay.js'
import { mount as MultipleTriggersExample } from './examples/multiple-triggers.js'
import { mount as PositioningExample } from './examples/positioning.js'

const meta: Meta = { title: 'Components / Hover Card' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Delay: StoryObj = { name: 'Delay', render: renderExample(DelayExample) }

export const MultipleTriggers: StoryObj = { name: 'Multiple Triggers', render: renderExample(MultipleTriggersExample) }

export const Positioning: StoryObj = { name: 'Positioning', render: renderExample(PositioningExample) }
