import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as NestedExample } from './examples/nested.js'
import { mount as WithIndicatorExample } from './examples/with-indicator.js'
import { mount as ActiveChangeExample } from './examples/active-change.js'

import { mount as WithCollapsibleExample } from './examples/with-collapsible.js'
import { mount as WithHoverExample } from './examples/with-hover.js'
import { mount as WithRailExample } from './examples/with-rail.js'
import { mount as WithSelectExample } from './examples/with-select.js'
import { mount as WithTreeViewExample } from './examples/with-tree-view.js'
const meta: Meta = { title: 'Components / Toc' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }

export const WithIndicator: StoryObj = { name: 'With Indicator', render: renderExample(WithIndicatorExample) }

export const ActiveChange: StoryObj = { name: 'Active Change', render: renderExample(ActiveChangeExample) }

export const WithCollapsible: StoryObj = { name: 'With Collapsible', render: renderExample(WithCollapsibleExample) }

export const WithHover: StoryObj = { name: 'With Hover', render: renderExample(WithHoverExample) }

export const WithRail: StoryObj = { name: 'With Rail', render: renderExample(WithRailExample) }

export const WithSelect: StoryObj = { name: 'With Select', render: renderExample(WithSelectExample) }

export const WithTreeView: StoryObj = { name: 'With Tree View', render: renderExample(WithTreeViewExample) }
