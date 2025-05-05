import { type FilterOptions, type FilterReturn, createFilter } from '@zag-js/i18n-utils'
import { type Accessor, createMemo } from 'solid-js'
import { useLocaleContext } from './use-locale-context'

export interface UseFilterProps extends FilterOptions {}

export function useFilter(props: UseFilterProps): UseFilterReturn {
  const env = useLocaleContext()
  const locale = createMemo(() => props.locale ?? env().locale)
  return createMemo(() => createFilter({ ...props, locale: locale() }))
}

export interface UseFilterReturn extends Accessor<FilterReturn> {}
