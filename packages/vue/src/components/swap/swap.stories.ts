import type { Meta } from '@storybook/vue3-vite'

import FadeExample from './examples/fade.vue'
import FlipExample from './examples/flip.vue'
import RotateExample from './examples/rotate.vue'
import ScaleExample from './examples/scale.vue'

const meta: Meta = {
  title: 'Components / Swap',
}

export default meta

export const Fade = {
  render: () => ({
    components: { Component: FadeExample },
    template: '<Component />',
  }),
}

export const Flip = {
  render: () => ({
    components: { Component: FlipExample },
    template: '<Component />',
  }),
}

export const Rotate = {
  render: () => ({
    components: { Component: RotateExample },
    template: '<Component />',
  }),
}

export const Scale = {
  render: () => ({
    components: { Component: ScaleExample },
    template: '<Component />',
  }),
}
