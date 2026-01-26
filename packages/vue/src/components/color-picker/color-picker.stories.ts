import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import InlineExample from './examples/inline.vue'
import InputOnlyExample from './examples/input-only.vue'
import OpenControlledExample from './examples/open-controlled.vue'
import RootProviderExample from './examples/root-provider.vue'
import SliderOnlyExample from './examples/slider-only.vue'
import SwatchOnlyExample from './examples/swatch-only.vue'
import SwatchesExample from './examples/swatches.vue'
import ValueSwatchExample from './examples/value-swatch.vue'
import WithFieldExample from './examples/with-field.vue'

const meta: Meta = {
  title: 'Components / ColorPicker',
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

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const Inline = {
  render: () => ({
    components: { Component: InlineExample },
    template: '<Component />',
  }),
}

export const InputOnly = {
  render: () => ({
    components: { Component: InputOnlyExample },
    template: '<Component />',
  }),
}

export const OpenControlled = {
  render: () => ({
    components: { Component: OpenControlledExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const SliderOnly = {
  render: () => ({
    components: { Component: SliderOnlyExample },
    template: '<Component />',
  }),
}

export const SwatchOnly = {
  render: () => ({
    components: { Component: SwatchOnlyExample },
    template: '<Component />',
  }),
}

export const Swatches = {
  render: () => ({
    components: { Component: SwatchesExample },
    template: '<Component />',
  }),
}

export const ValueSwatch = {
  render: () => ({
    components: { Component: ValueSwatchExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}
