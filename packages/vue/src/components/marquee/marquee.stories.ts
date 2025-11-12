import type { Meta } from '@storybook/vue3-vite'

import AutoFillExample from './examples/auto-fill.vue'
import BasicExample from './examples/basic.vue'
import FiniteLoopsExample from './examples/finite-loops.vue'
import PauseOnInteractionExample from './examples/pause-on-interaction.vue'
import ProgrammaticControlExample from './examples/programmatic-control.vue'
import ReverseExample from './examples/reverse.vue'
import ScopedStylesExample from './examples/scoped-styles.vue'
import SpeedExample from './examples/speed.vue'
import VerticalExample from './examples/vertical.vue'
import WithEdgesExample from './examples/with-edges.vue'

const meta: Meta = {
  title: 'Components / Marquee',
}

export default meta

export const AutoFill = {
  render: () => ({
    components: { Component: AutoFillExample },
    template: '<Component />',
  }),
}

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const FiniteLoops = {
  render: () => ({
    components: { Component: FiniteLoopsExample },
    template: '<Component />',
  }),
}

export const PauseOnInteraction = {
  render: () => ({
    components: { Component: PauseOnInteractionExample },
    template: '<Component />',
  }),
}

export const ProgrammaticControl = {
  render: () => ({
    components: { Component: ProgrammaticControlExample },
    template: '<Component />',
  }),
}

export const Reverse = {
  render: () => ({
    components: { Component: ReverseExample },
    template: '<Component />',
  }),
}

export const ScopedStyles = {
  render: () => ({
    components: { Component: ScopedStylesExample },
    template: '<Component />',
  }),
}

export const Speed = {
  render: () => ({
    components: { Component: SpeedExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}

export const WithEdges = {
  render: () => ({
    components: { Component: WithEdgesExample },
    template: '<Component />',
  }),
}
