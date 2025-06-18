import type { Meta } from '@storybook/vue3'

import AnchorPositionExample from './examples/anchor-position.vue'
import BasicExample from './examples/basic.vue'
import ControlledOpenExample from './examples/controlled-open.vue'
import ControlledPositionExample from './examples/controlled-position.vue'
import ControlledSizeExample from './examples/controlled-size.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import RenderFnExample from './examples/render-fn.vue'

const meta = {
  title: 'Components / Floating Panel',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const AnchorPosition = {
  render: () => ({
    components: { AnchorPositionExample },
    template: '<AnchorPositionExample />',
  }),
}

export const ControlledPosition = {
  render: () => ({
    components: { ControlledPositionExample },
    template: '<ControlledPositionExample />',
  }),
}

export const ControlledOpen = {
  render: () => ({
    components: { ControlledOpenExample },
    template: '<ControlledOpenExample />',
  }),
}

export const ControlledSize = {
  render: () => ({
    components: { ControlledSizeExample },
    template: '<ControlledSizeExample />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { LazyMountExample },
    template: '<LazyMountExample />',
  }),
}

export const RenderFn = {
  render: () => ({
    components: { RenderFnExample },
    template: '<RenderFnExample />',
  }),
}
