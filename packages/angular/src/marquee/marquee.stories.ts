import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { MarqueeAutoFillExample } from './examples/auto-fill'
import { MarqueeBasicExample } from './examples/basic'
import { MarqueeFiniteLoopsExample } from './examples/finite-loops'
import { MarqueePauseOnInteractionExample } from './examples/pause-on-interaction'
import { MarqueeProgrammaticControlExample } from './examples/programmatic-control'
import { MarqueeReverseExample } from './examples/reverse'
import { MarqueeRootProviderExample } from './examples/root-provider'
import { MarqueeSpeedExample } from './examples/speed'
import { MarqueeVerticalExample } from './examples/vertical'
import { MarqueeWithEdgesExample } from './examples/with-edges'

const meta: Meta = {
  title: 'Components / Marquee',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueeBasicExample] })],
  render: () => ({ template: '<marquee-basic-example />' }),
}

export const AutoFill: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueeAutoFillExample] })],
  render: () => ({ template: '<marquee-auto-fill-example />' }),
}

export const FiniteLoops: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueeFiniteLoopsExample] })],
  render: () => ({ template: '<marquee-finite-loops-example />' }),
}

export const PauseOnInteraction: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueePauseOnInteractionExample] })],
  render: () => ({ template: '<marquee-pause-on-interaction-example />' }),
}

export const ProgrammaticControl: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueeProgrammaticControlExample] })],
  render: () => ({ template: '<marquee-programmatic-control-example />' }),
}

export const Reverse: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueeReverseExample] })],
  render: () => ({ template: '<marquee-reverse-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueeRootProviderExample] })],
  render: () => ({ template: '<marquee-root-provider-example />' }),
}

export const Speed: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueeSpeedExample] })],
  render: () => ({ template: '<marquee-speed-example />' }),
}

export const Vertical: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueeVerticalExample] })],
  render: () => ({ template: '<marquee-vertical-example />' }),
}

export const WithEdges: StoryObj = {
  decorators: [moduleMetadata({ imports: [MarqueeWithEdgesExample] })],
  render: () => ({ template: '<marquee-with-edges-example />' }),
}
