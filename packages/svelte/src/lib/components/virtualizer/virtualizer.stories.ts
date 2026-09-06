import type { Meta } from '@storybook/svelte'
import DynamicSizeExample from './examples/dynamic-size.svelte'
import GridExample from './examples/grid.svelte'
import HorizontalExample from './examples/horizontal.svelte'
import ListExample from './examples/list.svelte'
import ScrollToIndexExample from './examples/scroll-to-index.svelte'
import WindowExample from './examples/window.svelte'

const meta = {
  title: 'Utilities / Virtualizer',
} as Meta

export default meta

export const DynamicSize = { render: () => ({ Component: DynamicSizeExample }) }
export const Grid = { render: () => ({ Component: GridExample }) }
export const Horizontal = { render: () => ({ Component: HorizontalExample }) }
export const List = { render: () => ({ Component: ListExample }) }
export const ScrollToIndex = { render: () => ({ Component: ScrollToIndexExample }) }
export const Window = { render: () => ({ Component: WindowExample }) }
