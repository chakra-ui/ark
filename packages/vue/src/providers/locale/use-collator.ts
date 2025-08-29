import { createCollator } from '@zag-js/i18n-utils'
import { type ComputedRef, type MaybeRef, computed, toValue } from 'vue'
import { useLocaleContext } from './use-locale-context'

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string
}

export interface UseCollatorReturn extends ComputedRef<Intl.Collator> {}

export function useCollator(propsOrFn: MaybeRef<UseCollatorProps> = {}): UseCollatorReturn {
  const env = useLocaleContext()

  return computed(() => {
    const props = toValue(propsOrFn)
    const locale = props.locale ?? env.value.locale
    const { locale: _, ...options } = props
    return createCollator(locale, options)
  })
}
