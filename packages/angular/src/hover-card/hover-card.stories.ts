import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { HoverCardBasicExample } from './examples/basic'
import { HoverCardControlledExample } from './examples/controlled'
import { HoverCardDelayExample } from './examples/delay'
import { HoverCardMultipleTriggersExample } from './examples/multiple-triggers'
import { HoverCardPositioningExample } from './examples/positioning'
import { HoverCardRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Hover Card',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [HoverCardBasicExample] })],
  render: () => ({ template: '<hover-card-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [HoverCardControlledExample] })],
  render: () => ({ template: '<hover-card-controlled-example />' }),
}

export const Delay: StoryObj = {
  decorators: [moduleMetadata({ imports: [HoverCardDelayExample] })],
  render: () => ({ template: '<hover-card-delay-example />' }),
}

export const Positioning: StoryObj = {
  decorators: [moduleMetadata({ imports: [HoverCardPositioningExample] })],
  render: () => ({ template: '<hover-card-positioning-example />' }),
}

export const MultipleTriggers: StoryObj = {
  decorators: [moduleMetadata({ imports: [HoverCardMultipleTriggersExample] })],
  render: () => ({ template: '<hover-card-multiple-triggers-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [HoverCardRootProviderExample] })],
  render: () => ({ template: '<hover-card-root-provider-example />' }),
}
