import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import CompositionExample from './examples/composition.svelte'
import ContinuousExample from './examples/continuous.svelte'
import FormattingExample from './examples/formatting.svelte'
import LiveExample from './examples/live.svelte'
import LocaleExample from './examples/locale.svelte'
import PrefixSuffixExample from './examples/prefix-suffix.svelte'
import PricingExample from './examples/pricing.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import TimingExample from './examples/timing.svelte'
import TrendExample from './examples/trend.svelte'

const meta = {
  title: 'Components / Number Flow',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Composition = {
  render: () => ({
    Component: CompositionExample,
  }),
}

export const Continuous = {
  render: () => ({
    Component: ContinuousExample,
  }),
}

export const Formatting = {
  render: () => ({
    Component: FormattingExample,
  }),
}

export const Live = {
  render: () => ({
    Component: LiveExample,
  }),
}

export const Locale = {
  render: () => ({
    Component: LocaleExample,
  }),
}

export const PrefixSuffix = {
  render: () => ({
    Component: PrefixSuffixExample,
  }),
}

export const Pricing = {
  render: () => ({
    Component: PricingExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Timing = {
  render: () => ({
    Component: TimingExample,
  }),
}

export const Trend = {
  render: () => ({
    Component: TrendExample,
  }),
}
