import type { Meta } from '@storybook/svelte'
import ByteBasicExample from './examples/byte-basic.svelte'
import ByteSizesExample from './examples/byte-sizes.svelte'
import ByteWithLocaleExample from './examples/byte-with-locale.svelte'
import ByteWithUnitDisplayExample from './examples/byte-with-unit-display.svelte'
import ByteWithUnitExample from './examples/byte-with-unit.svelte'
import NumberBasicExample from './examples/number-basic.svelte'
import NumberWithCompactExample from './examples/number-with-compact.svelte'
import NumberWithCurrencyExample from './examples/number-with-currency.svelte'
import NumberWithLocaleExample from './examples/number-with-locale.svelte'
import NumberWithPercentageExample from './examples/number-with-percentage.svelte'
import NumberWithUnitExample from './examples/number-with-unit.svelte'

const meta = {
  title: 'Components / Format',
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
