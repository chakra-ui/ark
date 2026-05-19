import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { FrameBasicExample } from './examples/basic'
import { FrameInheritStylesExample } from './examples/inherit-styles'
import { FrameScriptExample } from './examples/script'
import { FrameSrcDocExample } from './examples/src-doc'

const meta: Meta = {
  title: 'Utilities / Frame',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [FrameBasicExample] })],
  render: () => ({ template: '<frame-basic-example />' }),
}

export const InheritStyles: StoryObj = {
  decorators: [moduleMetadata({ imports: [FrameInheritStylesExample] })],
  render: () => ({ template: '<frame-inherit-styles-example />' }),
}

export const Script: StoryObj = {
  decorators: [moduleMetadata({ imports: [FrameScriptExample] })],
  render: () => ({ template: '<frame-script-example />' }),
}

export const SrcDoc: StoryObj = {
  decorators: [moduleMetadata({ imports: [FrameSrcDocExample] })],
  render: () => ({ template: '<frame-src-doc-example />' }),
}
