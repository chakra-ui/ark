import type { Meta } from '@storybook/svelte'
import FadeExample from './examples/fade.svelte'
import FlipExample from './examples/flip.svelte'
import RotateExample from './examples/rotate.svelte'
import ScaleExample from './examples/scale.svelte'

const meta: Meta = {
  title: 'Components / Swap',
}

export default meta

export const Fade = {
  render: () => ({
    Component: FadeExample,
  }),
}

export const Flip = {
  render: () => ({
    Component: FlipExample,
  }),
}

export const Rotate = {
  render: () => ({
    Component: RotateExample,
  }),
}

export const Scale = {
  render: () => ({
    Component: ScaleExample,
  }),
}
