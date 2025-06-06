import { type FilterOptions, type FilterReturn, createFilter } from '@zag-js/i18n-utils'
import { useMemo } from 'react'
import { useLocaleContext } from './use-locale-context'

export interface UseFilterProps extends FilterOptions {}

export function useFilter(props: UseFilterProps): UseFilterReturn {
  const env = useLocaleContext()
  const locale = props.locale ?? env.locale
  return useMemo(() => createFilter({ ...props, locale }), [locale, props])
}

export interface UseFilterReturn extends FilterReturn {}
