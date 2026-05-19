import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ClipboardBasicExample } from './examples/basic'
import { ClipboardControlledExample } from './examples/controlled'
import { ClipboardRootProviderExample } from './examples/root-provider'
import { ClipboardWithTriggerExample } from './examples/with-trigger'

const meta: Meta = {
  title: 'Components / Clipboard',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardBasicExample] })],
  render: () => ({ template: '<clipboard-basic-example />' }),
}

export const WithTrigger: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardWithTriggerExample] })],
  render: () => ({ template: '<clipboard-with-trigger-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardControlledExample] })],
  render: () => ({ template: '<clipboard-controlled-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardRootProviderExample] })],
  render: () => ({ template: '<clipboard-root-provider-example />' }),
}
