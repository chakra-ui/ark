import { type FilterOptions, type FilterReturn, createFilter } from '@zag-js/i18n-utils'
import { createMemo } from 'solid-js'
import { useLocaleContext } from './use-locale-context.ts'

export interface UseFilterProps extends FilterOptions {}

export function useFilter(props: UseFilterProps): UseFilterReturn {
  const env = useLocaleContext()
  const filter = createMemo(() => createFilter({ ...props, locale: props.locale ?? env().locale }))
  return {
    contains: (string, substring) => filter().contains(string, substring),
    startsWith: (string, substring) => filter().startsWith(string, substring),
    endsWith: (string, substring) => filter().endsWith(string, substring),
  }
}

export interface UseFilterReturn extends FilterReturn {}
