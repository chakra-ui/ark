import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import FormUsageExample from './examples/form-usage.svelte'
import FormattedExample from './examples/formatted.svelte'
import FractionDigitsExample from './examples/fraction-digits.svelte'
import MinMaxExample from './examples/min-max.svelte'
import MouseWheelExample from './examples/mouse-wheel.svelte'
import NoClampExample from './examples/no-clamp.svelte'
import RenderFnExample from './examples/render-fn.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import ScrubberExample from './examples/scrubber.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta = {
  title: 'Components / NumberInput',
} as Meta

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

export const Formatted = {
  render: () => ({
    Component: FormattedExample,
  }),
}

export const FormUsage = {
  render: () => ({
    Component: FormUsageExample,
  }),
}

export const FractionDigits = {
  render: () => ({
    Component: FractionDigitsExample,
  }),
}

export const MinMax = {
  render: () => ({
    Component: MinMaxExample,
  }),
}

export const MouseWheel = {
  render: () => ({
    Component: MouseWheelExample,
  }),
}

export const NoClamp = {
  render: () => ({
    Component: NoClampExample,
  }),
}

export const Scrubber = {
  render: () => ({
    Component: ScrubberExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}

export const RenderFn = {
  render: () => ({
    Component: RenderFnExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
