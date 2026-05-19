import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ClipboardBasicExample } from './examples/basic'
import { ClipboardContextExample } from './examples/context'
import { ClipboardControlledExample } from './examples/controlled'
import { ClipboardCopyStatusExample } from './examples/copy-status'
import { ClipboardRootProviderExample } from './examples/root-provider'
import { ClipboardTimeoutExample } from './examples/timeout'
import { ClipboardValueTextExample } from './examples/value-text'

const meta: Meta = {
  title: 'Components / Clipboard',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardBasicExample] })],
  render: () => ({ template: '<clipboard-basic-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardContextExample] })],
  render: () => ({ template: '<clipboard-context-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardControlledExample] })],
  render: () => ({ template: '<clipboard-controlled-example />' }),
}

export const CopyStatus: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardCopyStatusExample] })],
  render: () => ({ template: '<clipboard-copy-status-example />' }),
}

export const Timeout: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardTimeoutExample] })],
  render: () => ({ template: '<clipboard-timeout-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardRootProviderExample] })],
  render: () => ({ template: '<clipboard-root-provider-example />' }),
}

export const ValueText: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClipboardValueTextExample] })],
  render: () => ({ template: '<clipboard-value-text-example />' }),
}
