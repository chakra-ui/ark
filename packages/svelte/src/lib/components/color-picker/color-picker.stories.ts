import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import InlineExample from './examples/inline.svelte'
import InputOnlyExample from './examples/input-only.svelte'
import OpenControlledExample from './examples/open-controlled.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import SliderOnlyExample from './examples/slider-only.svelte'
import SwatchOnlyExample from './examples/swatch-only.svelte'
import SwatchesExample from './examples/swatches.svelte'
import ValueSwatchExample from './examples/value-swatch.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components/ColorPicker',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const Inline = {
  render: () => ({
    Component: InlineExample,
  }),
}

export const InputOnly = {
  render: () => ({
    Component: InputOnlyExample,
  }),
}

export const OpenControlled = {
  render: () => ({
    Component: OpenControlledExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const SliderOnly = {
  render: () => ({
    Component: SliderOnlyExample,
  }),
}

export const SwatchOnly = {
  render: () => ({
    Component: SwatchOnlyExample,
  }),
}

export const Swatches = {
  render: () => ({
    Component: SwatchesExample,
  }),
}

export const ValueSwatch = {
  render: () => ({
    Component: ValueSwatchExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}
