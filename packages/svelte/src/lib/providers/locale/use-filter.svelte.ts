import type { Accessor } from '$lib/types'
import { type FilterOptions, type FilterReturn, createFilter } from '@zag-js/i18n-utils'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useLocaleContext } from './use-locale-context'

export interface UseFilterProps extends FilterOptions {}

export function useFilter(inProps: MaybeFunction<UseFilterProps>): UseFilterReturn {
  const props = $derived(runIfFn(inProps))
  const env = useLocaleContext()

  const locale = $derived(props.locale ?? env().locale)
  const filter = $derived(createFilter({ ...props, locale }))

  return () => filter
}

export interface UseFilterReturn extends Accessor<FilterReturn> {}
