import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { SwapFadeExample } from './examples/fade'
import { SwapFlipExample } from './examples/flip'
import { SwapRotateExample } from './examples/rotate'
import { SwapScaleExample } from './examples/scale'

const meta: Meta = {
  title: 'Components / Swap',
}

export default meta

export const Fade: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwapFadeExample] })],
  render: () => ({ template: '<swap-fade-example />' }),
}

export const Flip: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwapFlipExample] })],
  render: () => ({ template: '<swap-flip-example />' }),
}

export const Rotate: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwapRotateExample] })],
  render: () => ({ template: '<swap-rotate-example />' }),
}

export const Scale: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwapScaleExample] })],
  render: () => ({ template: '<swap-scale-example />' }),
}
