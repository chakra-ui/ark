import { type FilterOptions, type FilterReturn, createFilter } from '@zag-js/i18n-utils'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from './use-locale-context'

export interface UseFilterProps extends FilterOptions {}

export function useFilter(props: UseFilterProps): UseFilterReturn {
  const env = useLocaleContext(DEFAULT_LOCALE)
  const locale = computed(() => props.locale ?? env.value.locale)
  return computed(() => createFilter({ ...props, locale: locale.value }))
}

export interface UseFilterReturn extends ComputedRef<FilterReturn> {}
