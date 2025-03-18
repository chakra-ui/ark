import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import FormUsageExample from './examples/form-usage.vue'
import FormattedExample from './examples/formatted.vue'
import FractionDigitsExample from './examples/fraction-digits.vue'
import MinMaxExample from './examples/min-max.vue'
import MouseWheelExample from './examples/mouse-wheel.vue'
import NoClampExample from './examples/no-clamp.vue'
import RenderFnExample from './examples/render-fn.vue'
import RootProviderExample from './examples/root-provider.vue'
import ScrubberExample from './examples/scrubber.vue'
import WithFieldExample from './examples/with-field.vue'

const meta = {
  title: 'Components / NumberInput',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { MinMaxExample },
    template: '<MinMaxExample />',
  }),
}

export const FractionDigits = {
  render: () => ({
    components: { FractionDigitsExample },
    template: '<FractionDigitsExample />',
  }),
}

export const Scrubber = {
  render: () => ({
    components: { ScrubberExample },
    template: '<ScrubberExample />',
  }),
}

export const MouseWheel = {
  render: () => ({
    components: { MouseWheelExample },
    template: '<MouseWheelExample />',
  }),
}

export const NoClamp = {
  render: () => ({
    components: { NoClampExample },
    template: '<NoClampExample />',
  }),
}

export const FormUsage = {
  render: () => ({
    components: { FormUsageExample },
    template: '<FormUsageExample />',
  }),
}

export const Formatted = {
  render: () => ({
    components: { FormattedExample },
    template: '<FormattedExample />',
  }),
}

export const RenderFn = {
  render: () => ({
    components: { RenderFnExample },
    template: '<RenderFnExample />',
  }),
}

export const WithField = {
  render: () => ({
    components: { WithFieldExample },
    template: '<WithFieldExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}