import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/splitter/basic.js'
import { mount as CollapsibleExample } from '../examples/splitter/collapsible.js'
import { mount as DynamicCollapsibleExample } from '../examples/splitter/dynamic-collapsible.js'
import { mount as MultiplePanelsExample } from '../examples/splitter/multiple-panels.js'
import { mount as NestedExample } from '../examples/splitter/nested.js'
import { mount as ResizeIndicatorExample } from '../examples/splitter/resize-indicator.js'
import { mount as VerticalExample } from '../examples/splitter/vertical.js'

const meta: Meta = { title: 'Components / Splitter' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Collapsible: StoryObj = { name: 'Collapsible', render: renderExample(CollapsibleExample) }

export const DynamicCollapsible: StoryObj = {
  name: 'Dynamic Collapsible',
  render: renderExample(DynamicCollapsibleExample),
}

export const MultiplePanels: StoryObj = { name: 'Multiple Panels', render: renderExample(MultiplePanelsExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }

export const ResizeIndicator: StoryObj = { name: 'Resize Indicator', render: renderExample(ResizeIndicatorExample) }

export const Vertical: StoryObj = { name: 'Vertical', render: renderExample(VerticalExample) }
