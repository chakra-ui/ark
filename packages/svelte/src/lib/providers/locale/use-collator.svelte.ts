import { createCollator } from '@zag-js/i18n-utils'
import { useLocaleContext } from './use-locale-context'
import type { Accessor } from '$lib/types'

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string
}

export interface UseCollatorReturn extends Accessor<Intl.Collator> {}

export function useCollator(props: UseCollatorProps = {}): UseCollatorReturn {
  const env = useLocaleContext()
  const locale = $derived(props.locale ?? env().locale)

  const collator = $derived.by(() => {
    const { locale: _, ...options } = props
    return createCollator(locale, options)
  })

  return () => collator
}
