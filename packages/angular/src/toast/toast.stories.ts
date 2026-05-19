import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ToastActionExample } from './examples/action'
import { ToastBasicExample } from './examples/basic'
import { ToastDurationExample } from './examples/duration'
import { ToastMaxToastsExample } from './examples/max-toasts'
import { ToastPlacementExample } from './examples/placement'
import { ToastUpdateExample } from './examples/update'

const meta: Meta = {
  title: 'Components / Toast',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastBasicExample] })],
  render: () => ({ template: '<toast-basic-example />' }),
}

export const Action: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastActionExample] })],
  render: () => ({ template: '<toast-action-example />' }),
}

export const Duration: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastDurationExample] })],
  render: () => ({ template: '<toast-duration-example />' }),
}

export const MaxToasts: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastMaxToastsExample] })],
  render: () => ({ template: '<toast-max-toasts-example />' }),
}

export const Placement: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastPlacementExample] })],
  render: () => ({ template: '<toast-placement-example />' }),
}

export const Update: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastUpdateExample] })],
  render: () => ({ template: '<toast-update-example />' }),
}
