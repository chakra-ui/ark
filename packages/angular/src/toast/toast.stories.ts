import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ToastActionExample } from './examples/action'
import { ToastBasicExample } from './examples/basic'
import { ToastDurationExample } from './examples/duration'
import { ToastMaxToastsExample } from './examples/max-toasts'
import { ToastPlacementExample } from './examples/placement'
import { ToastPromiseExample } from './examples/promise-toast'
import { ToastTypesExample } from './examples/types'
import { ToastUpdateExample } from './examples/update'
import { ToastVaryingHeightExample } from './examples/varying-height'

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

export const PromiseToast: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastPromiseExample] })],
  render: () => ({ template: '<toast-promise-example />' }),
}

export const Types: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastTypesExample] })],
  render: () => ({ template: '<toast-types-example />' }),
}

export const Update: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastUpdateExample] })],
  render: () => ({ template: '<toast-update-example />' }),
}

export const VaryingHeight: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToastVaryingHeightExample] })],
  render: () => ({ template: '<toast-varying-height-example />' }),
}
