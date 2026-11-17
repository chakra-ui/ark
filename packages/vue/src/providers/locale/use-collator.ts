import { createCollator } from '@zag-js/i18n-utils'
import { type ComputedRef, type MaybeRefOrGetter, computed, toValue } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from './use-locale-context.ts'

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string
}

export interface UseCollatorReturn extends ComputedRef<Intl.Collator> {}

export function useCollator(propsOrFn: MaybeRefOrGetter<UseCollatorProps> = {}): UseCollatorReturn {
  const env = useLocaleContext(DEFAULT_LOCALE)

  return computed(() => {
    const props = toValue(propsOrFn)
    const locale = props.locale ?? env.value.locale
    const { locale: _, ...options } = props
    return createCollator(locale, options)
  })
}
