import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import CircleExample from './examples/circle.vue'
import ControlledExample from './examples/controlled.vue'
import FixedExample from './examples/fixed.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / Image Cropper',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Circle = {
  render: () => ({
    components: { Component: CircleExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Fixed = {
  render: () => ({
    components: { Component: FixedExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
