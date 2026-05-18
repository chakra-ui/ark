import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { DialogAlertDialogExample } from './examples/alert-dialog'
import { DialogBasicExample } from './examples/basic'
import { DialogControlledExample } from './examples/controlled'
import { DialogDefaultOpenExample } from './examples/default-open'
import { DialogNonModalExample } from './examples/non-modal'
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

export const DefaultOpen: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogDefaultOpenExample] })],
  render: () => ({ template: '<dialog-default-open-example />' }),
}

export const NonModal: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogNonModalExample] })],
  render: () => ({ template: '<dialog-non-modal-example />' }),
}

export const AlertDialog: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogAlertDialogExample] })],
  render: () => ({ template: '<dialog-alert-dialog-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [DialogRootProviderExample] })],
  render: () => ({ template: '<dialog-root-provider-example />' }),
}
