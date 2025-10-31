import type { Meta } from '@storybook/vue3-vite'

import AutofocusExample from './examples/autofocus.vue'
import BasicExample from './examples/basic.vue'
import InitialFocusExample from './examples/initial-focus.vue'

const meta: Meta = {
  title: 'Components / Focus Trap',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const InitialFocus = {
  render: () => ({
    components: { Component: InitialFocusExample },
    template: '<Component />',
  }),
}

export const Autofocus = {
  render: () => ({
    components: { Component: AutofocusExample },
    template: '<Component />',
  }),
}
