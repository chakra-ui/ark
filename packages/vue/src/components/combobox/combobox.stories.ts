import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import CreatableExample from './examples/creatable.vue'
import CustomObjectExample from './examples/custom-object.vue'
import DynamicExample from './examples/dynamic.vue'
import GroupingExample from './examples/grouping.vue'
import LinksExample from './examples/links.vue'
import MultipleExample from './examples/multiple.vue'
import RenderFnExample from './examples/render-fn.vue'
import RehydrateValueExample from './examples/rehydrate-value.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'
import WithHighlightExample from './examples/with-highlight.vue'

const meta: Meta = {
  title: 'Components / Combobox',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Grouping = {
  render: () => ({
    components: { Component: GroupingExample },
    template: '<Component />',
  }),
}

export const Links = {
  render: () => ({
    components: { Component: LinksExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Creatable = {
  render: () => ({
    components: { Component: CreatableExample },
    template: '<Component />',
  }),
}

export const Dynamic = {
  render: () => ({
    components: { Component: DynamicExample },
    template: '<Component />',
  }),
}

export const RenderFunction = {
  render: () => ({
    components: { Component: RenderFnExample },
    template: '<Component />',
  }),
}

export const RehydrateValue = {
  render: () => ({
    components: { Component: RehydrateValueExample },
    template: '<Component />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { Component: MultipleExample },
    template: '<Component />',
  }),
}

export const WithHighlight = {
  render: () => ({
    components: { Component: WithHighlightExample },
    template: '<Component />',
  }),
}

export const CustomObject = {
  render: () => ({
    components: { Component: CustomObjectExample },
    template: '<Component />',
  }),
}
