import type { Meta } from '@storybook/vue3-vite'

import AnchorPositionExample from './examples/anchor-position.vue'
import BasicExample from './examples/basic.vue'
import ContextExample from './examples/context.vue'
import ControlledOpenExample from './examples/controlled-open.vue'
import ControlledPositionExample from './examples/controlled-position.vue'
import ControlledSizeExample from './examples/controlled-size.vue'
import LazyMountExample from './examples/lazy-mount.vue'

const meta: Meta = {
  title: 'Components / Floating Panel',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const AnchorPosition = {
  render: () => ({
    components: { Component: AnchorPositionExample },
    template: '<Component />',
  }),
}

export const ControlledPosition = {
  render: () => ({
    components: { Component: ControlledPositionExample },
    template: '<Component />',
  }),
}

export const ControlledOpen = {
  render: () => ({
    components: { Component: ControlledOpenExample },
    template: '<Component />',
  }),
}

export const ControlledSize = {
  render: () => ({
    components: { Component: ControlledSizeExample },
    template: '<Component />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { Component: LazyMountExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}
