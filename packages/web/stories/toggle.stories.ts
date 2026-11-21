import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/toggle/basic.js'
import { mount as ControlledExample } from '../examples/toggle/controlled.js'
import { mount as DisabledExample } from '../examples/toggle/disabled.js'
import { mount as IndicatorExample } from '../examples/toggle/indicator.js'

const meta: Meta = { title: 'Components / Toggle' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const Indicator: StoryObj = { name: 'Indicator', render: renderExample(IndicatorExample) }
