import type { Meta } from '@storybook/vue3-vite'

import ArrayDataExample from './examples/array-data.vue'
import BasicExample from './examples/basic.vue'
import ErrorsExample from './examples/errors.vue'
import ExpandLevelExample from './examples/expand-level.vue'
import FunctionsExample from './examples/functions.vue'
import MapAndSetExample from './examples/map-and-set.vue'
import RegexExample from './examples/regex.vue'
import RenderValueExample from './examples/render-value.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Utilities / JsonTreeView',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const ArrayData = {
  render: () => ({
    components: { Component: ArrayDataExample },
    template: '<Component />',
  }),
}

export const MapAndSet = {
  render: () => ({
    components: { Component: MapAndSetExample },
    template: '<Component />',
  }),
}

export const Regex = {
  render: () => ({
    components: { Component: RegexExample },
    template: '<Component />',
  }),
}

export const Functions = {
  render: () => ({
    components: { Component: FunctionsExample },
    template: '<Component />',
  }),
}

export const ExpandLevel = {
  render: () => ({
    components: { Component: ExpandLevelExample },
    template: '<Component />',
  }),
}

export const RenderValue = {
  render: () => ({
    components: { Component: RenderValueExample },
    template: '<Component />',
  }),
}

export const Errors = {
  render: () => ({
    components: { Component: ErrorsExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
