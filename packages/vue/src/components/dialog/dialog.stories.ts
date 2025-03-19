import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import RenderFnExample from './examples/render-fn.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / Dialog',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
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

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}