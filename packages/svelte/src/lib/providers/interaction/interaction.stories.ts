import type { Meta } from '@storybook/svelte'
import InteractionModalityExample from './examples/interaction.svelte'
import FocusVisibleExample from './examples/focus-visible.svelte'
import FocusVisibleTextInputExample from './examples/focus-visible-text-input.svelte'

const meta = {
  title: 'Utilities / Interaction',
} as Meta

export default meta

export const InteractionModality = {
  render: () => ({
    Component: InteractionModalityExample,
  }),
}

export const FocusVisible = {
  render: () => ({
    Component: FocusVisibleExample,
  }),
}

export const FocusVisibleTextInput = {
  render: () => ({
    Component: FocusVisibleTextInputExample,
  }),
}
