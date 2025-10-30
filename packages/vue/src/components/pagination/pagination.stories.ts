import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ContextExample from './examples/context.vue'
import ControlledExample from './examples/controlled.vue'
import CustomizedExample from './examples/customized.vue'
import DataSlicingExample from './examples/data-slicing.vue'
import LinkExample from './examples/link.vue'
import PageRangeExample from './examples/page-range.vue'
import PageSizeControlExample from './examples/page-size-control.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / Pagination',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Customized = {
  render: () => ({
    components: { Component: CustomizedExample },
    template: '<Component />',
  }),
}

export const DataSlicing = {
  render: () => ({
    components: { Component: DataSlicingExample },
    template: '<Component />',
  }),
}

export const Link = {
  render: () => ({
    components: { Component: LinkExample },
    template: '<Component />',
  }),
}

export const PageRange = {
  render: () => ({
    components: { Component: PageRangeExample },
    template: '<Component />',
  }),
}

export const PageSizeControl = {
  render: () => ({
    components: { Component: PageSizeControlExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
