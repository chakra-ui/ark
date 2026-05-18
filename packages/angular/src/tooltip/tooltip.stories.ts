import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { TooltipArrowExample } from './examples/arrow'
import { TooltipBasicExample } from './examples/basic'
import { TooltipControlledExample } from './examples/controlled'
import { TooltipDelayExample } from './examples/delay'
import { TooltipInteractiveExample } from './examples/interactive'
import { TooltipPositioningExample } from './examples/positioning'
import { TooltipRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Tooltip',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipBasicExample] })],
  render: () => ({ template: '<tooltip-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipControlledExample] })],
  render: () => ({ template: '<tooltip-controlled-example />' }),
}

export const Delay: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipDelayExample] })],
  render: () => ({ template: '<tooltip-delay-example />' }),
}

export const Arrow: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipArrowExample] })],
  render: () => ({ template: '<tooltip-arrow-example />' }),
}

export const Interactive: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipInteractiveExample] })],
  render: () => ({ template: '<tooltip-interactive-example />' }),
}

export const Positioning: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipPositioningExample] })],
  render: () => ({ template: '<tooltip-positioning-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipRootProviderExample] })],
  render: () => ({ template: '<tooltip-root-provider-example />' }),
}
