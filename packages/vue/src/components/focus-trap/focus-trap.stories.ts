import type { Meta } from '@storybook/vue3'

import AutofocusExample from './examples/autofocus.vue'
import BasicExample from './examples/basic.vue'
import InitialFocusExample from './examples/initial-focus.vue'

const meta = {
  title: 'Components / Focus Trap',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const InitialFocus = {
  render: () => ({
    components: { InitialFocusExample },
    template: '<InitialFocusExample />',
  }),
}

export const Autofocus = {
  render: () => ({
    components: { AutofocusExample },
    template: '<AutofocusExample />',
  }),
}