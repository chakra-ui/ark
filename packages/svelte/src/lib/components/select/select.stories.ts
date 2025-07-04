import type { Meta } from '@storybook/svelte'

import AsyncExample from './examples/async.svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import FormLibraryExample from './examples/form-library.svelte'
import GroupingExample from './examples/grouping.svelte'
import MaxSelectedExample from './examples/max-selected.svelte'
import MultipleExample from './examples/multiple.svelte'
import ReactiveCollectionExample from './examples/reactive-collection.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import SelectOnHighlightExample from './examples/select-on-highlight.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components/Select',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Async = {
  render: () => ({
    Component: AsyncExample,
  }),
}

export const Grouping = {
  render: () => ({
    Component: GroupingExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const Multiple = {
  render: () => ({
    Component: MultipleExample,
  }),
}

export const ReactiveCollection = {
  render: () => ({
    Component: ReactiveCollectionExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
    props: {
      invalid: true,
    },
  }),
}

export const FormLibrary = {
  render: () => ({
    Component: FormLibraryExample,
  }),
}

export const SelectOnHighlight = {
  render: () => ({
    Component: SelectOnHighlightExample,
  }),
}

export const MaxSelected = {
  render: () => ({
    Component: MaxSelectedExample,
  }),
}
