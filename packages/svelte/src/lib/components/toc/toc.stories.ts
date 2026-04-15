import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import WithIndicatorExample from './examples/with-indicator.svelte'
import GroupedExample from './examples/grouped.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithNumbersExample from './examples/with-numbers.svelte'
import NestedExample from './examples/nested.svelte'
import WithHoverExample from './examples/with-hover.svelte'
import WithTreeViewExample from './examples/with-tree-view.svelte'
import WithCollapsibleExample from './examples/with-collapsible.svelte'

const meta: Meta = {
  title: 'Components / Toc',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Grouped = {
  render: () => ({
    Component: GroupedExample,
  }),
}

export const Nested = {
  render: () => ({
    Component: NestedExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithCollapsible = {
  render: () => ({
    Component: WithCollapsibleExample,
  }),
}

export const WithHover = {
  render: () => ({
    Component: WithHoverExample,
  }),
}

export const WithIndicator = {
  render: () => ({
    Component: WithIndicatorExample,
  }),
}

export const WithNumbers = {
  render: () => ({
    Component: WithNumbersExample,
  }),
}

export const WithTreeView = {
  render: () => ({
    Component: WithTreeViewExample,
  }),
}
