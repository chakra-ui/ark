import './index.js'

import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as BothDirectionsExample } from './examples/both-directions.js'
import { mount as HorizontalExample } from './examples/horizontal.js'
import { mount as NestedExample } from './examples/nested.js'

const meta: Meta = { title: 'Components / Scroll Area' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const BothDirections: StoryObj = { name: 'Both Directions', render: renderExample(BothDirectionsExample) }

export const Horizontal: StoryObj = { name: 'Horizontal', render: renderExample(HorizontalExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }
