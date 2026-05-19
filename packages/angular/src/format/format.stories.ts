import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { FormatByteBasicExample } from './examples/byte-basic'
import { FormatByteSizesExample } from './examples/byte-sizes'
import { FormatByteWithLocaleExample } from './examples/byte-with-locale'
import { FormatByteWithUnitExample } from './examples/byte-with-unit'
import { FormatByteWithUnitDisplayExample } from './examples/byte-with-unit-display'
import { FormatByteWithUnitSystemExample } from './examples/byte-with-unit-system'
import { FormatNumberBasicExample } from './examples/number-basic'
import { FormatNumberWithCompactExample } from './examples/number-with-compact'
import { FormatNumberWithCurrencyExample } from './examples/number-with-currency'
import { FormatNumberWithLocaleExample } from './examples/number-with-locale'
import { FormatNumberWithPercentageExample } from './examples/number-with-percentage'
import { FormatNumberWithUnitExample } from './examples/number-with-unit'
import { FormatRelativeTimeBasicExample } from './examples/relative-time-basic'
import { FormatRelativeTimeShortExample } from './examples/relative-time-short'
import { FormatTimeBasicExample } from './examples/time-basic'
import { FormatTimeWithAmPmLabelsExample } from './examples/time-with-am-pm-labels'
import { FormatTimeWithDateExample } from './examples/time-with-date'
import { FormatTimeWithLocaleExample } from './examples/time-with-locale'
import { FormatTimeWithSecondsExample } from './examples/time-with-seconds'

const meta: Meta = {
  title: 'Utilities / Format',
}

export default meta

export const ByteBasic: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatByteBasicExample] })],
  render: () => ({ template: '<format-byte-basic-example />' }),
}

export const ByteSizes: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatByteSizesExample] })],
  render: () => ({ template: '<format-byte-sizes-example />' }),
}

export const ByteWithLocale: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatByteWithLocaleExample] })],
  render: () => ({ template: '<format-byte-with-locale-example />' }),
}

export const ByteWithUnit: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatByteWithUnitExample] })],
  render: () => ({ template: '<format-byte-with-unit-example />' }),
}

export const ByteWithUnitDisplay: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatByteWithUnitDisplayExample] })],
  render: () => ({ template: '<format-byte-with-unit-display-example />' }),
}

export const ByteWithUnitSystem: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatByteWithUnitSystemExample] })],
  render: () => ({ template: '<format-byte-with-unit-system-example />' }),
}

export const NumberBasic: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatNumberBasicExample] })],
  render: () => ({ template: '<format-number-basic-example />' }),
}

export const NumberWithCompact: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatNumberWithCompactExample] })],
  render: () => ({ template: '<format-number-with-compact-example />' }),
}

export const NumberWithCurrency: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatNumberWithCurrencyExample] })],
  render: () => ({ template: '<format-number-with-currency-example />' }),
}

export const NumberWithLocale: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatNumberWithLocaleExample] })],
  render: () => ({ template: '<format-number-with-locale-example />' }),
}

export const NumberWithPercentage: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatNumberWithPercentageExample] })],
  render: () => ({ template: '<format-number-with-percentage-example />' }),
}

export const NumberWithUnit: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatNumberWithUnitExample] })],
  render: () => ({ template: '<format-number-with-unit-example />' }),
}

export const RelativeTimeBasic: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatRelativeTimeBasicExample] })],
  render: () => ({ template: '<format-relative-time-basic-example />' }),
}

export const RelativeTimeShort: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatRelativeTimeShortExample] })],
  render: () => ({ template: '<format-relative-time-short-example />' }),
}

export const TimeBasic: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatTimeBasicExample] })],
  render: () => ({ template: '<format-time-basic-example />' }),
}

export const TimeWithAmPmLabels: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatTimeWithAmPmLabelsExample] })],
  render: () => ({ template: '<format-time-with-am-pm-labels-example />' }),
}

export const TimeWithDate: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatTimeWithDateExample] })],
  render: () => ({ template: '<format-time-with-date-example />' }),
}

export const TimeWithLocale: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatTimeWithLocaleExample] })],
  render: () => ({ template: '<format-time-with-locale-example />' }),
}

export const TimeWithSeconds: StoryObj = {
  decorators: [moduleMetadata({ imports: [FormatTimeWithSecondsExample] })],
  render: () => ({ template: '<format-time-with-seconds-example />' }),
}
