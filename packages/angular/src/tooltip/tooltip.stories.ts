import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { TooltipArrowExample } from './examples/arrow'
import { TooltipBasicExample } from './examples/basic'
import { TooltipContextExample } from './examples/context'
import { TooltipControlledExample } from './examples/controlled'
import { TooltipDelayExample } from './examples/delay'
import { TooltipMultipleTriggersExample } from './examples/multiple-triggers'
import { TooltipPositioningExample } from './examples/positioning'
import { TooltipRootProviderExample } from './examples/root-provider'
import { TooltipWithinFixedExample } from './examples/within-fixed'

const meta: Meta = {
  title: 'Components / Tooltip',
}

export default meta

export const Arrow: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipArrowExample] })],
  render: () => ({ template: '<tooltip-arrow-example />' }),
}

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipBasicExample] })],
  render: () => ({ template: '<tooltip-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipControlledExample] })],
  render: () => ({ template: '<tooltip-controlled-example />' }),
}

export const Positioning: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipPositioningExample] })],
  render: () => ({ template: '<tooltip-positioning-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipContextExample] })],
  render: () => ({ template: '<tooltip-context-example />' }),
}

export const MultipleTriggers: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipMultipleTriggersExample] })],
  render: () => ({ template: '<tooltip-multiple-triggers-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipRootProviderExample] })],
  render: () => ({ template: '<tooltip-root-provider-example />' }),
}

export const Delay: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipDelayExample] })],
  render: () => ({ template: '<tooltip-delay-example />' }),
}

export const WithinFixed: StoryObj = {
  decorators: [moduleMetadata({ imports: [TooltipWithinFixedExample] })],
  render: () => ({ template: '<tooltip-within-fixed-example />' }),
}
