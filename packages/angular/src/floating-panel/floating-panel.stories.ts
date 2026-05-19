import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { FloatingPanelAnchorPositionExample } from './examples/anchor-position'
import { FloatingPanelBasicExample } from './examples/basic'
import { FloatingPanelContextExample } from './examples/context'
import { FloatingPanelControlledOpenExample } from './examples/controlled-open'
import { FloatingPanelControlledPositionExample } from './examples/controlled-position'
import { FloatingPanelControlledSizeExample } from './examples/controlled-size'
import { FloatingPanelLazyMountExample } from './examples/lazy-mount'
import { FloatingPanelRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Floating Panel',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [FloatingPanelBasicExample] })],
  render: () => ({ template: '<floating-panel-basic-example />' }),
}

export const ControlledOpen: StoryObj = {
  decorators: [moduleMetadata({ imports: [FloatingPanelControlledOpenExample] })],
  render: () => ({ template: '<floating-panel-controlled-open-example />' }),
}

export const ControlledPosition: StoryObj = {
  decorators: [moduleMetadata({ imports: [FloatingPanelControlledPositionExample] })],
  render: () => ({ template: '<floating-panel-controlled-position-example />' }),
}

export const ControlledSize: StoryObj = {
  decorators: [moduleMetadata({ imports: [FloatingPanelControlledSizeExample] })],
  render: () => ({ template: '<floating-panel-controlled-size-example />' }),
}

export const LazyMount: StoryObj = {
  decorators: [moduleMetadata({ imports: [FloatingPanelLazyMountExample] })],
  render: () => ({ template: '<floating-panel-lazy-mount-example />' }),
}

export const AnchorPosition: StoryObj = {
  decorators: [moduleMetadata({ imports: [FloatingPanelAnchorPositionExample] })],
  render: () => ({ template: '<floating-panel-anchor-position-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [FloatingPanelContextExample] })],
  render: () => ({ template: '<floating-panel-context-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [FloatingPanelRootProviderExample] })],
  render: () => ({ template: '<floating-panel-root-provider-example />' }),
}
