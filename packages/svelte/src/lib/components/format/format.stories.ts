import type { Meta } from '@storybook/svelte'
import ByteBasicExample from './examples/byte-basic.svelte'
import ByteSizesExample from './examples/byte-sizes.svelte'
import ByteWithLocaleExample from './examples/byte-with-locale.svelte'
import ByteWithUnitDisplayExample from './examples/byte-with-unit-display.svelte'
import ByteWithUnitExample from './examples/byte-with-unit.svelte'
import ByteWithUnitSystemExample from './examples/byte-with-unit-system.svelte'
import NumberBasicExample from './examples/number-basic.svelte'
import NumberWithCompactExample from './examples/number-with-compact.svelte'
import NumberWithCurrencyExample from './examples/number-with-currency.svelte'
import NumberWithLocaleExample from './examples/number-with-locale.svelte'
import NumberWithPercentageExample from './examples/number-with-percentage.svelte'
import NumberWithUnitExample from './examples/number-with-unit.svelte'
import RelativeTimeBasicExample from './examples/relative-time-basic.svelte'
import RelativeTimeShortExample from './examples/relative-time-short.svelte'
import TimeWithAmPmLabelsExample from './examples/time-with-am-pm-labels.svelte'
import TimeBasicExample from './examples/time-basic.svelte'
import TimeWithDateExample from './examples/time-with-date.svelte'
import TimeWithLocaleExample from './examples/time-with-locale.svelte'
import TimeWithSecondsExample from './examples/time-with-seconds.svelte'

const meta = {
  title: 'Utilities / Format',
} as Meta

export default meta

export const NumberBasic = {
  render: () => ({
    Component: NumberBasicExample,
  }),
}

export const NumberWithCompact = {
  render: () => ({
    Component: NumberWithCompactExample,
  }),
}

export const NumberWithCurrency = {
  render: () => ({
    Component: NumberWithCurrencyExample,
  }),
}

export const NumberWithLocale = {
  render: () => ({
    Component: NumberWithLocaleExample,
  }),
}

export const NumberWithPercentage = {
  render: () => ({
    Component: NumberWithPercentageExample,
  }),
}

export const NumberWithUnit = {
  render: () => ({
    Component: NumberWithUnitExample,
  }),
}

export const ByteBasic = {
  render: () => ({
    Component: ByteBasicExample,
  }),
}

export const ByteSizes = {
  render: () => ({
    Component: ByteSizesExample,
  }),
}

export const ByteWithLocale = {
  render: () => ({
    Component: ByteWithLocaleExample,
  }),
}

export const ByteWithUnit = {
  render: () => ({
    Component: ByteWithUnitExample,
  }),
}

export const ByteWithUnitDisplay = {
  render: () => ({
    Component: ByteWithUnitDisplayExample,
  }),
}

export const ByteWithUnitSystem = {
  render: () => ({
    Component: ByteWithUnitSystemExample,
  }),
}

export const RelativeTimeBasic = {
  render: () => ({
    Component: RelativeTimeBasicExample,
  }),
}

export const RelativeTimeShort = {
  render: () => ({
    Component: RelativeTimeShortExample,
  }),
}

export const TimeBasic = {
  render: () => ({
    Component: TimeBasicExample,
  }),
}

export const TimeWithDate = {
  render: () => ({
    Component: TimeWithDateExample,
  }),
}

export const TimeWithSeconds = {
  render: () => ({
    Component: TimeWithSecondsExample,
  }),
}

export const TimeWithAmPmLabels = {
  render: () => ({
    Component: TimeWithAmPmLabelsExample,
  }),
}

export const TimeWithLocale = {
  render: () => ({
    Component: TimeWithLocaleExample,
  }),
}
