import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { FocusTrapAutofocusExample } from './examples/autofocus'
import { FocusTrapBasicExample } from './examples/basic'
import { FocusTrapInitialFocusExample } from './examples/initial-focus'

const meta: Meta = {
  title: 'Components / Focus Trap',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [FocusTrapBasicExample] })],
  render: () => ({ template: '<focus-trap-basic-example />' }),
}

export const InitialFocus: StoryObj = {
  decorators: [moduleMetadata({ imports: [FocusTrapInitialFocusExample] })],
  render: () => ({ template: '<focus-trap-initial-focus-example />' }),
}

export const Autofocus: StoryObj = {
  decorators: [moduleMetadata({ imports: [FocusTrapAutofocusExample] })],
  render: () => ({ template: '<focus-trap-autofocus-example />' }),
}
