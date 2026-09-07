import { createCollator } from '@zag-js/i18n-utils'
import { type MaybeRef, computed, toValue } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from './use-locale-context.ts'

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string
}

export interface UseCollatorReturn extends Intl.Collator {}

export function useCollator(props: MaybeRef<UseCollatorProps> = {}): UseCollatorReturn {
  const env = useLocaleContext(DEFAULT_LOCALE)
  const collator = computed(() => {
    const { locale, ...options } = toValue(props)
    return createCollator(locale ?? env.value.locale, options)
  })
  return {
    compare: (x, y) => collator.value.compare(x, y),
    resolvedOptions: () => collator.value.resolvedOptions(),
  }
}
