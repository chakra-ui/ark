import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import RenderFnExample from './examples/render-fn.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / Clipboard',
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