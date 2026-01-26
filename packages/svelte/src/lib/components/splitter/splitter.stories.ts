import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import CollapsibleExample from './examples/collapsible.svelte'
import ContextExample from './examples/context.svelte'
import MultiplePanelsExample from './examples/multiple-panels.svelte'
import ResizeIndicatorExample from './examples/resize-indicator.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import VerticalExample from './examples/vertical.svelte'

const meta: Meta = {
  title: 'Components/Splitter',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Vertical = {
  render: () => ({
    Component: VerticalExample,
  }),
}

export const MultiplePanels = {
  render: () => ({
    Component: MultiplePanelsExample,
  }),
}

export const Collapsible = {
  render: () => ({
    Component: CollapsibleExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const ResizeIndicator = {
  render: () => ({
    Component: ResizeIndicatorExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
