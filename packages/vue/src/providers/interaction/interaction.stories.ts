import type { Meta } from '@storybook/vue3-vite'

import InteractionModalityExample from './examples/interaction.vue'
import FocusVisibleExample from './examples/focus-visible.vue'
import FocusVisibleTextInputExample from './examples/focus-visible-text-input.vue'

const meta: Meta = {
  title: 'Providers / Interaction',
}

export default meta

export const InteractionModality = {
  render: () => ({
    components: { Component: InteractionModalityExample },
    template: '<Component />',
  }),
}

export const FocusVisible = {
  render: () => ({
    components: { Component: FocusVisibleExample },
    template: '<Component />',
  }),
}

export const FocusVisibleTextInput = {
  render: () => ({
    components: { Component: FocusVisibleTextInputExample },
    template: '<Component />',
  }),
}
