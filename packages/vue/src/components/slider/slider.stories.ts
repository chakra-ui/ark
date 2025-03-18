import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import CenterOriginExample from './examples/center-origin.vue'
import DraggingIndicatorExample from './examples/dragging-indicator.vue'
import InitialValueExample from './examples/initial-value.vue'
import MinMaxExample from './examples/min-max.vue'
import OnEventExample from './examples/on-event.vue'
import RootProviderExample from './examples/root-provider.vue'
import StepExample from './examples/step.vue'
import VerticalExample from './examples/vertical.vue'
import WithMarksExample from './examples/with-marks.vue'

const meta = {
  title: 'Components / Slider',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const WithMarks = {
  render: () => ({
    components: { WithMarksExample },
    template: '<WithMarksExample />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { InitialValueExample },
    template: '<InitialValueExample />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { MinMaxExample },
    template: '<MinMaxExample />',
  }),
}

export const Step = {
  render: () => ({
    components: { StepExample },
    template: '<StepExample />',
  }),
}

export const OnEvent = {
  render: () => ({
    components: { OnEventExample },
    template: '<OnEventExample />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { VerticalExample },
    template: '<VerticalExample />',
  }),
}

export const CenterOrigin = {
  render: () => ({
    components: { CenterOriginExample },
    template: '<CenterOriginExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}

export const DraggingIndicator = {
  render: () => ({
    components: { DraggingIndicatorExample },
    template: '<DraggingIndicatorExample />',
  }),
}