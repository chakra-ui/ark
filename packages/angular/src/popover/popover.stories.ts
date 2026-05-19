import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { PopoverAnchorExample } from './examples/anchor'
import { PopoverArrowExample } from './examples/arrow'
import { PopoverBasicExample } from './examples/basic'
import { PopoverCloseBehaviorExample } from './examples/close-behavior'
import { PopoverContextExample } from './examples/context'
import { PopoverControlledExample } from './examples/controlled'
import { PopoverDefaultOpenExample } from './examples/default-open'
import { PopoverDisableOutsideClickExample } from './examples/disable-outside-click'
import { PopoverInitialFocusExample } from './examples/initial-focus'
import { PopoverLazyMountExample } from './examples/lazy-mount'
import { PopoverModalExample } from './examples/modal'
import { PopoverMultipleTriggersExample } from './examples/multiple-triggers'
import { PopoverNestedExample } from './examples/nested'
import { PopoverPositioningExample } from './examples/positioning'
import { PopoverRootProviderExample } from './examples/root-provider'
import { PopoverSameWidthExample } from './examples/same-width'

const meta: Meta = {
  title: 'Components / Popover',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverBasicExample] })],
  render: () => ({ template: '<popover-basic-example />' }),
}

export const Anchor: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverAnchorExample] })],
  render: () => ({ template: '<popover-anchor-example />' }),
}

export const Arrow: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverArrowExample] })],
  render: () => ({ template: '<popover-arrow-example />' }),
}

export const CloseBehavior: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverCloseBehaviorExample] })],
  render: () => ({ template: '<popover-close-behavior-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverContextExample] })],
  render: () => ({ template: '<popover-context-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverControlledExample] })],
  render: () => ({ template: '<popover-controlled-example />' }),
}

export const DefaultOpen: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverDefaultOpenExample] })],
  render: () => ({ template: '<popover-default-open-example />' }),
}

export const DisableOutsideClick: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverDisableOutsideClickExample] })],
  render: () => ({ template: '<popover-disable-outside-click-example />' }),
}

export const InitialFocusEl: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverInitialFocusExample] })],
  render: () => ({ template: '<popover-initial-focus-example />' }),
}

export const LazyMount: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverLazyMountExample] })],
  render: () => ({ template: '<popover-lazy-mount-example />' }),
}

export const Modal: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverModalExample] })],
  render: () => ({ template: '<popover-modal-example />' }),
}

export const MultipleTriggers: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverMultipleTriggersExample] })],
  render: () => ({ template: '<popover-multiple-triggers-example />' }),
}

export const Nested: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverNestedExample] })],
  render: () => ({ template: '<popover-nested-example />' }),
}

export const Positioning: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverPositioningExample] })],
  render: () => ({ template: '<popover-positioning-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverRootProviderExample] })],
  render: () => ({ template: '<popover-root-provider-example />' }),
}

export const SameWidth: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverSameWidthExample] })],
  render: () => ({ template: '<popover-same-width-example />' }),
}
