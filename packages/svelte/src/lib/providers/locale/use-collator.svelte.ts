import { createCollator } from '@zag-js/i18n-utils'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useLocaleContext } from './use-locale-context.ts'

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string
}

export interface UseCollatorReturn extends Intl.Collator {}

export function useCollator(inProps: MaybeFunction<UseCollatorProps> = {}): UseCollatorReturn {
  const env = useLocaleContext()
  const collator = $derived.by(() => {
    const { locale, ...options } = runIfFn(inProps)
    return createCollator(locale ?? env().locale, options)
  })
  return {
    compare: (x, y) => collator.compare(x, y),
    resolvedOptions: () => collator.resolvedOptions(),
  }
}
