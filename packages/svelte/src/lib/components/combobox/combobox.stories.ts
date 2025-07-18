import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import CustomObjectExample from './examples/custom-object.svelte'
import DynamicExample from './examples/dynamic.svelte'
import GroupingExample from './examples/grouping.svelte'
import LinksExample from './examples/links.svelte'
import MultipleExample from './examples/multiple.svelte'
import RehydrateValueExample from './examples/rehydrate-value.svelte'
import RenderFnExample from './examples/render-fn.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldExample from './examples/with-field.svelte'
import WithHighlightExample from './examples/with-highlight.svelte'

const meta: Meta = {
  title: 'Components / Combobox',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Dynamic = {
  render: () => ({
    Component: DynamicExample,
  }),
}

export const RenderFn = {
  render: () => ({
    Component: RenderFnExample,
  }),
}

export const Grouping = {
  render: () => ({
    Component: GroupingExample,
  }),
}

export const Links = {
  render: () => ({
    Component: LinksExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const RehydrateValue = {
  render: () => ({
    Component: RehydrateValueExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}

export const Multiple = {
  render: () => ({
    Component: MultipleExample,
  }),
}

export const WithHighlight = {
  render: () => ({
    Component: WithHighlightExample,
  }),
}

export const CustomObject = {
  render: () => ({
    Component: CustomObjectExample,
  }),
}
