import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { PopoverAnchorExample } from './examples/anchor'
import { PopoverArrowExample } from './examples/arrow'
import { PopoverBasicExample } from './examples/basic'
import { PopoverControlledExample } from './examples/controlled'
import { PopoverDefaultOpenExample } from './examples/default-open'
import { PopoverModalExample } from './examples/modal'
import { PopoverRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Popover',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverBasicExample] })],
  render: () => ({ template: '<popover-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverControlledExample] })],
  render: () => ({ template: '<popover-controlled-example />' }),
}

export const DefaultOpen: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverDefaultOpenExample] })],
  render: () => ({ template: '<popover-default-open-example />' }),
}

export const Anchor: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverAnchorExample] })],
  render: () => ({ template: '<popover-anchor-example />' }),
}

export const Arrow: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverArrowExample] })],
  render: () => ({ template: '<popover-arrow-example />' }),
}

export const Modal: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverModalExample] })],
  render: () => ({ template: '<popover-modal-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [PopoverRootProviderExample] })],
  render: () => ({ template: '<popover-root-provider-example />' }),
}
