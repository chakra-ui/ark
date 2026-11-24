import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as DynamicSizeExample } from './examples/dynamic-size.js'
import { mount as GridExample } from './examples/grid.js'
import { mount as InfiniteLoadingExample } from './examples/infinite-loading.js'
import { mount as ListExample } from './examples/list.js'
import { mount as ScrollToIndexExample } from './examples/scroll-to-index.js'
import { mount as WindowExample } from './examples/window.js'

const meta: Meta = { title: 'Components / Virtualizer' }
export default meta

export const DynamicSize: StoryObj = { name: 'Dynamic Size', render: renderExample(DynamicSizeExample) }

export const Grid: StoryObj = { name: 'Grid', render: renderExample(GridExample) }

export const InfiniteLoading: StoryObj = { name: 'Infinite Loading', render: renderExample(InfiniteLoadingExample) }

export const List: StoryObj = { name: 'List', render: renderExample(ListExample) }

export const ScrollToIndex: StoryObj = { name: 'Scroll To Index', render: renderExample(ScrollToIndexExample) }

export const Window: StoryObj = { name: 'Window', render: renderExample(WindowExample) }
