import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import CustomControlsExample from './examples/custom-controls.vue'
import RenderFnExample from './examples/render-fn.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

const meta: Meta = {
  title: 'Components / Editable',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const CustomControls = {
  render: () => ({
    components: { Component: CustomControlsExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const RenderFunction = {
  render: () => ({
    components: { Component: RenderFnExample },
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
