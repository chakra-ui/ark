import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import CustomizedExample from './examples/customized.svelte'
import DataSlicingExample from './examples/data-slicing.svelte'
import LinkExample from './examples/link.svelte'
import PageRangeExample from './examples/page-range.svelte'
import PageSizeControlExample from './examples/page-size-control.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithEdgesExample from './examples/with-edges.svelte'

const meta: Meta = {
  title: 'Components / Pagination',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Customized = {
  render: () => ({
    Component: CustomizedExample,
  }),
}

export const DataSlicing = {
  render: () => ({
    Component: DataSlicingExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithEdges = {
  render: () => ({
    Component: WithEdgesExample,
  }),
}

export const Link = {
  render: () => ({
    Component: LinkExample,
  }),
}

export const PageRange = {
  render: () => ({
    Component: PageRangeExample,
  }),
}

export const PageSizeControl = {
  render: () => ({
    Component: PageSizeControlExample,
  }),
}
