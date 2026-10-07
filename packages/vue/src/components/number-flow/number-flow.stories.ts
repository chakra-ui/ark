import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import CompositionExample from './examples/composition.vue'
import ContinuousExample from './examples/continuous.vue'
import FormattingExample from './examples/formatting.vue'
import LiveExample from './examples/live.vue'
import LocaleExample from './examples/locale.vue'
import PrefixSuffixExample from './examples/prefix-suffix.vue'
import PricingExample from './examples/pricing.vue'
import RootProviderExample from './examples/root-provider.vue'
import TimingExample from './examples/timing.vue'
import TrendExample from './examples/trend.vue'

const meta: Meta = {
  title: 'Components / Number Flow',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Composition = {
  render: () => ({
    components: { Component: CompositionExample },
    template: '<Component />',
  }),
}

export const Continuous = {
  render: () => ({
    components: { Component: ContinuousExample },
    template: '<Component />',
  }),
}

export const Formatting = {
  render: () => ({
    components: { Component: FormattingExample },
    template: '<Component />',
  }),
}

export const Live = {
  render: () => ({
    components: { Component: LiveExample },
    template: '<Component />',
  }),
}

export const Locale = {
  render: () => ({
    components: { Component: LocaleExample },
    template: '<Component />',
  }),
}

export const PrefixSuffix = {
  render: () => ({
    components: { Component: PrefixSuffixExample },
    template: '<Component />',
  }),
}

export const Pricing = {
  render: () => ({
    components: { Component: PricingExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Timing = {
  render: () => ({
    components: { Component: TimingExample },
    template: '<Component />',
  }),
}

export const Trend = {
  render: () => ({
    components: { Component: TrendExample },
    template: '<Component />',
  }),
}
