import { createCollator } from '@zag-js/i18n-utils'
import { useLocaleContext } from './use-locale-context'
import { useMemo } from 'react'

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string
}

export function useCollator(props: UseCollatorProps = {}): Intl.Collator {
  const env = useLocaleContext()
  const locale = props.locale ?? env.locale
  return useMemo(() => {
    const { locale: _, ...options } = props
    return createCollator(locale, options)
  }, [locale, props])
}
