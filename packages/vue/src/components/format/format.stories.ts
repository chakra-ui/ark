import type { Meta } from '@storybook/vue3'

import ByteBasicExample from './examples/byte-basic.vue'
import ByteSizesExample from './examples/byte-sizes.vue'
import ByteWithLocaleExample from './examples/byte-with-locale.vue'
import ByteWithUnitDisplayExample from './examples/byte-with-unit-display.vue'
import ByteWithUnitExample from './examples/byte-with-unit.vue'
import NumberBasicExample from './examples/number-basic.vue'
import NumberWithCompactExample from './examples/number-with-compact.vue'
import NumberWithCurrencyExample from './examples/number-with-currency.vue'
import NumberWithLocaleExample from './examples/number-with-locale.vue'
import NumberWithPercentageExample from './examples/number-with-percentage.vue'
import NumberWithUnitExample from './examples/number-with-unit.vue'

const meta = {
  title: 'Components / Format',
} as Meta

export default meta

export const NumberBasic = {
  render: () => ({
    components: { NumberBasicExample },
    template: '<NumberBasicExample />',
  }),
}

export const NumberWithLocale = {
  render: () => ({
    components: { NumberWithLocaleExample },
    template: '<NumberWithLocaleExample />',
  }),
}

export const NumberWithUnit = {
  render: () => ({
    components: { NumberWithUnitExample },
    template: '<NumberWithUnitExample />',
  }),
}

export const NumberWithPercentage = {
  render: () => ({
    components: { NumberWithPercentageExample },
    template: '<NumberWithPercentageExample />',
  }),
}

export const NumberWithCompact = {
  render: () => ({
    components: { NumberWithCompactExample },
    template: '<NumberWithCompactExample />',
  }),
}

export const ByteBasic = {
  render: () => ({
    components: { ByteBasicExample },
    template: '<ByteBasicExample />',
  }),
}

export const ByteSizes = {
  render: () => ({
    components: { ByteSizesExample },
    template: '<ByteSizesExample />',
  }),
}

export const ByteWithLocale = {
  render: () => ({
    components: { ByteWithLocaleExample },
    template: '<ByteWithLocaleExample />',
  }),
}

export const ByteWithUnit = {
  render: () => ({
    components: { ByteWithUnitExample },
    template: '<ByteWithUnitExample />',
  }),
}

export const ByteWithUnitDisplay = {
  render: () => ({
    components: { ByteWithUnitDisplayExample },
    template: '<ByteWithUnitDisplayExample />',
  }),
}

export const NumberWithCurrency = {
  render: () => ({
    components: { NumberWithCurrencyExample },
    template: '<NumberWithCurrencyExample />',
  }),
}