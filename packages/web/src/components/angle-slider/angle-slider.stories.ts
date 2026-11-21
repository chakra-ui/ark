import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/angle-slider/basic.js'
import { mount as ControlledExample } from '../../../examples/angle-slider/controlled.js'
import { mount as DisabledExample } from '../../../examples/angle-slider/disabled.js'
import { mount as StepExample } from '../../../examples/angle-slider/step.js'

const meta: Meta = { title: 'Components / Angle Slider' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const Step: StoryObj = { name: 'Step', render: renderExample(StepExample) }
