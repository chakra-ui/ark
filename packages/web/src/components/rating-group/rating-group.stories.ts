import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/rating-group/basic.js'
import { mount as ControlledExample } from '../../../examples/rating-group/controlled.js'
import { mount as DisabledExample } from '../../../examples/rating-group/disabled.js'
import { mount as FormUsageExample } from '../../../examples/rating-group/form-usage.js'
import { mount as HalfStarExample } from '../../../examples/rating-group/half-star.js'

const meta: Meta = { title: 'Components / Rating Group' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const FormUsage: StoryObj = { name: 'Form Usage', render: renderExample(FormUsageExample) }

export const HalfStar: StoryObj = { name: 'Half Star', render: renderExample(HalfStarExample) }
