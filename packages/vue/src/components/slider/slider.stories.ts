import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import CenterOriginExample from './examples/center-origin.vue'
import DraggingIndicatorExample from './examples/dragging-indicator.vue'
import InitialValueExample from './examples/initial-value.vue'
import MinMaxExample from './examples/min-max.vue'
import OnEventExample from './examples/on-event.vue'
import RangeExample from './examples/range.vue'
import RootProviderExample from './examples/root-provider.vue'
import StepExample from './examples/step.vue'
import ThumbOverlapExample from './examples/thumb-overlap.vue'
import VerticalExample from './examples/vertical.vue'
import WithMarksExample from './examples/with-marks.vue'

const meta: Meta = {
  title: 'Components / Slider',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const CenterOrigin = {
  render: () => ({
    components: { Component: CenterOriginExample },
    template: '<Component />',
  }),
}

export const DraggingIndicator = {
  render: () => ({
    components: { Component: DraggingIndicatorExample },
    template: '<Component />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { Component: InitialValueExample },
    template: '<Component />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { Component: MinMaxExample },
    template: '<Component />',
  }),
}

export const OnEvent = {
  render: () => ({
    components: { Component: OnEventExample },
    template: '<Component />',
  }),
}

export const Range = {
  render: () => ({
    components: { Component: RangeExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Step = {
  render: () => ({
    components: { Component: StepExample },
    template: '<Component />',
  }),
}

export const ThumbOverlap = {
  render: () => ({
    components: { Component: ThumbOverlapExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}

export const WithMarks = {
  render: () => ({
    components: { Component: WithMarksExample },
    template: '<Component />',
  }),
}
