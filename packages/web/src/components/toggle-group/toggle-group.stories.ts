import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as MultipleExample } from './examples/multiple.js'
import { mount as WithTooltipExample } from './examples/with-tooltip.js'

const meta: Meta = { title: 'Components / Toggle Group' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Multiple: StoryObj = { name: 'Multiple', render: renderExample(MultipleExample) }

export const WithTooltip: StoryObj = { name: 'With Tooltip', render: renderExample(WithTooltipExample) }
