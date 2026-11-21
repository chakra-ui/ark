import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as DynamicSizeExample } from '../../../examples/virtualizer/dynamic-size.js'
import { mount as GridExample } from '../../../examples/virtualizer/grid.js'
import { mount as ListExample } from '../../../examples/virtualizer/list.js'
import { mount as ScrollToIndexExample } from '../../../examples/virtualizer/scroll-to-index.js'
import { mount as WindowExample } from '../../../examples/virtualizer/window.js'

const meta: Meta = { title: 'Components / Virtualizer' }
export default meta

export const DynamicSize: StoryObj = { name: 'Dynamic Size', render: renderExample(DynamicSizeExample) }

export const Grid: StoryObj = { name: 'Grid', render: renderExample(GridExample) }

export const List: StoryObj = { name: 'List', render: renderExample(ListExample) }

export const ScrollToIndex: StoryObj = { name: 'Scroll To Index', render: renderExample(ScrollToIndexExample) }

export const Window: StoryObj = { name: 'Window', render: renderExample(WindowExample) }
