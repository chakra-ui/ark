import { InjectionToken, type Provider, inject } from '@angular/core'

export const DEFAULT_LOCALE = 'en-US'

export type Direction = 'ltr' | 'rtl'

const RTL_LANG_CODES = new Set([
  'ae',
  'ar',
  'arc',
  'bcc',
  'bqi',
  'ckb',
  'dv',
  'fa',
  'glk',
  'he',
  'iw',
  'khw',
  'ks',
  'ku',
  'mzn',
  'nqo',
  'pnb',
  'ps',
  'sd',
  'ug',
  'ur',
  'yi',
])

export function getDirection(locale: string): Direction {
  const lang = locale.toLowerCase().split('-')[0] ?? ''
  return RTL_LANG_CODES.has(lang) ? 'rtl' : 'ltr'
}

export interface LocaleContext {
  locale: string
  dir: Direction
}

export const ARK_LOCALE_TOKEN = new InjectionToken<LocaleContext>('ARK_LOCALE_TOKEN')

export interface ProvideArkLocaleConfig {
  locale?: string
  dir?: Direction
}

export function provideArkLocale(config: ProvideArkLocaleConfig = {}): Provider {
  return {
    provide: ARK_LOCALE_TOKEN,
    useFactory: () => {
      const locale = config.locale ?? DEFAULT_LOCALE
      const dir = config.dir ?? getDirection(locale)
      return { locale, dir }
    },
  }
}

export function injectArkLocale(): LocaleContext {
  const ctx = inject(ARK_LOCALE_TOKEN, { optional: true })
  return ctx ?? { locale: DEFAULT_LOCALE, dir: getDirection(DEFAULT_LOCALE) }
}

export function getCollator(locale: string, options?: Intl.CollatorOptions): Intl.Collator {
  return new Intl.Collator(locale, options)
}

export function getDateFormatter(locale: string, options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(locale, options)
}

export interface ArkFilter {
  contains(string: string, substring: string): boolean
  startsWith(string: string, substring: string): boolean
  endsWith(string: string, substring: string): boolean
}

export function getFilter(locale: string, options: Intl.CollatorOptions = { sensitivity: 'base' }): ArkFilter {
  const collator = new Intl.Collator(locale, { ...options, usage: 'search' })
  return {
    contains(s, sub) {
      if (sub.length === 0) return true
      for (let i = 0; i + sub.length <= s.length; i++) {
        if (collator.compare(s.slice(i, i + sub.length), sub) === 0) return true
      }
      return false
    },
    startsWith(s, sub) {
      if (sub.length > s.length) return false
      return collator.compare(s.slice(0, sub.length), sub) === 0
    },
    endsWith(s, sub) {
      if (sub.length > s.length) return false
      return collator.compare(s.slice(s.length - sub.length), sub) === 0
    },
  }
}
