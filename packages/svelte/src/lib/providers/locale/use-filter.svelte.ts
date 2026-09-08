import { type FilterOptions, type FilterReturn, createFilter } from '@zag-js/i18n-utils'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useLocaleContext } from './use-locale-context.ts'

export interface UseFilterProps extends FilterOptions {}

export function useFilter(inProps: MaybeFunction<UseFilterProps>): UseFilterReturn {
  const props = $derived(runIfFn(inProps))
  const env = useLocaleContext()
  const filter = $derived(createFilter({ ...props, locale: props.locale ?? env().locale }))
  return {
    contains: (string, substring) => filter.contains(string, substring),
    startsWith: (string, substring) => filter.startsWith(string, substring),
    endsWith: (string, substring) => filter.endsWith(string, substring),
  }
}

export interface UseFilterReturn extends FilterReturn {}
