import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import FormattingExample from './examples/formatting.svelte'
import FractionDigitsExample from './examples/fraction-digits.svelte'
import MinMaxExample from './examples/min-max.svelte'
import MouseWheelExample from './examples/mouse-wheel.svelte'
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

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Formatting = {
  render: () => ({
    Component: FormattingExample,
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

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
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
