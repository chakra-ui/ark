import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { DialogAlertDialogExample } from './examples/alert-dialog'
import { DialogBasicExample } from './examples/basic'
import { DialogConfirmationExample } from './examples/confirmation'
import { DialogContextExample } from './examples/context'
import { DialogControlledExample } from './examples/controlled'
import { DialogDefaultOpenExample } from './examples/default-open'
import { DialogFinalFocusExample } from './examples/final-focus'
import { DialogInitialFocusExample } from './examples/initial-focus'
import { DialogInsideScrollExample } from './examples/inside-scroll'
import { DialogLazyMountExample } from './examples/lazy-mount'
import { DialogMultipleTriggersExample } from './examples/multiple-triggers'
import { DialogNestedExample } from './examples/nested'
import { DialogNonModalExample } from './examples/non-modal'
import { DialogOutsideScrollExample } from './examples/outside-scroll'
import { DialogRapidStateChangeExample } from './examples/rapid-state-change'
import { DialogRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Dialog',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogBasicExample] })],
  render: () => ({ template: '<dialog-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogControlledExample] })],
  render: () => ({ template: '<dialog-controlled-example />' }),
}

export const Confirmation: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogConfirmationExample] })],
  render: () => ({ template: '<dialog-confirmation-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogContextExample] })],
  render: () => ({ template: '<dialog-context-example />' }),
}

export const DefaultOpen: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogDefaultOpenExample] })],
  render: () => ({ template: '<dialog-default-open-example />' }),
}

export const FinalFocus: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogFinalFocusExample] })],
  render: () => ({ template: '<dialog-final-focus-example />' }),
}

export const InitialFocus: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogInitialFocusExample] })],
  render: () => ({ template: '<dialog-initial-focus-example />' }),
}

export const InsideScroll: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogInsideScrollExample] })],
  render: () => ({ template: '<dialog-inside-scroll-example />' }),
}

export const LazyMount: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogLazyMountExample] })],
  render: () => ({ template: '<dialog-lazy-mount-example />' }),
}

export const MultipleTriggers: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogMultipleTriggersExample] })],
  render: () => ({ template: '<dialog-multiple-triggers-example />' }),
}

export const Nested: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogNestedExample] })],
  render: () => ({ template: '<dialog-nested-example />' }),
}

export const NonModal: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogNonModalExample] })],
  render: () => ({ template: '<dialog-non-modal-example />' }),
}

export const OutsideScroll: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogOutsideScrollExample] })],
  render: () => ({ template: '<dialog-outside-scroll-example />' }),
}

export const RapidStateChange: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogRapidStateChangeExample] })],
  render: () => ({ template: '<dialog-rapid-state-change-example />' }),
}

export const AlertDialog: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogAlertDialogExample] })],
  render: () => ({ template: '<dialog-alert-dialog-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogRootProviderExample] })],
  render: () => ({ template: '<dialog-root-provider-example />' }),
}
