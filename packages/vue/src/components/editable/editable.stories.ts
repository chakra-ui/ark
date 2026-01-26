import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ContextExample from './examples/context.vue'
import ControlledExample from './examples/controlled.vue'
import ControlsExample from './examples/controls.vue'
import DoubleClickExample from './examples/double-click.vue'
import RootProviderExample from './examples/root-provider.vue'
import TextareaExample from './examples/textarea.vue'
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

export const Controls = {
  render: () => ({
    components: { Component: ControlsExample },
    template: '<Component />',
  }),
}

export const DoubleClick = {
  render: () => ({
    components: { Component: DoubleClickExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Textarea = {
  render: () => ({
    components: { Component: TextareaExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}
