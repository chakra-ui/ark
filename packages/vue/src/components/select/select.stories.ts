import type { Meta } from '@storybook/vue3-vite'

import AsyncExample from './examples/async.vue'
import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import DynamicItemsExample from './examples/dynamic-items.vue'
import FormLibraryExample from './examples/form-library.vue'
import GroupingExample from './examples/grouping.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import MaxSelectedExample from './examples/max-selected.vue'
import MultipleExample from './examples/multiple.vue'
import ReactiveCollectionExample from './examples/reactive-collection.vue'
import RootProviderExample from './examples/root-provider.vue'
import SelectAllExample from './examples/select-all.vue'
import SelectOnHighlightExample from './examples/select-on-highlight.vue'
import ShadowRootExample from './examples/shadow-root.vue'
import WithFieldExample from './examples/with-field.vue'

const meta: Meta = {
  title: 'Components / Select',
}

export default meta

export const Async = {
  render: () => ({
    components: { Component: AsyncExample },
    template: '<Component />',
  }),
}

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const DynamicItems = {
  render: () => ({
    components: { Component: DynamicItemsExample },
    template: '<Component />',
  }),
}

export const FormLibrary = {
  render: () => ({
    components: { Component: FormLibraryExample },
    template: '<Component />',
  }),
}

export const Grouping = {
  render: () => ({
    components: { Component: GroupingExample },
    template: '<Component />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { Component: LazyMountExample },
    template: '<Component />',
  }),
}

export const MaxSelected = {
  render: () => ({
    components: { Component: MaxSelectedExample },
    template: '<Component />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { Component: MultipleExample },
    template: '<Component />',
  }),
}

export const ReactiveCollection = {
  render: () => ({
    components: { Component: ReactiveCollectionExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const SelectAll = {
  render: () => ({
    components: { Component: SelectAllExample },
    template: '<Component />',
  }),
}

export const SelectOnHighlight = {
  render: () => ({
    components: { Component: SelectOnHighlightExample },
    template: '<Component />',
  }),
}

export const ShadowRoot = {
  render: () => ({
    components: { Component: ShadowRootExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}
