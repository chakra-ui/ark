import type { Meta } from '@storybook/vue3-vite'

import ByteBasicExample from './examples/byte-basic.vue'
import ByteSizesExample from './examples/byte-sizes.vue'
import ByteWithLocaleExample from './examples/byte-with-locale.vue'
import ByteWithUnitDisplayExample from './examples/byte-with-unit-display.vue'
import ByteWithUnitExample from './examples/byte-with-unit.vue'
import ByteWithUnitSystemExample from './examples/byte-with-unit-system.vue'
import NumberBasicExample from './examples/number-basic.vue'
import NumberWithCompactExample from './examples/number-with-compact.vue'
import NumberWithCurrencyExample from './examples/number-with-currency.vue'
import NumberWithLocaleExample from './examples/number-with-locale.vue'
import NumberWithPercentageExample from './examples/number-with-percentage.vue'
import NumberWithUnitExample from './examples/number-with-unit.vue'
import RelativeTimeBasicExample from './examples/relative-time-basic.vue'
import RelativeTimeShortExample from './examples/relative-time-short.vue'
import TimeWithAmPmLabelsExample from './examples/time-with-am-pm-labels.vue'
import TimeBasicExample from './examples/time-basic.vue'
import TimeWithDateExample from './examples/time-with-date.vue'
import TimeWithLocaleExample from './examples/time-with-locale.vue'
import TimeWithSecondsExample from './examples/time-with-seconds.vue'

const meta: Meta = {
  title: 'Utilities / Format',
}

export default meta

export const ByteBasic = {
  render: () => ({
    components: { Component: ByteBasicExample },
    template: '<Component />',
  }),
}

export const ByteSizes = {
  render: () => ({
    components: { Component: ByteSizesExample },
    template: '<Component />',
  }),
}

export const ByteWithLocale = {
  render: () => ({
    components: { Component: ByteWithLocaleExample },
    template: '<Component />',
  }),
}

export const ByteWithUnitDisplay = {
  render: () => ({
    components: { Component: ByteWithUnitDisplayExample },
    template: '<Component />',
  }),
}

export const ByteWithUnitSystem = {
  render: () => ({
    components: { Component: ByteWithUnitSystemExample },
    template: '<Component />',
  }),
}

export const ByteWithUnit = {
  render: () => ({
    components: { Component: ByteWithUnitExample },
    template: '<Component />',
  }),
}

export const NumberBasic = {
  render: () => ({
    components: { Component: NumberBasicExample },
    template: '<Component />',
  }),
}

export const NumberWithCompact = {
  render: () => ({
    components: { Component: NumberWithCompactExample },
    template: '<Component />',
  }),
}

export const NumberWithCurrency = {
  render: () => ({
    components: { Component: NumberWithCurrencyExample },
    template: '<Component />',
  }),
}

export const NumberWithLocale = {
  render: () => ({
    components: { Component: NumberWithLocaleExample },
    template: '<Component />',
  }),
}

export const NumberWithPercentage = {
  render: () => ({
    components: { Component: NumberWithPercentageExample },
    template: '<Component />',
  }),
}

export const NumberWithUnit = {
  render: () => ({
    components: { Component: NumberWithUnitExample },
    template: '<Component />',
  }),
}

export const RelativeTimeBasic = {
  render: () => ({
    components: { Component: RelativeTimeBasicExample },
    template: '<Component />',
  }),
}

export const RelativeTimeShort = {
  render: () => ({
    components: { Component: RelativeTimeShortExample },
    template: '<Component />',
  }),
}

export const TimeBasic = {
  render: () => ({
    components: { Component: TimeBasicExample },
    template: '<Component />',
  }),
}

export const TimeWithDate = {
  render: () => ({
    components: { Component: TimeWithDateExample },
    template: '<Component />',
  }),
}

export const TimeWithSeconds = {
  render: () => ({
    components: { Component: TimeWithSecondsExample },
    template: '<Component />',
  }),
}

export const TimeWithAmPmLabels = {
  render: () => ({
    components: { Component: TimeWithAmPmLabelsExample },
    template: '<Component />',
  }),
}

export const TimeWithLocale = {
  render: () => ({
    components: { Component: TimeWithLocaleExample },
    template: '<Component />',
  }),
}
