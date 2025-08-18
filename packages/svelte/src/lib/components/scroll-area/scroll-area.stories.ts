import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import BothDirectionsExample from './examples/both-directions.svelte'
import ContextExample from './examples/context.svelte'
import HorizontalExample from './examples/horizontal.svelte'
import NestedExample from './examples/nested.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components / Scroll Area',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const BothDirections = {
  render: () => ({
    Component: BothDirectionsExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const Horizontal = {
  render: () => ({
    Component: HorizontalExample,
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
