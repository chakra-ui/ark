import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { SplitterBasicExample } from './examples/basic'
import { SplitterCollapsibleExample } from './examples/collapsible'
import { SplitterContextExample } from './examples/context'
import { SplitterMultiplePanelsExample } from './examples/multiple-panels'
import { SplitterNestedExample } from './examples/nested'
import { SplitterResizeIndicatorExample } from './examples/resize-indicator'
import { SplitterRootProviderExample } from './examples/root-provider'
import { SplitterVerticalExample } from './examples/vertical'

const meta: Meta = {
  title: 'Components / Splitter',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [SplitterBasicExample] })],
  render: () => ({ template: '<splitter-basic-example />' }),
}

export const Collapsible: StoryObj = {
  decorators: [moduleMetadata({ imports: [SplitterCollapsibleExample] })],
  render: () => ({ template: '<splitter-collapsible-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [SplitterContextExample] })],
  render: () => ({ template: '<splitter-context-example />' }),
}

export const MultiplePanels: StoryObj = {
  decorators: [moduleMetadata({ imports: [SplitterMultiplePanelsExample] })],
  render: () => ({ template: '<splitter-multiple-panels-example />' }),
}

export const Nested: StoryObj = {
  decorators: [moduleMetadata({ imports: [SplitterNestedExample] })],
  render: () => ({ template: '<splitter-nested-example />' }),
}

export const ResizeIndicator: StoryObj = {
  decorators: [moduleMetadata({ imports: [SplitterResizeIndicatorExample] })],
  render: () => ({ template: '<splitter-resize-indicator-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [SplitterRootProviderExample] })],
  render: () => ({ template: '<splitter-root-provider-example />' }),
}

export const Vertical: StoryObj = {
  decorators: [moduleMetadata({ imports: [SplitterVerticalExample] })],
  render: () => ({ template: '<splitter-vertical-example />' }),
}
