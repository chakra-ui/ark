import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as ByteBasicExample } from './examples/byte-basic.js'
import { mount as ByteSizesExample } from './examples/byte-sizes.js'
import { mount as ByteWithLocaleExample } from './examples/byte-with-locale.js'
import { mount as ByteWithUnitExample } from './examples/byte-with-unit.js'
import { mount as ByteWithUnitDisplayExample } from './examples/byte-with-unit-display.js'
import { mount as ByteWithUnitSystemExample } from './examples/byte-with-unit-system.js'
import { mount as NumberBasicExample } from './examples/number-basic.js'
import { mount as NumberWithCompactExample } from './examples/number-with-compact.js'
import { mount as NumberWithCurrencyExample } from './examples/number-with-currency.js'
import { mount as NumberWithLocaleExample } from './examples/number-with-locale.js'
import { mount as NumberWithPercentageExample } from './examples/number-with-percentage.js'
import { mount as NumberWithUnitExample } from './examples/number-with-unit.js'
import { mount as RelativeTimeBasicExample } from './examples/relative-time-basic.js'
import { mount as RelativeTimeShortExample } from './examples/relative-time-short.js'
import { mount as TimeBasicExample } from './examples/time-basic.js'
import { mount as TimeWithAmPmLabelsExample } from './examples/time-with-am-pm-labels.js'
import { mount as TimeWithDateExample } from './examples/time-with-date.js'
import { mount as TimeWithLocaleExample } from './examples/time-with-locale.js'
import { mount as TimeWithSecondsExample } from './examples/time-with-seconds.js'

const meta: Meta = { title: 'Utilities / Format' }
export default meta

export const ByteBasic: StoryObj = { name: 'Byte Basic', render: renderExample(ByteBasicExample) }

export const ByteSizes: StoryObj = { name: 'Byte Sizes', render: renderExample(ByteSizesExample) }

export const ByteWithLocale: StoryObj = { name: 'Byte With Locale', render: renderExample(ByteWithLocaleExample) }

export const ByteWithUnit: StoryObj = { name: 'Byte With Unit', render: renderExample(ByteWithUnitExample) }

export const ByteWithUnitDisplay: StoryObj = {
  name: 'Byte With Unit Display',
  render: renderExample(ByteWithUnitDisplayExample),
}

export const ByteWithUnitSystem: StoryObj = {
  name: 'Byte With Unit System',
  render: renderExample(ByteWithUnitSystemExample),
}

export const NumberBasic: StoryObj = { name: 'Number Basic', render: renderExample(NumberBasicExample) }

export const NumberWithCompact: StoryObj = {
  name: 'Number With Compact',
  render: renderExample(NumberWithCompactExample),
}

export const NumberWithCurrency: StoryObj = {
  name: 'Number With Currency',
  render: renderExample(NumberWithCurrencyExample),
}

export const NumberWithLocale: StoryObj = { name: 'Number With Locale', render: renderExample(NumberWithLocaleExample) }

export const NumberWithPercentage: StoryObj = {
  name: 'Number With Percentage',
  render: renderExample(NumberWithPercentageExample),
}

export const NumberWithUnit: StoryObj = { name: 'Number With Unit', render: renderExample(NumberWithUnitExample) }

export const RelativeTimeBasic: StoryObj = {
  name: 'Relative Time Basic',
  render: renderExample(RelativeTimeBasicExample),
}

export const RelativeTimeShort: StoryObj = {
  name: 'Relative Time Short',
  render: renderExample(RelativeTimeShortExample),
}

export const TimeBasic: StoryObj = { name: 'Time Basic', render: renderExample(TimeBasicExample) }

export const TimeWithAmPmLabels: StoryObj = {
  name: 'Time With AM/PM Labels',
  render: renderExample(TimeWithAmPmLabelsExample),
}

export const TimeWithDate: StoryObj = { name: 'Time With Date', render: renderExample(TimeWithDateExample) }

export const TimeWithLocale: StoryObj = { name: 'Time With Locale', render: renderExample(TimeWithLocaleExample) }

export const TimeWithSeconds: StoryObj = { name: 'Time With Seconds', render: renderExample(TimeWithSecondsExample) }
