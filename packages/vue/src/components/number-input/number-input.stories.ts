import type { Meta } from '@storybook/vue3-vite'

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

const meta: Meta = {
  title: 'Components / NumberInput',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { Component: MinMaxExample },
    template: '<Component />',
  }),
}

export const FractionDigits = {
  render: () => ({
    components: { Component: FractionDigitsExample },
    template: '<Component />',
  }),
}

export const Scrubber = {
  render: () => ({
    components: { Component: ScrubberExample },
    template: '<Component />',
  }),
}

export const MouseWheel = {
  render: () => ({
    components: { Component: MouseWheelExample },
    template: '<Component />',
  }),
}

export const NoClamp = {
  render: () => ({
    components: { Component: NoClampExample },
    template: '<Component />',
  }),
}

export const FormUsage = {
  render: () => ({
    components: { Component: FormUsageExample },
    template: '<Component />',
  }),
}

export const Formatted = {
  render: () => ({
    components: { Component: FormattedExample },
    template: '<Component />',
  }),
}

export const RenderFn = {
  render: () => ({
    components: { Component: RenderFnExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
