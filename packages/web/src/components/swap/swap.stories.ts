import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as FadeExample } from '../../../examples/swap/fade.js'
import { mount as FlipExample } from '../../../examples/swap/flip.js'
import { mount as RotateExample } from '../../../examples/swap/rotate.js'
import { mount as ScaleExample } from '../../../examples/swap/scale.js'

const meta: Meta = { title: 'Components / Swap' }
export default meta

export const Fade: StoryObj = { name: 'Fade', render: renderExample(FadeExample) }

export const Flip: StoryObj = { name: 'Flip', render: renderExample(FlipExample) }

export const Rotate: StoryObj = { name: 'Rotate', render: renderExample(RotateExample) }

export const Scale: StoryObj = { name: 'Scale', render: renderExample(ScaleExample) }
