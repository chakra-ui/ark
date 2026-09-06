import type { Meta } from '@storybook/vue3-vite'
import DynamicSizeExample from './examples/dynamic-size.vue'
import GridExample from './examples/grid.vue'
import HorizontalExample from './examples/horizontal.vue'
import ListExample from './examples/list.vue'
import ScrollToIndexExample from './examples/scroll-to-index.vue'
import WindowExample from './examples/window.vue'

const meta: Meta = {
  title: 'Utilities / Virtualizer',
}

export default meta

const story = (Component: unknown) => ({
  render: () => ({
    components: { Component },
    template: '<Component />',
  }),
})

export const DynamicSize = story(DynamicSizeExample)
export const Grid = story(GridExample)
export const Horizontal = story(HorizontalExample)
export const List = story(ListExample)
export const ScrollToIndex = story(ScrollToIndexExample)
export const Window = story(WindowExample)
