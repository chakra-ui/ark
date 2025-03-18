import type { Meta } from '@storybook/vue3'

import AutoplayExample from './examples/autoplay.vue'
import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / Carousel',
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

export const Autoplay = {
  render: () => ({
    components: { AutoplayExample },
    template: '<AutoplayExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}