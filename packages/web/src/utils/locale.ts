import { DateFormatter } from '@internationalized/date'
import {
  createCollator as collator,
  createFilter as filter,
  getDefaultLocale,
  getLocaleDir,
  type FilterOptions,
  type FilterReturn,
  type Locale,
} from '@zag-js/i18n-utils'

export { DateFormatter }
export type { FilterOptions, FilterReturn, Locale }

export interface CollatorOptions extends Intl.CollatorOptions {
  locale?: string | undefined
}

export interface DateFormatterOptions extends Intl.DateTimeFormatOptions {
  locale?: string | undefined
}

export function getLocale(el?: Element | null): Locale {
  const fallback = getDefaultLocale()
  const start = el ?? (typeof document === 'undefined' ? undefined : document.documentElement)
  const locale = start?.closest('[lang]:not([lang=""])')?.getAttribute('lang')
  const dir = start?.closest('[dir=ltr], [dir=rtl]')?.getAttribute('dir') as Locale['dir'] | undefined

  if (!locale) return { locale: fallback.locale, dir: dir ?? fallback.dir }
  return { locale, dir: dir ?? getLocaleDir(locale) }
}

export function createCollator(options: CollatorOptions = {}): Intl.Collator {
  const { locale, ...rest } = options
  return collator(locale ?? getLocale().locale, rest)
}

export function createFilter(options: FilterOptions = {}): FilterReturn {
  return filter({ ...options, locale: options.locale ?? getLocale().locale })
}

export function createDateFormatter(options: DateFormatterOptions = {}): DateFormatter {
  const { locale, ...rest } = options
  return new DateFormatter(locale ?? getLocale().locale, rest)
}

export const localeOf = (el: Element) => el.closest('[lang]')?.getAttribute('lang') || undefined

export const filterOf = (el: Element) => createFilter({ sensitivity: 'base', locale: getLocale(el).locale })
