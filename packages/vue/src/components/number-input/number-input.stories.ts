import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ContextExample from './examples/context.vue'
import ControlledExample from './examples/controlled.vue'
import FormattingExample from './examples/formatting.vue'
import FractionDigitsExample from './examples/fraction-digits.vue'
import MinMaxExample from './examples/min-max.vue'
import MouseWheelExample from './examples/mouse-wheel.vue'
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

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Formatting = {
  render: () => ({
    components: { Component: FormattingExample },
    template: '<Component />',
  }),
}

export const FractionDigits = {
  render: () => ({
    components: { Component: FractionDigitsExample },
    template: '<Component />',
  }),
}

export const MinMax = {
  render: () => ({
    components: { Component: MinMaxExample },
    template: '<Component />',
  }),
}

export const MouseWheel = {
  render: () => ({
    components: { Component: MouseWheelExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Scrubber = {
  render: () => ({
    components: { Component: ScrubberExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}
