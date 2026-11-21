import { createFilter } from '@zag-js/i18n-utils'

export { createCollator, createFilter } from '@zag-js/i18n-utils'
export type { FilterOptions, FilterReturn } from '@zag-js/i18n-utils'

export const localeOf = (el: Element) => el.closest('[lang]')?.getAttribute('lang') || undefined

export const filterOf = (el: Element) => createFilter({ sensitivity: 'base', locale: localeOf(el) })
