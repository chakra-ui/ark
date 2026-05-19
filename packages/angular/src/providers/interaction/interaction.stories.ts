import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { InteractionFocusVisibleExample } from './examples/focus-visible'
import { InteractionFocusVisibleTextInputExample } from './examples/focus-visible-text-input'
import { InteractionInteractionExample } from './examples/interaction'

const meta: Meta = {
  title: 'Utilities / Interaction',
}

export default meta

export const InteractionModality: StoryObj = {
  decorators: [moduleMetadata({ imports: [InteractionInteractionExample] })],
  render: () => ({ template: '<interaction-interaction-example />' }),
}

export const FocusVisible: StoryObj = {
  decorators: [moduleMetadata({ imports: [InteractionFocusVisibleExample] })],
  render: () => ({ template: '<interaction-focus-visible-example />' }),
}

export const FocusVisibleTextInput: StoryObj = {
  decorators: [moduleMetadata({ imports: [InteractionFocusVisibleTextInputExample] })],
  render: () => ({ template: '<interaction-focus-visible-text-input-example />' }),
}
