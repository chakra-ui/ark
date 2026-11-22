import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as NestedExample } from './examples/nested.js'
import { mount as WithIndicatorExample } from './examples/with-indicator.js'
import { mount as ActiveChangeExample } from './examples/active-change.js'

const meta: Meta = { title: 'Components / Toc' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }

export const WithIndicator: StoryObj = { name: 'With Indicator', render: renderExample(WithIndicatorExample) }

export const ActiveChange: StoryObj = { name: 'Active Change', render: renderExample(ActiveChangeExample) }
