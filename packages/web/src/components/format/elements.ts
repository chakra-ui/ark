import {
  formatBytes,
  formatNumber,
  formatRelativeTime,
  formatTime,
  type FormatBytesOptions,
  type FormatTimeOptions,
} from '@zag-js/i18n-utils'

import { define, FormatElement } from './shared.js'

export class FormatNumberElement extends FormatElement<number, Intl.NumberFormatOptions> {
  static options = {
    style: 'string',
    currency: 'string',
    'currency-display': 'string',
    'currency-sign': 'string',
    unit: 'string',
    'unit-display': 'string',
    notation: 'string',
    'compact-display': 'string',
    'sign-display': 'string',
    'minimum-integer-digits': 'number',
    'minimum-fraction-digits': 'number',
    'maximum-fraction-digits': 'number',
    'minimum-significant-digits': 'number',
    'maximum-significant-digits': 'number',
  } as const

  protected parse(value: string) {
    const number = Number(value)
    return Number.isNaN(number) ? undefined : number
  }

  protected format(value: number, locale: string, options: Intl.NumberFormatOptions) {
    return formatNumber(value, locale, options)
  }
}

export class FormatByteElement extends FormatElement<number, FormatBytesOptions> {
  static options = {
    unit: 'string',
    'unit-display': 'string',
    'unit-system': 'string',
    precision: 'number',
  } as const

  protected parse(value: string) {
    const number = Number(value)
    return Number.isNaN(number) ? undefined : number
  }

  protected format(value: number, locale: string, options: FormatBytesOptions) {
    return formatBytes(value, locale, options)
  }
}

export class FormatRelativeTimeElement extends FormatElement<Date, Intl.RelativeTimeFormatOptions> {
  static options = {
    numeric: 'string',
    style: 'string',
  } as const

  protected parse(value: string) {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? undefined : date
  }

  protected format(value: Date, locale: string, options: Intl.RelativeTimeFormatOptions) {
    return formatRelativeTime(value, locale, options)
  }
}

export class FormatTimeElement extends FormatElement<string | Date, FormatTimeOptions> {
  static options = {
    format: 'string',
    'am-label': 'string',
    'pm-label': 'string',
    'with-seconds': 'boolean',
  } as const

  protected parse(value: string) {
    return value.includes('T') ? new Date(value) : value
  }

  protected format(value: string | Date, locale: string, options: FormatTimeOptions) {
    return formatTime(value, locale, options)
  }
}

define('ark-format-number', FormatNumberElement)
define('ark-format-byte', FormatByteElement)
define('ark-format-relative-time', FormatRelativeTimeElement)
define('ark-format-time', FormatTimeElement)
