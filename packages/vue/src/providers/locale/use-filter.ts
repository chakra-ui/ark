import { type FilterOptions, type FilterReturn, createFilter } from '@zag-js/i18n-utils'
import { computed } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from './use-locale-context.ts'

export interface UseFilterProps extends FilterOptions {}

export function useFilter(props: UseFilterProps): UseFilterReturn {
  const env = useLocaleContext(DEFAULT_LOCALE)
  const filter = computed(() => createFilter({ ...props, locale: props.locale ?? env.value.locale }))
  return {
    contains: (string, substring) => filter.value.contains(string, substring),
    startsWith: (string, substring) => filter.value.startsWith(string, substring),
    endsWith: (string, substring) => filter.value.endsWith(string, substring),
  }
}

export interface UseFilterReturn extends FilterReturn {}
